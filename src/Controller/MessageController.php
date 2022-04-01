<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\Message;
use App\Entity\User;
use App\Form\MessageType;
use App\Repository\MessageRepository;
use Doctrine\DBAL\DBALException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MessageController extends CustomAbstractController
{
    /**
     * @Route("/messages", name="message_conversations", methods={"GET"})
     * @Security("is_granted('ROLE_USER')")
     * @return Response
     * @throws DBALException
     */
    public function index(): Response
    {
        $this->updateLastActivity();
        $conversations = $this->getDoctrine()->getRepository(User::class)->findConversations($this->user()->getId());
        $users = [];

        foreach ($conversations as $conversation) {
            $users[] = $this->getDoctrine()->getRepository(User::class)->findOneBy(['id' => $conversation['user']]);
        }

        $onlineUsers = $this->getDoctrine()->getRepository(User::class)->findOnlineFollows(['user' => $this->user(), 'type' => 'following']);

        return $this->render('interface/message/conversations.html.twig', [
            'users' => $users,
            'onlineUsers' => $onlineUsers
        ]);
    }

    /**
     * @Route("/messages/{username}", name="message_conversation", methods={"GET", "POST"})
     * @Security("is_granted('ROLE_USER')")
     * @param Request $request
     * @param User $user
     * @param MessageRepository $messageRepo
     * @return Response
     */
    public function conversation(Request $request, User $user, MessageRepository $messageRepo): Response
    {
        $message = new Message();
        $em = $this->getDoctrine()->getManager();
        $form = $this->createForm(MessageType::class,$message);
        $form->handleRequest($request);

        foreach ($messageRepo->findBy(['receiver' => $this->user(), 'sender' => $user, 'seen' => false]) as $unseenMessage) {
            $unseenMessage->setSeen(true);
        }
        $em->flush();

        if ($form->isSubmitted() && $form->isValid()) {
            $message->setSender($this->user());
            $message->setReceiver($user);
            $message->setSeen(false);
            $message->setSenderDeleted(false);
            $message->setReceiverDeleted(false);
            $message->setSentAt(new \DateTime('now'));

            if ($form->get('replyTo')->getData()) {
                $message->setReplyTo($messageRepo->findOneBy(['id' => $form->get('replyTo')->getData()]));
            }

            if ($messageRepo->findConversationMessagesCount(['user_one' => $this->user(),'user_two' => $user])[0]['count'] > 200) {
                foreach ($messageRepo->findConversation(['user_one' => $this->user(),'user_two' => $user],['sentAt' => 'DESC'],null,200) as $messageToDelete) {
                    $em->remove($messageToDelete);
                }
            }

            $em->persist($message);
            $em->flush();

            return $this->redirectToRoute('message_conversation', [
                'username' => $user->getUsername()
            ]);
        }

        return $this->render('interface/message/conversation.html.twig', [
            'messages' => $messageRepo->findConversation(['user_one' => $this->user(),'user_two' => $user]),
            'user' => $user,
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/conversation/{username}/deleteForMe", name="delete_conversation_for_me", methods={"GET", "POST"})
     * @Security("is_granted('ROLE_USER')")
     * @param User $user
     * @return Response
     */
    public function deleteConversationForMe(User $user): Response
    {
        $messages = $this->getDoctrine()->getRepository(Message::class)->findConversation(['user_one' => $this->user(),'user_two' => $user]);
        $em = $this->getDoctrine()->getManager();

        foreach ($messages as $message) {
            if ($message->getSender() === $this->user()) {
                if ($message->getReceiverDeleted()) {
                    $em->remove($message);
                } else {
                    $message->setSenderDeleted(true);
                }
            } elseif ($message->getReceiver() === $this->user()) {
                if ($message->getSenderDeleted()) {
                    $em->remove($message);
                } else {
                    $message->setReceiverDeleted(true);
                }
            }
        }

        $em->flush();

        return $this->redirectToRoute('message_conversations');
    }

    /**
     * @Route("/conversation/{username}/deleteForEveryone", name="delete_conversation_for_everyone", methods={"GET", "POST"})
     * @Security("is_granted('ROLE_USER')")
     * @param User $user
     * @return Response
     */
    public function deleteConversationForEveryone(User $user): Response
    {
        $sentMessages = $this->getDoctrine()->getRepository(Message::class)->findBy(['sender' => $this->user(),'receiver' => $user]);
        $receivedMessages = $this->getDoctrine()->getRepository(Message::class)->findBy(['sender' => $user,'receiver' => $this->user()]);;
        $em = $this->getDoctrine()->getManager();

        foreach ($sentMessages as $sentMessage) {
            $em->remove($sentMessage);
        }
        foreach ($receivedMessages as $receivedMessage) {
            $em->remove($receivedMessage);
        }

        $em->flush();

        return $this->redirectToRoute('message_conversations');
    }

    /**
     * @Route("/message/{id}/deleteForMe", name="delete_message_for_me", methods={"GET", "POST"})
     * @Security("is_granted('ROLE_USER')")
     * @param Message $message
     * @return Response
     */
    public function deleteMessageForMe(Message $message): Response
    {
        $em = $this->getDoctrine()->getManager();

        if ($message->getSender() === $this->user()) {
            $username = $message->getReceiver()->getUsername();

            if ($message->getReceiverDeleted()) {
                $em->remove($message);
            } else {
                $message->setSenderDeleted(true);
            }
        } elseif ($message->getReceiver() === $this->user()) {
            $username = $message->getSender()->getUsername();

            if ($message->getSenderDeleted()) {
                $em->remove($message);
            } else {
                $message->setReceiverDeleted(true);
            }
        } else {
            return $this->redirectToRoute('message_conversations');
        }

        $em->flush();

        return $this->redirectToRoute('message_conversation', [
            'username' => $username
        ]);
    }

    /**
     * @Route("/message/{id}/deleteForEveryone", name="delete_message_for_everyone", methods={"GET", "POST"})
     * @Security("is_granted('ROLE_USER')")
     * @param Message $message
     * @return Response
     */
    public function deleteMessageForEveryone(Message $message): Response
    {
        $em = $this->getDoctrine()->getManager();

        if ($message->getSender() === $this->user()) {
            $username = $message->getReceiver()->getUsername();
        } elseif ($message->getReceiver() === $this->user()) {
            $username = $message->getSender()->getUsername();
        } else {
            return $this->redirectToRoute('message_conversations');
        }

        $em->remove($message);
        $em->flush();

        return $this->redirectToRoute('message_conversation', [
            'username' => $username
        ]);
    }
}
