<?php

namespace App\Service;

use App\Entity\Post;
use App\Entity\Person;
use App\Entity\Song;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;

class Sitemap
{
    private $em;
    private $generator;
    private $twig;

    public function __construct(EntityManagerInterface $em, UrlGeneratorInterface $generator, Environment $twig)
    {
        $this->em = $em;
        $this->generator = $generator;
        $this->twig = $twig;
    }

    /**
     * @throws RuntimeError
     * @throws SyntaxError
     * @throws LoaderError
     */
    public function urls($hostname): Response
    {
        $urls = [];

        // Static urls
        $urls[] = [
            'loc' => $this->generator->generate('app_home'),
            'changefreq' => 'hourly'
        ];
        $urls[] = [
            'loc' => $this->generator->generate('song_index'),
            'changefreq' => 'hourly'
        ];
        $urls[] = [
            'loc' => $this->generator->generate('song_chart', [
                'chart' => 'trends'
            ]),
            'changefreq' => 'daily'
        ];
        $urls[] = [
            'loc' => $this->generator->generate('song_chart', [
                'chart' => 'novelty'
            ]),
            'changefreq' => 'daily'
        ];

        $urls[] = ['loc' => $this->generator->generate('app_login')];
        $urls[] = ['loc' => $this->generator->generate('app_register')];

        // Song urls
        foreach ($this->em->getRepository(Song::class)->findBy(['status' => true]) as $song) {
            $urls[] = [
                'loc' => $this->generator->generate('song_show', [
                    'slug' => $song->getSlug()
                ]),
                'lastmod' => $song->getEditingDate()->format('Y-m-d')
            ];
        }

        // People urls
        foreach ($this->em->getRepository(Person::class)->findActiveSongsPeopleByActivity('vocalist') as $person) {
            $urls[] = [
                'loc' => $this->generator->generate('person_show', [
                    'slug' => $person->getSlug()
                ]),
                'lastmod' => $person->getUpdatedAt()->format('Y-m-d')
            ];
        }

        // Response creation
        $response = new Response(
            $this->twig->render('interface/layouts/service/sitemap.html.twig', [
                'urls' => $urls,
                'hostname' => $hostname
            ]),
            200
        );

        // HTTP headers
        $response->headers->set('Content-Type', 'text/xml');

        return $response;
    }
}
