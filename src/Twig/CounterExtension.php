<?php

namespace App\Twig;

use App\Entity\Music;
use App\Entity\People;
use App\Entity\User;
use App\Repository\BookmarkRepository;
use App\Repository\MusicRepository;
use App\Repository\NotificationRepository;
use App\Repository\ArticleRepository;
use App\Repository\UserMusicRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class CounterExtension extends AbstractExtension
{
    private $musicRepo;
    private $userMusicRepo;
    private $notifyRepo;
    private $translator;
    private $bookmarks;
    private $articleRepo;
    private $security;

    public function __construct(MusicRepository $musicRepository, ArticleRepository $articleRepo, BookmarkRepository $bookmarks, UserMusicRepository $userMusicRepo, NotificationRepository $notifyRepo, TranslatorInterface $translator, Security $security)
    {
        $this->musicRepo = $musicRepository;
        $this->articleRepo = $articleRepo;
        $this->userMusicRepo = $userMusicRepo;
        $this->bookmarks = $bookmarks;
        $this->notifyRepo = $notifyRepo;
        $this->translator = $translator;
        $this->security = $security;
    }

    public function getFunctions()
    {
        return [
            new TwigFunction('featuring', [$this, 'artistFeaturing'], ['is_safe' => ['html']]),
            new TwigFunction('featuringsCount', [$this, 'featuringsCount'], ['is_safe' => ['html']]),
            new TwigFunction('songsCount', [$this, 'songsCount'], ['is_safe' => ['html']]),
            new TwigFunction('userContainMusic', [$this, 'userContainMusic'], ['is_safe' => ['html']]),
            new TwigFunction('userContainArticle', [$this, 'userContainArticle'], ['is_safe' => ['html']]),
            new TwigFunction('notifyCount', [$this, 'notifyCount'], ['is_safe' => ['html']]),
            new TwigFunction('articleModerationCount', [$this, 'articleModerationCount'], ['is_safe' => ['html']]),
            new TwigFunction('notifyIndicator', [$this, 'notifyIndicator'], ['is_safe' => ['html']]),
        ];
    }

    public function artistFeaturing(Music $song, $delimiter = '')
    {
        $featuring = $song->getFeaturing();
        $result = [];

        foreach ($featuring as $artist) {
            array_push($result,$artist->getFullName());
        }

        sort($result);
        $result = implode($delimiter,$result);
        $template = ' (' . $this->translator->trans('feat') . ' %s)';

        if ($featuring->isEmpty()){
            $template = null;
        }

        return sprintf($template, $result);
    }

    public function featuringsCount(People $vocalist)
    {
        $featurings = count($this->musicRepo->findFeaturingCount($vocalist));
        ($featurings == 1) ? $word = $this->translator->trans('featuring_singular') : $word = $this->translator->trans('featuring_plural');
        $template = '<span class="badge badge-secondary">%s %s</span>';

        if ($featurings == 0){
            return null;
        }

        return sprintf(
            $template,
            $featurings,
            $word
        );
    }

    public function songsCount(People $vocalist)
    {
        $songs = $this->musicRepo->count(['artist' => $vocalist,'status' => true]);
        ($songs == 1) ? $word = $this->translator->trans('song') : (($songs < 5) ? $word = $this->translator->trans('two_songs') : $word = $this->translator->trans('songs'));
        $template = '<span class="badge badge-info">%s %s</span>';

        return sprintf(
            $template,
            $songs,
            $word
        );
    }

    public function userContainMusic($user, $song)
    {
        return $this->userMusicRepo->findOneBy(['user' => $user, 'music' => $song]);
    }

    public function userContainArticle($user, $article)
    {
        return $this->bookmarks->findOneBy(['user' => $user, 'article' => $article]);
    }

    public function notifyCount($user): int
    {
        return $this->notifyRepo->count(['receiver' => $user, 'seen' => false]);
    }

    public function articleModerationCount(): int
    {
        return $this->articleRepo->count(['status' => null, 'moderation' => true]);
    }

    public function notifyIndicator(User $user): int
    {
        if ($this->security->isGranted('ROLE_ARTICLE_APPROVER')){
            $result = $this->articleModerationCount() + $this->notifyCount($user);
        } else {
            $result = $this->notifyCount($user);
        }
        return $result;
    }
}
