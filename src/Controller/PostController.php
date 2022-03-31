<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\Post;
use App\Entity\User;
use App\Service\Defender;
use App\Service\Initializer;
use App\Form\PostType;
use App\Service\Paginator;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PostController extends CustomAbstractController
{
    /**
     * @Route("/{page<\d+>?1}", name="app_home", methods={"GET"})
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function index($page, Paginator $paginator): Response
    {
        $this->updateLastActivity();
        $gender = ($this->getUser()) ? $this->user()->getProfile()->getGender() : null;

        $paginator
            ->setClass(Post::class)
            ->setMethod('findRecommendations')
            ->setOrder(['publishedAt' => 'DESC'])
            ->setCriteria(['gender' => $gender, 'status' => true, 'featured' => true])
            ->setLimit(15)
            ->setPage($page)
        ;

        return $this->render('interface/post/recommendations.html.twig', [
            'posts' => $paginator->getData(),
            'paginator' => $paginator
        ]);
    }

    /**
     * @Route("/feed/{page<\d+>?1}", name="post_feed", methods={"GET"})
     * @Security("is_granted('ROLE_USER')")
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function feed($page, Paginator $paginator): Response
    {
        $following = $this->getDoctrine()->getRepository(User::class)->findFollows(['user' => $this->user(), 'type' => 'following']);

        $paginator
            ->setClass(Post::class)
            ->setMethod('findFeedPosts')
            ->setOrder(['publishedAt' => 'DESC'])
            ->setCriteria(['following' => $following, 'status' => true])
            ->setLimit(15)
            ->setPage($page)
        ;

        return $this->render('interface/post/feed.html.twig', [
            'posts' => $paginator->getData(),
            'paginator' => $paginator,
            'following' => $this->getDoctrine()->getRepository(User::class)->findFollows(['user' => $this->user(), 'type' => 'following'])
        ]);
    }

    /**
     * @Route("/post/new", name="post_new")
     * @Security("is_granted('ROLE_USER')")
     * @param Request $request
     * @param Initializer $initializer
     * @param Defender $defender
     * @return Response
     */
    public function new(Request $request, Initializer $initializer, Defender $defender): Response
    {
        $post = new Post();
        $form = $this->createForm(PostType::class, $post);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $initializer->initializePostNew($post);

            if (!$defender->rightToSetTitleSlug($post)) {
                $form->get('title')->addError(new FormError($this->trans('title.or.slug.exists')));
            } elseif (!$post->getImage()) {
                $form->get('imageFile')->addError(new FormError($this->trans('post.image.required')));
            } else {
                return $this->redirectToRoute('post_show', ['id' => $post->getId()]);
            }
        }

        return $this->render('interface/post/new.html.twig', [
            'form' => $form->createView(),
            'post' => $post
        ]);
    }

    /**
     * @Route("/post/{id}/{page<\d+>?1}", name="post_show")
     * @param Post $post
     * @param $page
     * @return Response
     */
    public function show(Post $post, $page): Response
    {
        if ($post->getAuthor() === $this->getUser() || $this->isGranted('ROLE_POST_MODERATOR') || $post->getStatus() === true) {

            return $this->render('interface/post/show.html.twig', [
                'post' => $post,
                'page' => $page
            ]);
        }

        return $this->redirectToRoute('app_home');
    }

    /**
     * @Route("/post/{id}/edit", name="post_edit", methods={"GET","POST"})
     * @Security("is_granted('ROLE_USER')")
     * @param Request $request
     * @param Post $post
     * @param Initializer $initializer
     * @param Defender $defender
     * @return Response
     */
    public function edit(Request $request, Post $post, Initializer $initializer, Defender $defender): Response
    {
        if ($this->user() !== $post->getAuthor() && !$this->isGranted('ROLE_POST_MODERATOR')) {
            return $this->redirectToRoute('app_home');
        }

        $form = $this->createForm(PostType::class, $post);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $initializer->initializePostEdit($post, $form);

            if (!$defender->rightToSetTitleSlug($post)) {
                $form->get('title')->addError(new FormError($this->trans('title.or.slug.exists')));
            } else {
                return $this->redirectToRoute('post_show', ['id' => $post->getId()]);
            }
        }

        return $this->render('interface/post/edit.html.twig', [
            'post' => $post,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/post/{id}/delete", name="post_delete", methods={"DELETE"})
     * @Security("is_granted('ROLE_USER')")
     * @param Request $request
     * @param Post $post
     * @return Response
     */
    public function delete(Request $request, Post $post): Response
    {
        if ($this->user() !== $post->getAuthor() && !$this->isGranted('ROLE_OWNER')) {
            return $this->redirectToRoute('app_home');
        }

        $username = $post->getAuthor()->getUsername();

        if ($this->isCsrfTokenValid('delete'.$post->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($post);
            $em->flush();
        }

        return $this->redirectToRoute('user_profile', [
            'username' => $username
        ]);
    }
}
