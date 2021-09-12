<?php


namespace App\Controller\Dashboard;

use App\Entity\Song;
use App\Entity\Person;
use App\Entity\Article;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class DashHomeController
 * @package App\Controller\Dashboard
 * @Route("/dashboard", name="dash_")
 */
class DashHomeController extends AbstractController
{
    /**
     * @Route("/", name="index")
     * @return Response
     */
    public function index(): Response
    {
        $articles = $this->getDoctrine()->getRepository(Article::class);
        $songs = $this->getDoctrine()->getRepository(Song::class);
        $users = $this->getDoctrine()->getRepository(User::class);
        $people = $this->getDoctrine()->getRepository(Person::class);

        $article = [
            'users' => [
                'name' => 'users',
                'moderation' => null,
                'published' => null,
                'total' => $users->count([])
            ],
            'articles' => [
                'name' => 'articles',
                'moderation' => $articles->count(['status' => false]),
                'published' => $articles->count(['status' => true]),
                'total' => $articles->count([])
            ],
            'song' => [
                'name' => 'song',
                'moderation' => $songs->count(['status' => false]),
                'published' => $songs->count(['status' => true]),
                'total' => $songs->count([])
            ],
            'people' => [
                'name' => 'people',
                'moderation' => null,
                'published' => null,
                'total' => $people->count([])
            ]
        ];

        return $this->render('dashboard/home/index.html.twig', [
            'article' => $article
        ]);
    }
}
