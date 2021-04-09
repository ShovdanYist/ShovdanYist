<?php

namespace App\Controller;

use App\Entity\People;
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
        $urls[] = ['loc' => $this->generateUrl('app_home')];
        $urls[] = ['loc' => $this->generateUrl('app_login')];
        $urls[] = ['loc' => $this->generateUrl('app_register')];

        // Ajouter les URLs dinamiques
        foreach ($this->getDoctrine()->getRepository(People::class)->findAllSingers('vocalist') as $person) {
            $image = [
                'loc' => '/uploads/images/people/' . $person->getPicture(),
                'title' => $person->getFirstName() . ' ' . $person->getLastName()
            ];

            $urls[] = [
                'loc' => $this->generateUrl('music_singer', [
                    'slug' => $person->getSlug()
                ]),
                'image' => $image,
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
