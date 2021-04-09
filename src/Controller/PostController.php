<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\Bookmark;
use App\Entity\Category;
use App\Entity\Notification;
use App\Entity\Post;
use App\Form\NotificationType;
use App\Form\PostType;
use App\Repository\UserRepository;
use App\Service\Paginator;
use DateTime;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route(name="post_")
 * Class PostController
 * @package App\Controller
 */
class PostController extends CustomAbstractController
{
    /**
     * @Route("/category/{slug}/{page<\d+>?1}", name="category")
     * @param Category $category
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function category(Category $category, $page, Paginator $paginator): Response
    {
        $paginator
            ->setCriteria(['status' => true, 'category' => $category])
            ->setParameters(['slug' => $category->getSlug()])
            ->setOrder(['publishedAt' => 'DESC'])
            ->setMethod('findPosts')
            ->setClass(Post::class)
            ->setType('post')
            ->setLimit(10)
            ->setPage($page)
        ;

        return $this->render('post/category.html.twig', [
            'posts' => $paginator->getData(),
            'paginator' => $paginator,
            'category' => $category
        ]);
    }

    /**
     * @Route("/post/add", name="add")
     * @param Request $request
     * @return Response
     */
    public function add(Request $request): Response
    {
        $post = new Post();
        $form = $this->createForm(PostType::class, $post,['playlist' => ($this->isGranted('ROLE_MODER')) ? false : true]);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $post->setAuthor($this->user());
            $post->setSection('articles');

            $em = $this->getDoctrine()->getManager();
            $em->persist($post);
            $em->flush();

            return $this->redirectToRoute('post_show', ['slug' => $post->getSlug()]);
        }

        return $this->render('post/new.html.twig', [
            'form' => $form->createView(),
            'post' => $post
        ]);
    }

    /**
     * @Route("/post/moderation/{page<\d+>?1}", name="moderation", methods={"GET"})
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function moderation($page, Paginator $paginator): Response
    {
        $paginator
            ->setClass(Post::class)
            ->setOrder(['publishedAt' => 'ASC'])
            ->setCriteria(['status' => null])
            ->setLimit(10)
            ->setPage($page)
        ;

        return $this->render('post/moderation.html.twig', [
            'posts' => $paginator->getData(),
            'paginator' => $paginator
        ]);
    }

    /**
     * @Route("/post/moderation/publish/{id}", name="moderation_publish")
     * @param Post $post
     * @return Response
     */
    public function publish(Post $post):Response
    {
        $notification = new Notification();
        $notification->setReceiver($post->getAuthor());
        $notification->setType('post_posted');
        $notification->setPost($post);

        $post->setStatus(true);
        $post->setPublishedAt(new DateTime('now'));
        $post->setUpdatedAt(new DateTime('now'));

        foreach ($post->getNotifications() as $value) {
            $value->setStatus(true);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($notification);
        $em->flush();

        return $this->redirectToRoute('post_moderation');
    }

    /**
     * @Route("/post/moderation/reject/{id}", name="moderation_reject")
     * @param Request $request
     * @param Post $post
     * @return Response
     */
    public function reject(Request $request, Post $post): Response
    {
        $notification = new Notification();
        $notification->setReceiver($post->getAuthor());
        $notification->setType('post_rejected');
        $notification->setPost($post);
        $post->setStatus(false);

        $form = $this->createForm(NotificationType::class, $notification);
        $form->handleRequest($request);

        $em = $this->getDoctrine()->getManager();
        $em->persist($notification);
        $em->flush();

        return $this->redirectToRoute('post_moderation');
    }

    /**
     * @Route("/post/{slug}/{page<\d+>?1}", name="show")
     * @param Post $post
     * @param $page
     * @return Response
     */
    public function show(Post $post, $page): Response
    {
        if (!$this->isGranted('IS_AUTHENTICATED_FULLY') && $post->getStatus() != true && !$this->isGranted('ROLE_MODER') || $post->getStatus() != true && $post->getAuthor() !== $this->user() && !$this->isGranted('ROLE_MODER')) {
            throw $this->createNotFoundException();
        }

        return $this->render('post/show.html.twig', [
            'post' => $post,
            'page' => $page
        ]);
    }

    /**
     * @Route("/post/{slug}/edit", name="edit", methods={"GET","POST"})
     * @param Request $request
     * @param Post $post
     * @return Response
     */
    public function edit(Request $request, Post $post): Response
    {
        /**
         * TODO: Добить
         */
//        if (!$this->isGranted('IS_AUTHENTICATED_FULLY') || $this->user() !== $post->getAuthor() && !$this->isGranted('ROLE_MODER')) {
        if ($this->user() !== $post->getAuthor() && !$this->isGranted('ROLE_MODER')) {
            throw $this->createNotFoundException();
        }

        if ($this->isGranted('ROLE_MODER')) {
            $options = ['playlist' => false, 'status' => true];
        } else {
            $options = ['playlist' => true, 'status' => false];
        }

        $form = $this->createForm(PostType::class, $post, $options);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            if ($post->getStatus() !== null && !$this->isGranted('ROLE_MODER')) {
                $post->setPublishedAt(new DateTime('now'));
                $post->setStatus(null);
            }

            if ($post->getStatus() !== true) {
                foreach ($post->getNotifications() as $value) {
                    $value->setStatus(false);
                }
            } else {
                foreach ($post->getNotifications() as $value) {
                    $value->setStatus(true);
                }
            }

            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('post_show', ['slug' => $post->getSlug()]);
        }

        return $this->render('post/edit.html.twig', [
            'post' => $post,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/bookmarker/{slug}", name="bookmarker", methods={"POST", "GET"})
     * @param Post $post
     * @param UserRepository $users
     * @return JsonResponse
     */
    public function bookmarker(Post $post, UserRepository $users): Response
    {
        $user = $users->findOneBy(['username' => $this->getUser()->getUsername()]);
        $contains = $this->getDoctrine()->getRepository(Bookmark::class)->findOneBy(['user' => $user, 'post' => $post]);
        $em = $this->getDoctrine()->getManager();

        if ($contains) {
            $user->removeBookmark($contains);
            $response = ['status' => 'removed'];
        } else {
            $bookmark = new Bookmark();
            $bookmark->setUser($user);
            $bookmark->setPost($post);
            $em->persist($bookmark);
            $response = ['status' => 'added'];
        }

        $em->flush();

        return $this->json([
            'response' => $response
        ]);
    }

    /**
     * @Route("/post/{id}/delete", name="delete", methods={"DELETE"})
     * @param Request $request
     * @param Post $post
     * @return Response
     */
    public function delete(Request $request, Post $post): Response
    {
        if ($this->isCsrfTokenValid('delete'.$post->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($post);
            $em->flush();
        }

        return $this->redirectToRoute('app_home');
    }
}
