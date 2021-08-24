<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\Bookmark;
use App\Entity\Notification;
use App\Entity\Article;
use App\Entity\Tag;
use App\Form\NotificationType;
use App\Form\ArticleType;
use App\Repository\UserRepository;
use App\Service\Paginator;
use DateTime;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route(name="article_")
 * Class ArticleController
 * @package App\Controller
 */
class ArticleController extends CustomAbstractController
{
    /**
     * @Route("/category/{slug}/{page<\d+>?1}", name="tag")
     * @param Tag $tag
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function category(Tag $tag, $page, Paginator $paginator): Response
    {
        $paginator
            ->setCriteria(['status' => true, 'tag' => $tag])
            ->setParameters(['slug' => $tag->getSlug()])
            ->setOrder(['publishedAt' => 'DESC'])
            ->setMethod('findArticles')
            ->setClass(Article::class)
            ->setType('article')
            ->setLimit(10)
            ->setPage($page)
        ;

        return $this->render('article/tag.html.twig', [
            'articles' => $paginator->getData(),
            'paginator' => $paginator,
            'tag' => $tag
        ]);
    }

    /**
     * @Route("/article/add", name="add")
     * @param Request $request
     * @return Response
     */
    public function add(Request $request): Response
    {
        $article = new Article();
        $form = $this->createForm(ArticleType::class, $article);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $article->setAuthor($this->user());
            $article->setSection('articles');
            $article->setViews(0);

            $em = $this->getDoctrine()->getManager();
            $em->persist($article);
            $em->flush();

            return $this->redirectToRoute('article_show', ['slug' => $article->getSlug()]);
        }

        return $this->render('article/new.html.twig', [
            'form' => $form->createView(),
            'article' => $article
        ]);
    }

    /**
     * @Route("/article/moderation/{page<\d+>?1}", name="moderation", methods={"GET"})
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function moderation($page, Paginator $paginator): Response
    {
        $paginator
            ->setClass(Article::class)
            ->setOrder(['publishedAt' => 'ASC'])
            ->setCriteria(['status' => null, 'moderation' => true])
            ->setLimit(10)
            ->setPage($page)
        ;

        return $this->render('article/moderation.html.twig', [
            'articles' => $paginator->getData(),
            'paginator' => $paginator
        ]);
    }

    /**
     * @Route("/article/moderation/publish/{id}", name="moderation_publish")
     * @param Article $article
     * @return Response
     */
    public function publish(Article $article):Response
    {
        $notification = new Notification();
        $notification->setReceiver($article->getAuthor());
        $notification->setType('article_posted');
        $notification->setArticle($article);

        $article->setStatus(true);
        $article->setPublishedAt(new DateTime('now'));
        $article->setUpdatedAt(new DateTime('now'));

        foreach ($article->getNotifications() as $value) {
            $value->setStatus(true);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($notification);
        $em->flush();

        return $this->redirectToRoute('article_moderation');
    }

    /**
     * @Route("/article/moderation/reject/{id}", name="moderation_reject")
     * @param Request $request
     * @param Article $article
     * @return Response
     */
    public function reject(Request $request, Article $article): Response
    {
        $notification = new Notification();
        $notification->setReceiver($article->getAuthor());
        $notification->setType('article_rejected');
        $notification->setArticle($article);
        $article->setStatus(false);

        $form = $this->createForm(NotificationType::class, $notification);
        $form->handleRequest($request);

        $em = $this->getDoctrine()->getManager();
        $em->persist($notification);
        $em->flush();

        return $this->redirectToRoute('article_moderation');
    }

    /**
     * @Route("/article/{slug}/{page<\d+>?1}", name="show")
     * @param Article $article
     * @param $page
     * @return Response
     */
    public function show(Article $article, $page): Response
    {
        if ($article->getAuthor() === $this->getUser() || $this->isGranted('ROLE_MODER') || $article->getStatus() === true) {

            if ($this->isGranted('IS_AUTHENTICATED_FULLY') && $this->user() !== $article->getAuthor() && !$this->isGranted('ROLE_MODER')) {
                $article->setViews($article->getViews() + 1);
                $em = $this->getDoctrine()->getManager();
                $em->flush();
            }

            return $this->render('article/show.html.twig', [
                'article' => $article,
                'page' => $page
            ]);
        }

        throw $this->createNotFoundException();
    }

    /**
     * @Route("/article/{slug}/edit", name="edit", methods={"GET","POST"})
     * @param Request $request
     * @param Article $article
     * @return Response
     */
    public function edit(Request $request, Article $article): Response
    {
        /**
         * TODO: Добить
         */
//        if (!$this->isGranted('IS_AUTHENTICATED_FULLY') || $this->user() !== $article->getAuthor() && !$this->isGranted('ROLE_MODER')) {
        if ($this->user() !== $article->getAuthor() && !$this->isGranted('ROLE_MODER')) {
            throw $this->createNotFoundException();
        }

        $form = $this->createForm(ArticleType::class, $article);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            if ($article->getStatus() !== null && !$this->isGranted('ROLE_MODER')) {
                $article->setPublishedAt(new DateTime('now'));
                $article->setStatus(null);
            }

            if ($article->getStatus() !== true) {
                foreach ($article->getNotifications() as $value) {
                    $value->setStatus(false);
                }
            } else {
                foreach ($article->getNotifications() as $value) {
                    $value->setStatus(true);
                }
            }

            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('article_show', ['slug' => $article->getSlug()]);
        }

        return $this->render('article/edit.html.twig', [
            'article' => $article,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/bookmarker/{slug}", name="bookmarker", methods={"POST", "GET"})
     * @param Article $article
     * @param UserRepository $users
     * @return JsonResponse
     */
    public function bookmarker(Article $article, UserRepository $users): Response
    {
        $user = $users->findOneBy(['username' => $this->getUser()->getUsername()]);
        $contains = $this->getDoctrine()->getRepository(Bookmark::class)->findOneBy(['user' => $user, 'article' => $article]);
        $em = $this->getDoctrine()->getManager();

        if ($contains) {
            $user->removeBookmark($contains);
            $response = ['status' => 'removed'];
        } else {
            $bookmark = new Bookmark();
            $bookmark->setUser($user);
            $bookmark->setArticle($article);
            $em->persist($bookmark);
            $response = ['status' => 'added'];
        }

        $em->flush();

        return $this->json([
            'response' => $response
        ]);
    }

    /**
     * @Route("/article/{id}/delete", name="delete", methods={"DELETE"})
     * @param Request $request
     * @param Article $article
     * @return Response
     */
    public function delete(Request $request, Article $article): Response
    {
        if ($this->isCsrfTokenValid('delete'.$article->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($article);
            $em->flush();
        }

        return $this->redirectToRoute('app_home');
    }
}
