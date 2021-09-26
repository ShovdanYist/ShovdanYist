<?php

namespace App\Service;

use App\Entity\Comment;
use App\Entity\Post;
use App\Entity\Song;
use App\Entity\User;
use App\Repository\PostRepository;
use App\Repository\UserRepository;
use Cocur\Slugify\Slugify;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Authorization\AccessDecisionManagerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Contracts\Translation\TranslatorInterface;

class Defender
{
    private $accessDecisionManager;
    private $translator;
    private $usersRepo;
    private $user;
    private $postRepo;
    private $roles = [
        'ROLE_POST_AUTHOR',
        'ROLE_POST_EDITOR',
        'ROLE_POST_COMMENT_REMOVER',
        'ROLE_POST_MODERATOR',
        'ROLE_SONG_AUTHOR',
        'ROLE_SONG_EDITOR',
        'ROLE_SONG_COMMENT_REMOVER',
        'ROLE_SONG_MODERATOR',
        'ROLE_PEOPLE_EDITOR',
        'ROLE_PEOPLE_MODERATOR',
        'ROLE_USER_MANAGER',
        'ROLE_USER_BLOCKER',
        'ROLE_USER_ANALYST',
        'ROLE_USER_ACTIONS'
    ];

    public function __construct(Security $security, UserRepository $usersRepo, PostRepository $postRepo, AccessDecisionManagerInterface $accessDecisionManager, TranslatorInterface $translator) {
        $this->user = $security->getUser();
        $this->accessDecisionManager = $accessDecisionManager;
        $this->translator = $translator;
        $this->usersRepo = $usersRepo;
        $this->postRepo = $postRepo;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function getActionUsers()
    {
        return $this->usersRepo->findActionUsers();
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

    public function rightToDeleteComment($user,Comment $comment): bool
    {
        $right = false;

        if ($comment->getAuthor() === $user) {
            $right = true;
        } elseif ($comment->getPost()) {

            if ($this->isGranted($user,'ROLE_POST_COMMENT_REMOVER')) {
                $right = true;
            } elseif ($comment->getPost()->getAuthor() === $user) {
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

    public function rightToEditSongs(User $user): bool
    {
        if ($this->isGranted($user,'ROLE_SONG_MODERATOR') || $this->isGranted($user,'ROLE_SONG_EDITOR')) {
            return true;
        } else {
            return false;
        }
    }

    public function rightToEditSong(Song $song): bool
    {
        $right = false;

        if ($song->getAuthor() === $this->user && $song->getStatus() === null) {
            $right = true;
        } elseif ($this->isGranted($this->user,'ROLE_SONG_MODERATOR') || $this->isGranted($this->user,'ROLE_SONG_EDITOR')) {
            $right = true;
        }

        return $right;
    }

    public function hasOnlyAuthorRightsInSongs(User $user): bool
    {
        if ($this->isGranted($user,'ROLE_SONG_AUTHOR') && !$this->isGranted($user,'ROLE_SONG_EDITOR') && !$this->isGranted($user,'ROLE_SONG_MODERATOR')) {
            return true;
        } else {
            return false;
        }
    }

    public function rightToSetUsername($username, $user): array
    {
        $exist = $this->usersRepo->findOneBy(['username' => $username]);
        $message = null;
        $status = false;

        // Constraints for username
        if (strlen($username) < 8 || strlen($username) > 28) {
            $message = $this->translator->trans('form.username.must.be.between');
        } elseif (preg_match('/^[a-z1-9._]+$/i', $username) == 0) {
            $message = $this->translator->trans('form.username.can.consist.symbols');
        } elseif ($exist) {
            $message = $this->translator->trans('form.username.already.exists') . ' "' . $username . '"';
        } else {
            $status = true;
        }

        // Skip constraints if this user already have this username
        if ($exist === $user) {
            $status = true;
        }

        return ['status' => $status, 'message' => $message];
    }

    public function rightToSetTitleSlug(Post $post): bool
    {
        $slugify  = new Slugify();
        $right  = true;
        $exist = null;

        $bySlug = $this->postRepo->findOneBy(['slug' => $slugify->slugify($post->getTitle())]);
        $byTitle = $this->postRepo->findOneBy(['title' => $post->getTitle()]);

        if ($bySlug) {
            $right = false;
            $exist = $bySlug;
        } elseif ($byTitle) {
            $right = false;
            $exist = $byTitle;
        }

        if ($exist === $post) {
            $right = true;
        }

        return $right;
    }
}
