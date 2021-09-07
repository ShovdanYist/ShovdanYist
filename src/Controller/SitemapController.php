<?php

namespace App\Controller;

use App\Entity\Song;
use App\Entity\People;
use App\Entity\Article;
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
            'loc' => $this->generateUrl('song_index'),
            'changefreq' => 'hourly'
        ];
        $urls[] = [
            'loc' => $this->generateUrl('song_chart', [
                'chart' => 'trends'
            ]),
            'changefreq' => 'daily'
        ];
        $urls[] = [
            'loc' => $this->generateUrl('song_chart', [
                'chart' => 'novelty'
            ]),
            'changefreq' => 'daily'
        ];

        $urls[] = ['loc' => $this->generateUrl('app_login')];
        $urls[] = ['loc' => $this->generateUrl('app_register')];

        // Adding song urls
        foreach ($this->getDoctrine()->getRepository(Song::class)->findBy(['status' => true]) as $music) {
            $urls[] = [
                'loc' => $this->generateUrl('song_show', [
                    'slug' => $music->getSlug()
                ]),
                'lastmod' => $music->getEditingDate()->format('Y-m-d')
            ];
        }

        // Adding articles urls
        foreach ($this->getDoctrine()->getRepository(Article::class)->findBy(['status' => true]) as $article) {
            $urls[] = [
                'loc' => $this->generateUrl('article_show', [
                    'slug' => $article->getSlug()
                ]),
                'lastmod' => $article->getUpdatedAt()->format('Y-m-d')
            ];
        }

        // Adding vocalists urls
        foreach ($this->getDoctrine()->getRepository(People::class)->findAllVocalists('vocalist') as $person) {
            $urls[] = [
                'loc' => $this->generateUrl('song_vocalist', [
                    'slug' => $person->getSlug()
                ]),
                'lastmod' => $person->getUpdatedAt()->format('Y-m-d')
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
