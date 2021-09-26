<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\Bookmark;
use App\Entity\Post;
use App\Entity\Tag;
use App\Service\Defender;
use App\Service\Initializer;
use App\Form\Post\PostType;
use App\Repository\UserRepository;
use App\Service\Paginator;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\JsonResponse;
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
            throw $this->createNotFoundException();
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
            } else {
                return $this->redirectToRoute('post_show', ['slug' => $post->getSlug()]);
            }
        }

        return $this->render('interface/post/new.html.twig', [
            'form' => $form->createView(),
            'post' => $post
        ]);
    }

    /**
     * @Route("/post/{slug}/{page<\d+>?1}", name="post_show")
     * @param Post $post
     * @param $page
     * @param Defender $defender
     * @return Response
     */
    public function show(Post $post, $page, Defender $defender): Response
    {
        if ($post->getAuthor() === $this->getUser() || $this->isGranted('ROLE_POST_MODERATOR') || $this->isGranted('ROLE_POST_EDITOR') && $post->getStatus() || $post->getStatus() === true) {

            if (!$defender->isGranted($this->getUser(),'ROLE_GUEST') && $this->getUser() !== $post->getAuthor() && !$this->isGranted('ROLE_POST_MODERATOR')) {
                $post->setViews($post->getViews() + 1);
                $this->getDoctrine()->getManager()->flush();
            }

            return $this->render('interface/post/show.html.twig', [
                'post' => $post,
                'page' => $page
            ]);
        }

        throw $this->createNotFoundException();
    }

    /**
     * @Route("/post/{slug}/edit", name="post_edit", methods={"GET","POST"})
     * @param Request $request
     * @param Post $post
     * @param Initializer $initializer
     * @return Response
     */
    public function edit(Request $request, Post $post, Initializer $initializer): Response
    {
        if ($this->user() === $post->getAuthor() || $this->isGranted('ROLE_POST_MODERATOR') || $this->isGranted('ROLE_POST_EDITOR') && $post->getStatus()) {

            $form = $this->createForm(PostType::class, $post);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                $initializer->initializePostEdit($post);

                return $this->redirectToRoute('post_show', ['slug' => $post->getSlug()]);
            }

            return $this->render('interface/post/edit.html.twig', [
                'post' => $post,
                'form' => $form->createView(),
            ]);
        } else {
            throw $this->createNotFoundException();
        }
    }

    /**
     * @Route("/bookmarker/{slug}", name="post_bookmarker", methods={"POST", "GET"})
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
     * @Route("/post/{id}/delete", name="post_delete", methods={"DELETE"})
     * @param Request $request
     * @param Post $post
     * @return Response
     */
    public function delete(Request $request, Post $post): Response
    {
        if ($this->user() !== $post->getAuthor() && !$this->isGranted('ROLE_POST_MODERATOR')) {
            throw $this->createNotFoundException();
        }

        if ($this->isCsrfTokenValid('delete'.$post->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($post);
            $em->flush();
        }

        return $this->redirectToRoute('app_home');
    }
}
