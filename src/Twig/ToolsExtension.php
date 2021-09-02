<?php

namespace App\Twig;

use App\Entity\Comment;
use App\Entity\User;
use App\Form\CommentType;
use App\Repository\TagRepository;
use App\Service\Defender;
use App\Service\Paginator;
use Psr\Container\ContainerInterface;
use Symfony\Component\Form\FormInterface;
use Twig\Environment;
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
        ];
    }

    public function is_role(User $user, $role): bool
    {
        return $this->defender->isGranted($user,$role);
    }

    public function rightToChangeUserRights(User $moderator, User $user): bool
    {
        return $this->defender->rightToChangeUserRights($moderator,$user);
    }
}
