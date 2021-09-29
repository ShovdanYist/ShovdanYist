<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\Follow;
use App\Entity\Notification;
use App\Entity\User;
use App\Service\Paginator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FollowController extends CustomAbstractController
{
    /**
     * @Route("/user/{username}/followers/{page<\d+>?1}", name="user_followers", methods={"GET"})
     * @param User $user
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function followers(User $user, $page, Paginator $paginator): Response
    {
        $paginator
            ->setClass(User::class)
            ->setMethod('findFollows')
            ->setCriteria(['user' => $user, 'type' => 'followers'])
            ->setParameters(['username' => $user->getUsername()])
            ->setOrder(['id' => 'DESC'])
            ->setLimit(20)
            ->setPage($page)
        ;

        return $this->render('interface/user/follows.html.twig', [
            'follows' => $paginator->getData(),
            'paginator' => $paginator,
            'user' => $user,
            'profile' => $user->getProfile(),
            'type' => 'followers'
        ]);
    }

    /**
     * @Route("/user/{username}/following/{page<\d+>?1}", name="user_following", methods={"GET"})
     * @param User $user
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function following(User $user, $page, Paginator $paginator): Response
    {
        $paginator
            ->setClass(User::class)
            ->setMethod('findFollows')
            ->setCriteria(['user' => $user, 'type' => 'following'])
            ->setParameters(['username' => $user->getUsername()])
            ->setOrder(['id' => 'DESC'])
            ->setLimit(20)
            ->setPage($page)
        ;

        return $this->render('interface/user/follows.html.twig', [
            'follows' => $paginator->getData(),
            'paginator' => $paginator,
            'user' => $user,
            'profile' => $user->getProfile(),
            'type' => 'following'
        ]);
    }

    /**
     * @Route("/follow/{username}", name="user_follow", methods={"POST", "GET"})
     * @param User $user
     * @param EntityManagerInterface $em
     * @return JsonResponse
     */
    public function follow(User $user, EntityManagerInterface $em): Response
    {
        if ($this->user() === $user) {
            return $this->redirectToRoute('user_profile', [
                'username' => $user->getUsername()
            ]);
        }

        $follow = $this->getDoctrine()->getRepository(Follow::class)->findOneBy(['follower' => $this->user(), 'followed' => $user]);

        if ($follow) {
            $this->user()->removeFollow($follow);
            $response = ['status' => 'removed'];
        } else {
            $follow = $this->user()->addFollow($user);

            $notification = new Notification();
            $notification->setType('user_follow');
            $notification->setReceiver($user);
            $notification->setFollow($follow);
            $notification->setSender($this->user());

            $response = ['status' => 'added'];

            $em->persist($notification);
            $em->persist($follow);
        }

        $em->flush();

        return $this->json([
            'response' => $response
        ]);
    }

    /**
     * @Route("/unfollow/{username}", name="user_unfollow", methods={"POST", "GET"})
     * @param User $user
     * @param EntityManagerInterface $em
     * @return Response
     */
    public function unfollow(User $user, EntityManagerInterface $em): Response
    {
        $follow = $this->getDoctrine()->getRepository(Follow::class)->findOneBy(['follower' => $user, 'followed' => $this->user()]);
        $response = ['status' => null];

        if ($follow) {
            $user->removeFollow($follow);
            $response = ['status' => 'removed'];
            $em->flush();
        }

        return $this->json([
            'response' => $response
        ]);
    }
}
