<?php

namespace App\Twig;

use App\Entity\Bookmark;
use App\Entity\PlaylistSong;
use App\Entity\Song;
use App\Entity\Person;
use App\Entity\User;
use App\Repository\BookmarkRepository;
use App\Repository\SongRepository;
use App\Repository\NotificationRepository;
use App\Repository\ArticleRepository;
use App\Repository\PlaylistSongRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class CounterExtension extends AbstractExtension
{
    private $songRepo;
    private $playlistSongRepo;
    private $notifyRepo;
    private $translator;
    private $bookmarks;
    private $articleRepo;
    private $security;

    public function __construct(SongRepository $songRepository, ArticleRepository $articleRepo, BookmarkRepository $bookmarks, PlaylistSongRepository $playlistSongRepo, NotificationRepository $notifyRepo, TranslatorInterface $translator, Security $security)
    {
        $this->songRepo = $songRepository;
        $this->articleRepo = $articleRepo;
        $this->playlistSongRepo = $playlistSongRepo;
        $this->bookmarks = $bookmarks;
        $this->notifyRepo = $notifyRepo;
        $this->translator = $translator;
        $this->security = $security;
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('featuring', [$this, 'vocalistFeaturing'], ['is_safe' => ['html']]),
            new TwigFunction('songsCount', [$this, 'songsCount'], ['is_safe' => ['html']]),
            new TwigFunction('userContainSong', [$this, 'userContainSong'], ['is_safe' => ['html']]),
            new TwigFunction('userContainArticle', [$this, 'userContainArticle'], ['is_safe' => ['html']]),
            new TwigFunction('notifyCount', [$this, 'notifyCount'], ['is_safe' => ['html']]),
            new TwigFunction('articleModerationCount', [$this, 'articleModerationCount'], ['is_safe' => ['html']]),
            new TwigFunction('songModerationCount', [$this, 'songModerationCount'], ['is_safe' => ['html']]),
            new TwigFunction('notifyIndicator', [$this, 'notifyIndicator'], ['is_safe' => ['html']]),
            new TwigFunction('userHavePlaylistSongs', [$this, 'userHavePlaylistSongs'], ['is_safe' => ['html']]),
            new TwigFunction('songViewsCount', [$this, 'songViewsCount'], ['is_safe' => ['html']]),
        ];
    }

    public function vocalistFeaturing(Song $song, $delimiter = ''): string
    {
        $featuring = $song->getFeaturing();
        $result = [];

        foreach ($featuring as $vocalist) {
            array_push($result,$vocalist->getFullName());
        }

        sort($result);
        $result = implode($delimiter,$result);
        $template = ' (' . $this->translator->trans('feat') . ' %s)';

        if ($featuring->isEmpty()){
            $template = null;
        }

        return sprintf($template, $result);
    }

    public function songsCount(Person $person, $status = true): int
    {
        return $this->songRepo->count(['vocalist' => $person,'status' => $status]);
    }

    public function userContainSong($user, $song): ?PlaylistSong
    {
        return $this->playlistSongRepo->findOneBy(['user' => $user, 'song' => $song]);
    }

    public function userContainArticle($user, $article): ?Bookmark
    {
        return $this->bookmarks->findOneBy(['user' => $user, 'article' => $article]);
    }

    public function userHavePlaylistSongs($user): bool
    {
        return (bool)$this->playlistSongRepo->findOneBy(['user' => $user]);
    }

    public function notifyCount($user): int
    {
        return $this->notifyRepo->count(['receiver' => $user, 'seen' => false]);
    }

    public function articleModerationCount(): int
    {
        return $this->articleRepo->count(['status' => null, 'moderation' => true]);
    }

    public function songModerationCount(): int
    {
        return $this->songRepo->count(['status' => false]);
    }

    public function notifyIndicator(User $user): int
    {
        $result = $this->notifyCount($user);

        if ($this->security->isGranted('ROLE_POST_MODERATOR')) {
            $result += $this->articleModerationCount();
        }

        if ($this->security->isGranted('ROLE_SONG_MODERATOR')) {
            $result += $this->songModerationCount();
        }

        return $result;
    }

    public function songViewsCount(Song $song): float
    {
        return $this->songRepo->getSongViews($song);
    }
}
