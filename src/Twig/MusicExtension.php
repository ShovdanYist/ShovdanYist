<?php

namespace App\Twig;

use App\Repository\MusicRepository;
use App\Repository\TagRepository;
use Cocur\Slugify\Slugify;
use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class MusicExtension extends AbstractExtension
{
    private $music;
    private $letters = [
        'a' => 'а',
        'v' => 'в',
        'g' => 'г',
        'd' => 'д',
        'zh' => 'ж',
        'z' => 'з',
        'i' => 'и',
        'k' => 'к',
        'l' => 'л',
        'm' => 'м',
        'n' => 'н',
        'o' => 'о',
        'p' => 'п',
        'r' => 'р',
        's' => 'с',
        't' => 'т',
        'u' => 'у',
        'f' => 'ф',
        'h' => 'х',
        'sh' => 'ш',
        'e' => 'э',
        'yu' => 'ю',
        'ya' => 'я'
    ];

    public function __construct(MusicRepository $music)
    {
        $this->music = $music;
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('player', [$this, 'player'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('listing', [$this, 'listing'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('chartBox', [$this, 'chartBox'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('lettersMenu', [$this, 'lettersMenu'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('slugify', [$this, 'slugify'], ['is_safe' => ['html'], 'needs_environment' => true]),
        ];
    }

    public function letters()
    {
        return $this->letters;
    }

    public function player(Environment $twig, $song, $download = null, $add = null, $type = null, $image = null)
    {
        return $twig->render('layouts/modules/player.html.twig', [
            'song' => $song,
            'download' => $download,
            'add' => $add,
            'type' => $type,
            'image' => $image
        ]);
    }

    public function chartBox(Environment $twig, $chart)
    {
        if ($chart == 'trends') {
            $songs = $this->music->findBy(['status' => true, 'featured' => true], ['editingDate' => 'DESC'],5);
        } elseif ($chart == 'novelty') {
            $songs = $this->music->findBy(['status' => true], ['releaseDate' => 'DESC'],5);
        } elseif ($chart == 'lasts') {
            $songs = $this->music->findBy(['status' => true], ['publicationDate' => 'DESC'],5);
        } elseif ($chart == 'discussed') {
            $songs = $this->music->findByDiscussed(['status' => true],[],5);
        }

        return $twig->render('layouts/modules/chart_box.html.twig', [
            'songs' => $songs,
            'chart' => $chart
        ]);
    }

    public function lettersMenu(Environment $twig)
    {
        return $twig->render('layouts/modules/letters.html.twig', [
            'letters' => $this->letters
        ]);
    }

    public function slugify(Environment $twig, $data)
    {
        $slugify = new Slugify();
        return $slugify->slugify($data);
    }
}
