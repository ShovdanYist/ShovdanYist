<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Genre;
use App\Entity\Music;
use App\Entity\People;
use App\Entity\Post;
use App\Entity\Theme;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SitemapController extends AbstractController
{
    /**
     * @Route("/sitemap.xml", name="sitemap", defaults={"_format"="xml"})
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        // Recuperer le don d'hote depuis l'URL
        $hostname = $request->getSchemeAndHttpHost();

        // Initialiser un tableau pour lister les URLs
        $urls = [];

        // Ajouter les URLs statiques
        $urls[] = [
            'loc' => $this->generateUrl('app_home'),
            'changefreq' => 'hourly'
        ];
        $urls[] = [
            'loc' => $this->generateUrl('music_index'),
            'changefreq' => 'hourly'
        ];
        $urls[] = [
            'loc' => $this->generateUrl('music_chart', [
                'chart' => 'trends'
            ]),
            'changefreq' => 'daily'
        ];
        $urls[] = [
            'loc' => $this->generateUrl('music_chart', [
                'chart' => 'novelty'
            ]),
            'changefreq' => 'daily'
        ];

        $urls[] = ['loc' => $this->generateUrl('app_login')];
        $urls[] = ['loc' => $this->generateUrl('app_register')];

        // Adding music urls
        foreach ($this->getDoctrine()->getRepository(Music::class)->findBy(['status' => true]) as $music) {
            $urls[] = [
                'loc' => $this->generateUrl('music_song', [
                    'slug' => $music->getSlug()
                ]),
                'lastmod' => $music->getEditingDate()->format('Y-m-d')
            ];
        }

        // Adding posts urls
        foreach ($this->getDoctrine()->getRepository(Post::class)->findBy(['status' => true]) as $post) {
            $urls[] = [
                'loc' => $this->generateUrl('post_show', [
                    'slug' => $post->getSlug()
                ]),
                'lastmod' => $post->getUpdatedAt()->format('Y-m-d')
            ];
        }

        // Adding singers urls
        foreach ($this->getDoctrine()->getRepository(People::class)->findAllSingers('vocalist') as $person) {
            $urls[] = [
                'loc' => $this->generateUrl('music_singer', [
                    'slug' => $person->getSlug()
                ]),
                'lastmod' => $person->getUpdatedAt()->format('Y-m-d')
            ];
        }

        // Adding categories urls
        foreach ($this->getDoctrine()->getRepository(Category::class)->findAll() as $category) {
            $urls[] = [
                'loc' => $this->generateUrl('post_category', [
                    'slug' => $category->getSlug()
                ]),
                'lastmod' => $category->getUpdatedAt()->format('Y-m-d')
            ];
        }

        // Adding genres urls
        foreach ($this->getDoctrine()->getRepository(Genre::class)->findAll() as $genre) {
            $urls[] = [
                'loc' => $this->generateUrl('genre_show', [
                    'slug' => $genre->getSlug()
                ]),
                'lastmod' => $genre->getUpdatedAt()->format('Y-m-d')
            ];
        }

        // Adding themes urls
        foreach ($this->getDoctrine()->getRepository(Theme::class)->findAll() as $theme) {
            $urls[] = [
                'loc' => $this->generateUrl('theme_show', [
                    'slug' => $theme->getSlug()
                ]),
                'lastmod' => $theme->getUpdatedAt()->format('Y-m-d')
            ];
        }

        // Fabrication de la reponse
        $response = new Response(
            $this->renderView('layouts/sitemap/index.html.twig', [
                'urls' => $urls,
                'hostname' => $hostname
            ]),
        200
        );

        // Ajouter les entêtes HTTP
        $response->headers->set('Content-Type', 'text/xml');

        // Envoyer la reponse
        return $response;
    }
}
