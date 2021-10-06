<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\Post;
use App\Entity\Tag;
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
     * @Route("/category/{slug}/{page<\d+>?1}", name="post_tag")
     * @param Tag $tag
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function category(Tag $tag, $page, Paginator $paginator): Response
    {
        if ($tag->getType() !== 'post') {
            return $this->redirectToRoute('app_home');
        }

        $paginator
            ->setCriteria(['status' => true, 'tag' => $tag])
            ->setParameters(['slug' => $tag->getSlug()])
            ->setOrder(['publishedAt' => 'DESC'])
            ->setMethod('findPosts')
            ->setClass(Post::class)
            ->setType('post')
            ->setLimit(10)
            ->setPage($page)
        ;

        return $this->render('interface/post/tag.html.twig', [
            'posts' => $paginator->getData(),
            'paginator' => $paginator,
            'tag' => $tag
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
     * @param Defender $defender
     * @return Response
     */
    public function show(Post $post, $page, Defender $defender): Response
    {
        if ($post->getAuthor() === $this->getUser() || $this->isGranted('ROLE_POST_MODERATOR') || $post->getStatus() === true) {

            if (!$defender->isGranted($this->getUser(),'ROLE_GUEST') && $this->getUser() !== $post->getAuthor() && !$this->isGranted('ROLE_POST_MODERATOR')) {
                $post->setViews($post->getViews() + 1);
                $this->getDoctrine()->getManager()->flush();
            }

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
        if ($this->getUser() && $this->user() === $post->getAuthor() || $this->isGranted('ROLE_POST_MODERATOR') && $post->getStatus() != null) {
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
        } elseif ($this->getUser()) {
            return $this->redirectToRoute('app_home');
        } else {
            return $this->redirectToRoute('app_login');
        }
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
        if ($this->user() !== $post->getAuthor() && !$this->isGranted('ROLE_POST_MODERATOR')) {
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
