<?php

namespace App\Twig;

use App\Entity\Comment;
use App\Entity\User;
use App\Service\Defender;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class ToolsExtension extends AbstractExtension
{
    private $defender;

    public function __construct(Defender $defender)
    {
        $this->defender = $defender;
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('is_role', [$this, 'is_role'], ['is_safe' => ['html']]),
            new TwigFunction('rightToChangeUserRights', [$this, 'rightToChangeUserRights'], ['is_safe' => ['html']]),
            new TwigFunction('rightToDeleteComment', [$this, 'rightToDeleteComment'], ['is_safe' => ['html']]),
            new TwigFunction('rightToBlockUser', [$this, 'rightToBlockUser'], ['is_safe' => ['html']]),
        ];
    }

    public function is_role(User $user, $role): bool
    {
        return $this->defender->isGranted($user, $role);
    }

    public function rightToChangeUserRights($moderator, User $user): bool
    {
        return $this->defender->rightToChangeUserRights($moderator, $user);
    }

    public function rightToDeleteComment($user, Comment $comment): bool
    {
        return $this->defender->rightToDeleteComment($user, $comment);
    }

    public function rightToBlockUser($moderator, User $user): bool
    {
        return $this->defender->rightToBlockUser($moderator,$user);
    }
}
