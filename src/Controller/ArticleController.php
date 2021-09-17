<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\Action;
use App\Entity\Bookmark;
use App\Entity\Article;
use App\Entity\Tag;
use App\Service\Compiler;
use App\Service\Defender;
use App\Service\Initializer;
use Cocur\Slugify\Slugify;
use DateTime;
use App\Form\ArticleType;
use App\Repository\UserRepository;
use App\Service\Paginator;
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
        if ($tag->getType() !== 'article') {
            throw $this->createNotFoundException();
        }

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

        return $this->render('interface/article/tag.html.twig', [
            'articles' => $paginator->getData(),
            'paginator' => $paginator,
            'tag' => $tag
        ]);
    }

    /**
     * @Route("/article/add", name="add")
     * @param Request $request
     * @param Initializer $initializer
     * @return Response
     */
    public function add(Request $request, Initializer $initializer): Response
    {
        $article = new Article();
        $form = $this->createForm(ArticleType::class, $article);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $initializer->initializeArticleNew($article);

            return $this->redirectToRoute('article_show', ['slug' => $article->getSlug()]);
        }

        return $this->render('interface/article/new.html.twig', [
            'form' => $form->createView(),
            'article' => $article
        ]);
    }

    /**
     * @Route("/article/{slug}/{page<\d+>?1}", name="show")
     * @param Article $article
     * @param $page
     * @param Defender $defender
     * @return Response
     */
    public function show(Article $article, $page, Defender $defender): Response
    {
        if ($article->getAuthor() === $this->getUser() || $this->isGranted('ROLE_ARTICLE_APPROVER') || $this->isGranted('ROLE_ARTICLE_EDITOR') && $article->getStatus() || $article->getStatus() === true) {

            if (!$defender->isGranted($this->getUser(),'ROLE_GUEST') && $this->getUser() !== $article->getAuthor() && !$this->isGranted('ROLE_ARTICLE_APPROVER')) {
                $article->setViews($article->getViews() + 1);
                $this->getDoctrine()->getManager()->flush();
            }

            return $this->render('interface/article/show.html.twig', [
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
     * @param Initializer $initializer
     * @return Response
     */
    public function edit(Request $request, Article $article, Initializer $initializer): Response
    {
        if ($this->user() === $article->getAuthor() || $this->isGranted('ROLE_ARTICLE_APPROVER') || $this->isGranted('ROLE_ARTICLE_EDITOR') && $article->getStatus()) {

            $form = $this->createForm(ArticleType::class, $article);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                $initializer->initializeArticleEdit($article);

                return $this->redirectToRoute('article_show', ['slug' => $article->getSlug()]);
            }

            return $this->render('interface/article/edit.html.twig', [
                'article' => $article,
                'form' => $form->createView(),
            ]);
        } else {
            throw $this->createNotFoundException();
        }
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
        if ($this->user() !== $article->getAuthor() && !$this->isGranted('ROLE_ARTICLE_APPROVER')) {
            throw $this->createNotFoundException();
        }

        if ($this->isCsrfTokenValid('delete'.$article->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($article);
            $em->flush();
        }

        return $this->redirectToRoute('app_home');
    }
}
