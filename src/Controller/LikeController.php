<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\Comment;
use App\Entity\Like;
use App\Entity\Notification;
use App\Entity\Post;
use App\Entity\User;
use App\Service\Paginator;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LikeController extends CustomAbstractController
{
    /**
     * @Route("/post/{id}/likes/{page<\d+>?1}", name="post_likes", methods={"GET"})
     * @param Post $post
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function postLikes(Post $post, $page, Paginator $paginator): Response
    {
        $paginator
            ->setClass(User::class)
            ->setMethod('findLikes')
            ->setCriteria(['post' => $post])
            ->setParameters(['id' => $post->getId()])
            ->setOrder(['id' => 'DESC'])
            ->setLimit(30)
            ->setPage($page)
        ;

        return $this->render('interface/post/likes.html.twig', [
            'users' => $paginator->getData(),
            'paginator' => $paginator,
            'post' => $post
        ]);
    }

    /**
     * @Route("/comment/{id}/likes/{page<\d+>?1}", name="comment_likes", methods={"GET"})
     * @param Comment $comment
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function commentLikes(Comment $comment, $page, Paginator $paginator): Response
    {
        $paginator
            ->setClass(User::class)
            ->setMethod('findLikes')
            ->setCriteria(['comment' => $comment])
            ->setParameters(['id' => $comment->getId()])
            ->setOrder(['id' => 'DESC'])
            ->setLimit(30)
            ->setPage($page)
        ;

        return $this->render('interface/layouts/comments/likes.html.twig', [
            'users' => $paginator->getData(),
            'paginator' => $paginator,
            'comment' => $comment
        ]);
    }

    /**
     * @Route("/postLike/{id}", name="post_like", methods={"POST", "GET"})
     * @Security("is_granted('ROLE_USER')")
     * @param Post $post
     * @return JsonResponse
     */
    public function postLike(Post $post): Response
    {
        $like = $this->getDoctrine()->getRepository(Like::class)->findOneBy(['user' => $this->user(), 'post' => $post]);
        $em = $this->getDoctrine()->getManager();

        if ($like) {
            $notification = $this->getDoctrine()->getRepository(Notification::class)->findOneBy(['post' => $post, 'type' => 'post_like', 'sender' => $this->user()]);
            if ($notification) {
                $em->remove($notification);
            }

            $this->user()->removeLike($like);
            $response = ['status' => 'removed'];
        } else {
            $like = new Like();
            $like->setUser($this->user());
            $like->setPost($post);
            $em->persist($like);
            $response = ['status' => 'added'];

            if ($post->getAuthor() !== $this->user()) {
                $existNotify = $this->getDoctrine()->getRepository(Notification::class)->findOneBy(['post' => $post, 'type' => 'post_like']);

                if ($existNotify) {
                    if ($existNotify->getSeen()) {
                        $existNotify->setSeen(false);
                        $existNotify->setQuantity(1);
                    } elseif ($existNotify->getSender() !== $this->user() || $existNotify->getQuantity() > 1) {
                        $existNotify->setQuantity($existNotify->getQuantity() + 1);
                    }
                    $existNotify->setPublishedAt(new \DateTime('now'));
                    $existNotify->setSender($this->user());
                } else {
                    $notification = new Notification();
                    $notification->setType('post_like');
                    $notification->setReceiver($post->getAuthor());
                    $notification->setPost($post);
                    $notification->setQuantity(1);
                    $notification->setSender($this->user());
                    $em->persist($notification);
                }
            }
        }

        $em->flush();

        return $this->json([
            'response' => $response
        ]);
    }

    /**
     * @Route("/commentLike/{id}", name="comment_like", methods={"POST", "GET"})
     * @Security("is_granted('ROLE_USER')")
     * @param Comment $comment
     * @return JsonResponse
     */
    public function commentLike(Comment $comment): Response
    {
        $like = $this->getDoctrine()->getRepository(Like::class)->findOneBy(['user' => $this->user(), 'comment' => $comment]);
        $em = $this->getDoctrine()->getManager();

        if ($like) {
            $notification = $this->getDoctrine()->getRepository(Notification::class)->findOneBy(['comment' => $comment, 'type' => 'comment_like', 'sender' => $this->user()]);
            if ($notification) {
                $em->remove($notification);
            }

            $this->user()->removeLike($like);
            $response = ['status' => 'removed'];
        } else {
            $like = new Like();
            $like->setUser($this->user());
            $like->setComment($comment);
            $em->persist($like);
            $response = ['status' => 'added'];

            if ($comment->getAuthor() !== $this->user()) {
                $existNotify = $this->getDoctrine()->getRepository(Notification::class)->findOneBy(['comment' => $comment, 'type' => 'comment_like']);

                if ($existNotify) {
                    if ($existNotify->getSeen()) {
                        $existNotify->setSeen(false);
                        $existNotify->setQuantity(1);
                    } elseif ($existNotify->getSender() !== $this->user() || $existNotify->getQuantity() > 1) {
                        $existNotify->setQuantity($existNotify->getQuantity() + 1);
                    }
                    $existNotify->setPublishedAt(new \DateTime('now'));
                    $existNotify->setSender($this->user());
                } else {
                    $notification = new Notification();
                    $notification->setType('comment_like');
                    $notification->setReceiver($comment->getAuthor());
                    $notification->setComment($comment);
                    if ($comment->getPost()) {
                        $notification->setPost($comment->getPost());
                    } else {
                        $notification->setSong($comment->getSong());
                    }
                    $notification->setQuantity(1);
                    $notification->setSender($this->user());
                    $em->persist($notification);
                }
            }
        }

        $em->flush();

        return $this->json([
            'response' => $response
        ]);
    }
}
