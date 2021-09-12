<?php

namespace App\Service;

use App\Entity\Comment;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Authorization\AccessDecisionManagerInterface;

class Defender
{
    private $accessDecisionManager;
    private $userRepo;
    private $roles = [
        'ROLE_ARTICLE_AUTHOR',
        'ROLE_ARTICLE_EDITOR',
        'ROLE_ARTICLE_COMMENT_REMOVER',
        'ROLE_ARTICLE_APPROVER',
        'ROLE_SONG_EDITOR',
        'ROLE_SONG_COMMENT_REMOVER',
        'ROLE_VOCALIST_EDITOR',
        'ROLE_USER_MANAGER',
        'ROLE_USER_BLOCKER',
        'ROLE_USER_ANALYST',
        'ROLE_USER_ACTIONS'
    ];

    public function __construct(AccessDecisionManagerInterface $accessDecisionManager, UserRepository $userRepo) {
        $this->accessDecisionManager = $accessDecisionManager;
        $this->userRepo = $userRepo;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function getActionUsers()
    {
        return $this->userRepo->findActionUsers();
    }

    public function isGranted($user, $role, $object = null): bool
    {
        if ($user === null) {
            ($role === 'ROLE_GUEST') ? $granted = true : $granted = false;
        } else {
            $token = new UsernamePasswordToken($user, 'none', 'none', $user->getRoles());

            if ($this->accessDecisionManager->decide($token, [$role], $object)) {
                $granted = true;
            } else {
                $granted = false;
            }
        }

        return $granted;
    }

    public function rightToChangeUserRights($moderator,User $user): bool
    {
        $right = false;

        if ($this->isGranted($moderator,'ROLE_OWNER') && $moderator !== $user) {
            $right = true;
        } elseif ($this->isGranted($moderator,'ROLE_ADMINISTRATOR') && !$this->isGranted($user,'ROLE_ADMINISTRATOR') && !$this->isGranted($user,'ROLE_OWNER')) {
            $right = true;
        } elseif ($this->isGranted($moderator,'ROLE_USER_MANAGER') && !$this->isGranted($user,'ROLE_SUPER_MODERATOR')) {
            $right = true;
        }

        return $right;
    }

    public function rightToDeleteComment(User $user,Comment $comment): bool
    {
        $right = false;

        if ($comment->getAuthor() === $user) {
            $right = true;
        } elseif ($comment->getArticle()) {

            if ($this->isGranted($user,'ROLE_ARTICLE_COMMENT_REMOVER')) {
                $right = true;
            } elseif ($comment->getArticle()->getAuthor() === $user) {
                $right = true;
            }

        } elseif ($comment->getSong()) {

            if ($this->isGranted($user,'ROLE_SONG_COMMENT_REMOVER')) {
                $right = true;
            } elseif ($comment->getSong()->getAuthor() === $user) {
                $right = true;
            }

        }

        return $right;
    }

    public function rightToBlockUser($moderator, User $user): bool
    {
        $right = false;

        if ($this->isGranted($moderator,'ROLE_USER_BLOCKER') && !$this->isGranted($user,'ROLE_USER_BLOCKER') && $user->getProfile()->getVerified() !== true || $this->isGranted($moderator,'ROLE_OWNER') && $moderator !== $user) {
            $right = true;
        }

        return $right;
    }
}
