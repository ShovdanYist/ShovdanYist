<?php

namespace App\Service;

use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Authorization\AccessDecisionManagerInterface;

class Defender
{
    private $accessDecisionManager;
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
        'ROLE_USER_ANALYST'
    ];

    public function __construct(AccessDecisionManagerInterface $accessDecisionManager) {
        $this->accessDecisionManager = $accessDecisionManager;
    }

    public function isGranted(User $user, $role, $object = null): bool
    {
        $token = new UsernamePasswordToken($user, 'none', 'none', $user->getRoles());

        return ($this->accessDecisionManager->decide($token, [$role], $object));
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function rightToChangeUserRights(User $moderator,User $user): bool
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
}
