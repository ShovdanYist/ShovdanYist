<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\Action;
use App\Entity\Comment;
use App\Entity\Song;
use App\Entity\Notification;
use App\Entity\Post;
use App\Form\CommentType;
use App\Repository\UserRepository;
use App\Service\Defender;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CommentController extends CustomAbstractController
{
    /**
     * @Route("/comment/new/{type}/{id}", name="comment_new", methods={"POST"})
     * @Security("is_granted('ROLE_USER')")
     * @param Request $request
     * @param $type
     * @param $id
     * @param UserRepository $userRepo
     * @return Response
     */
    public function newComment(Request $request, $type, $id, UserRepository $userRepo): Response
    {
        if ($type == 'song') {
            $entity = $this->getDoctrine()->getRepository(Song::class)->findOneBy(['id' => $id]);
        } else {
            $entity = $this->getDoctrine()->getRepository(Post::class)->findOneBy(['id' => $id]);
        }

        $user = $userRepo->findOneBy(['username' => $this->getUser()->getUsername()]);

        $comment = new Comment();
        $comment->setAuthor($user);
        $entity->addComment($comment);

        $form = $this->createForm(CommentType::class, $comment);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();

            if ($form->get('replyTo')->getData()) {
                $receiver = $userRepo->findOneBy(['username' => $form->get('replyTo')->getData()]);
                $existNotify = $this->getDoctrine()->getRepository(Notification::class)->findOneBy(['type' => 'comment_reply', $type => $entity, 'receiver' => $receiver]);

                if ($existNotify) {
                    if ($existNotify->getSeen()) {
                        $existNotify->setSeen(false);
                        $existNotify->setQuantity(1);
                    } else {
                        $existNotify->setQuantity($existNotify->getQuantity() + 1);
                    }
                    $existNotify->setPublishedAt(new \DateTime('now'));
                    $existNotify->setComment($comment);
                } else {
                    $notification = new Notification();
                    $notification->setType('comment_reply');
                    $notification->setReceiver($receiver);
                    $notification->setComment($comment);
                    $notification->setQuantity(1);
                    $notification->setSender($this->user());

                    if ($type == 'song') {
                        $notification->setSong($entity);
                    } else {
                        $notification->setPost($entity);
                    }
                    $em->persist($notification);
                }

                $comment->setReplyTo($receiver);
            }

            $existNotify = $this->getDoctrine()->getRepository(Notification::class)->findOneBy(['type' => 'post_comment', 'post' => $comment->getPost()]);

            if ($type == 'post' && $existNotify && $this->user() !== $comment->getPost()->getAuthor() && $form->get('replyTo')->getData() !== $comment->getPost()->getAuthor()->getUsername()) {
                if ($existNotify->getSeen()) {
                    $existNotify->setSeen(false);
                    $existNotify->setQuantity(1);
                } elseif ($existNotify->getComment()->getAuthor() !== $comment->getAuthor()) {
                    $existNotify->setQuantity($existNotify->getQuantity() + 1);
                }
                $existNotify->setPublishedAt(new \DateTime('now'));
                $existNotify->setComment($comment);
            } elseif ($type == 'post' && $this->user() !== $comment->getPost()->getAuthor() && $form->get('replyTo')->getData() !== $comment->getPost()->getAuthor()->getUsername()) {
                $notify = new Notification();
                $notify->setReceiver($comment->getPost()->getAuthor());
                $notify->setComment($comment);
                $notify->setQuantity(1);
                $notify->setPost($comment->getPost());
                $notify->setSender($this->user());
                $notify->setType('post_comment');
                $em->persist($notify);
            }

            $em->persist($comment);
            $em->flush();

            $this->addFlash('success', $this->trans('flash.comment.added'));

            if ($type == 'song') {
                return $this->redirectToRoute('song_show', [
                    'slug' => $entity->getSlug()
                ]);
            } else {
                return $this->redirectToRoute('post_show', [
                    'id' => $entity->getId()
                ]);
            }
        }

        $this->addFlash('danger', $this->trans('flash.comment.adding.error'));

        if ($type == 'song') {
            return $this->redirectToRoute('song_show', [
                'slug' => $entity->getSlug()
            ]);
        } else {
            return $this->redirectToRoute('post_show', [
                'id' => $entity->getId(),
            ]);
        }
    }

    /**
     * @Route("/comment/delete/{id}", name="delete_comment")
     * @Security("is_granted('ROLE_USER')")
     * @param Request $request
     * @param Comment $comment
     * @param Defender $defender
     * @return RedirectResponse
     */
    public function deleteComment(Request $request, Comment $comment, Defender $defender): Response
    {
        if ($this->isCsrfTokenValid('delete'.$comment->getId(), $request->request->get('_token')) && $defender->rightToDeleteComment($this->user(),$comment)) {

            $em = $this->getDoctrine()->getManager();

            if ($comment->getPost() && $comment->getPost()->getAuthor() !== $this->user() && $comment->getAuthor() !== $this->user() || $comment->getSong() && $comment->getSong()->getAuthor() !== $this->user() && $comment->getAuthor() !== $this->user()) {
                $action = new Action();
                $action->setModerator($this->user());
                $action->setContent($comment->getMessage());
                $action->setType('comment_deleted');
                $action->setUser($comment->getAuthor());

                if ($comment->getSong()) {
                    $action->setSong($comment->getSong());
                } elseif ($comment->getPost()) {
                    $action->setPost($comment->getPost());
                }

                $em->persist($action);
            }

            $em->remove($comment);
            $em->flush();

            $this->addFlash('success', $this->trans('flash.comment.deleted'));
        } else {
            $this->addFlash('danger', $this->trans('flash.comment.deleting.error'));
        }

        if ($comment->getSong()) {
            return $this->redirectToRoute('song_show', [
                'slug' => $comment->getSong()->getSlug()
            ]);
        } else {
            return $this->redirectToRoute('post_show', [
                'id' => $comment->getPost()->getId()
            ]);
        }
    }
}
