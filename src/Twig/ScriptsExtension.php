<?php

namespace App\Twig;

use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class ScriptsExtension extends AbstractExtension
{
    public function getFunctions(): array
    {
        return [
            new TwigFunction('autoplay', [$this, 'autoplay'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('ckeditor', [$this, 'ckeditor'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('chosen', [$this, 'chosen'], ['is_safe' => ['html'], 'needs_environment' => true]),
        ];
    }

    public function autoplay(Environment $twig)
    {
        return $twig->render('layouts/scripts/autoplay.html.twig');
    }

    public function ckeditor(Environment $twig, $type = 'user')
    {
        return $twig->render('layouts/scripts/ckeditor.html.twig', [
            'type' => $type
        ]);
    }

    public function chosen(Environment $twig, $limit = 3, $selector = '.chosen')
    {
        return $twig->render('layouts/scripts/chosen.html.twig', [
            'limit' => $limit,
            'selector' => $selector
        ]);
    }
}
