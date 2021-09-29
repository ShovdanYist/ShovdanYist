<?php

namespace App\Twig;

use App\Entity\Notification;
use App\Entity\Post;
use App\Entity\Profile;
use App\Entity\Song;
use App\Entity\User;
use App\Repository\FollowRepository;
use App\Repository\UserRepository;
use App\Service\Defender;
use Symfony\Component\Security\Core\Security;
use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class UserExtension extends AbstractExtension
{
    private $users;
    private $security;
    private $defender;
    private $followers;

    public function __construct(UserRepository $users, Security $security, Defender $defender, FollowRepository $followers)
    {
        $this->users = $users;
        $this->security = $security;
        $this->defender = $defender;
        $this->followers = $followers;
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('actionMessage', [$this, 'actionMessage'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('actionView', [$this, 'actionView'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('notificationMessage', [$this, 'notificationMessage'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('notificationView', [$this, 'notificationView'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('userLine', [$this, 'userLine'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('userIsFollowed', [$this, 'userIsFollowed'], ['is_safe' => ['html']]),
        ];
    }

    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function userLine(Environment $twig, User $follower, $unfollow = false): string
    {
        return $twig->render('interface/layouts/user/user_line.html.twig', [
            'follower' => $follower,
            'unfollow' => $unfollow
        ]);
    }

    public function userIsFollowed(User $follower): bool
    {
        if ($this->followers->findOneBy(['follower' => $this->getUser(), 'followed' => $follower])) {
            $followed = true;
        } else {
            $followed = false;
        }

        return $followed;
    }

    private function getUser()
    {
        if ($this->defender->isGranted($this->security->getUser(),'ROLE_GUEST')) {
            return $this->security->getUser();
        } else {
            return $this->users->findOneBy(['username' => $this->security->getUser()->getUsername()]);
        }
    }

    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function actionMessage(Environment $twig, $action): string
    {
        return $twig->render('interface/layouts/user/action_message.html.twig', [
            'action' => $action
        ]);
    }

    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function actionView(Environment $twig, $action): string
    {
        return $twig->render('interface/layouts/user/action_view.html.twig', [
            'action' => $action
        ]);
    }

    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function notificationMessage(Environment $twig, Notification $notification): string
    {
        return $twig->render('interface/layouts/user/notification_message.html.twig', [
            'notification' => $notification,
            'sender' => $notification->getSender()
        ]);
    }

    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function notificationView(Environment $twig, Notification $notification): string
    {
        return $twig->render('interface/layouts/user/notification_view.html.twig', [
            'notification' => $notification,
            'sender' => $notification->getSender()
        ]);
    }
}
