<?php

namespace App\Twig;

use App\Entity\Bookmark;
use App\Entity\Like;
use App\Entity\PlaylistSong;
use App\Entity\Song;
use App\Entity\Person;
use App\Entity\User;
use App\Repository\BookmarkRepository;
use App\Repository\FollowRepository;
use App\Repository\LikeRepository;
use App\Repository\MessageRepository;
use App\Repository\SongRepository;
use App\Repository\NotificationRepository;
use App\Repository\PostRepository;
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
    private $messageRepo;
    private $translator;
    private $bookmarks;
    private $likes;
    private $postRepo;
    private $followRepo;

    public function __construct(SongRepository $songRepository, PostRepository $postRepo, BookmarkRepository $bookmarks, LikeRepository $likes, PlaylistSongRepository $playlistSongRepo, NotificationRepository $notifyRepo, MessageRepository $messageRepo, TranslatorInterface $translator, FollowRepository $followRepo)
    {
        $this->songRepo = $songRepository;
        $this->postRepo = $postRepo;
        $this->playlistSongRepo = $playlistSongRepo;
        $this->bookmarks = $bookmarks;
        $this->likes = $likes;
        $this->notifyRepo = $notifyRepo;
        $this->messageRepo = $messageRepo;
        $this->translator = $translator;
        $this->followRepo = $followRepo;
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('featuring', [$this, 'vocalistFeaturing'], ['is_safe' => ['html']]),
            new TwigFunction('songsCount', [$this, 'songsCount'], ['is_safe' => ['html']]),
            new TwigFunction('userContainSong', [$this, 'userContainSong'], ['is_safe' => ['html']]),
            new TwigFunction('userBookmarkedPost', [$this, 'userBookmarkedPost'], ['is_safe' => ['html']]),
            new TwigFunction('userLikedPost', [$this, 'userLikedPost'], ['is_safe' => ['html']]),
            new TwigFunction('userLikedComment', [$this, 'userLikedComment'], ['is_safe' => ['html']]),
            new TwigFunction('notifyCount', [$this, 'notifyCount'], ['is_safe' => ['html']]),
            new TwigFunction('messagesCount', [$this, 'messagesCount'], ['is_safe' => ['html']]),
            new TwigFunction('conversationMessagesCount', [$this, 'conversationMessagesCount'], ['is_safe' => ['html']]),
            new TwigFunction('postModerationCount', [$this, 'postModerationCount'], ['is_safe' => ['html']]),
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

    public function userBookmarkedPost($user, $post): ?Bookmark
    {
        return $this->bookmarks->findOneBy(['user' => $user, 'post' => $post]);
    }

    public function userLikedPost($user, $post): ?Like
    {
        return $this->likes->findOneBy(['user' => $user, 'post' => $post]);
    }

    public function userLikedComment($user, $comment): ?Like
    {
        return $this->likes->findOneBy(['user' => $user, 'comment' => $comment]);
    }

    public function userHavePlaylistSongs($user): bool
    {
        return (bool)$this->playlistSongRepo->findOneBy(['user' => $user]);
    }

    public function notifyCount($user): int
    {
        $notifyCount = $this->notifyRepo->count(['receiver' => $user, 'seen' => false, 'status' => true]);
        $requestsCount = $this->followRepo->count(['followed' => $user, 'accepted' => false]);
        return $notifyCount + $requestsCount;
    }

    public function messagesCount($user): int
    {
        return $this->messageRepo->count(['receiver' => $user, 'seen' => false]);
    }

    public function conversationMessagesCount($user, $sender): int
    {
        return $this->messageRepo->count(['receiver' => $user, 'sender' => $sender, 'seen' => false]);
    }

    public function postModerationCount(): int
    {
        return $this->postRepo->count(['status' => null]);
    }

    public function songModerationCount(): int
    {
        return $this->songRepo->count(['status' => false]);
    }

    public function notifyIndicator(User $user): int
    {
        return $this->notifyCount($user) + $this->messagesCount($user);
    }

    public function songViewsCount(Song $song): float
    {
        return $this->songRepo->getSongViews($song);
    }
}
