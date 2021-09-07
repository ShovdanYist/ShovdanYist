<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\Comment;
use App\Entity\Song;
use App\Entity\Notification;
use App\Entity\Article;
use App\Form\CommentType;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CommentController extends CustomAbstractController
{
    /**
     * @Route("/comment/new/{type}/{id}", name="comment_new", methods={"POST"})
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
            $entity = $this->getDoctrine()->getRepository(Article::class)->findOneBy(['id' => $id]);
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
                $notification = new Notification();
                $notification->setType('comment_reply');
                $notification->setReceiver($receiver);
                $notification->setComment($comment);

                if ($type == 'song') {
                    $notification->setSong($entity);
                } else {
                    $notification->setArticle($entity);
                }

                $em->persist($notification);
                $comment->setReplyTo($receiver);
            }

            $em->persist($comment);
            $em->flush();

            $this->addFlash('success', $this->trans('flash.comment.added'));

            if ($type == 'song') {
                return $this->redirectToRoute('song_show', [
                    'slug' => $entity->getSlug()
                ]);
            } else {
                return $this->redirectToRoute('article_show', [
                    'slug' => $entity->getSlug()
                ]);
            }
        }

        $this->addFlash('danger', $this->trans('flash.comment.adding.error'));

        if ($type == 'song') {
            return $this->redirectToRoute('song_show', [
                'slug' => $entity->getSlug()
            ]);
        } else {
            return $this->redirectToRoute('article_show', [
                'slug' => $entity->getSlug(),
            ]);
        }
    }

    /**
     * @Route("/comment/delete/{id}", name="comment_delete")
     * @param Request $request
     * @param Comment $comment
     * @return RedirectResponse
     */
    public function commentDelete(Request $request, Comment $comment): Response
    {
        if ($this->isCsrfTokenValid('delete'.$comment->getId(), $request->request->get('_token')) && $comment->getAuthor() == $this->getUser() || $this->isGranted('ROLE_SONG_COMMENT_REMOVER') && $comment->getSong() || $this->isGranted('ROLE_ARTICLE_COMMENT_REMOVER') && $comment->getArticle()) {
            $em = $this->getDoctrine()->getManager();
            foreach ($comment->getNotifications() as $notification) {
                $em->remove($notification);
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
            return $this->redirectToRoute('article_show', [
                'slug' => $comment->getArticle()->getSlug()
            ]);
        }
    }
}
