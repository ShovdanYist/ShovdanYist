<?php


namespace App\Controller\Dashboard;

use App\Entity\Music;
use App\Entity\People;
use App\Entity\Post;
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
        $posts = $this->getDoctrine()->getRepository(Post::class);
        $musics = $this->getDoctrine()->getRepository(Music::class);
        $users = $this->getDoctrine()->getRepository(User::class);
        $people = $this->getDoctrine()->getRepository(People::class);

        $post = [
            'users' => [
                'name' => 'users',
                'moderation' => null,
                'published' => null,
                'total' => $users->count([])
            ],
            'articles' => [
                'name' => 'articles',
                'moderation' => $posts->count(['status' => false]),
                'published' => $posts->count(['status' => true]),
                'total' => $posts->count([])
            ],
            'music' => [
                'name' => 'music',
                'moderation' => $musics->count(['status' => false]),
                'published' => $musics->count(['status' => true]),
                'total' => $musics->count([])
            ],
            'people' => [
                'name' => 'people',
                'moderation' => null,
                'published' => null,
                'total' => $people->count([])
            ]
        ];

        return $this->render('dashboard/home/index.html.twig', [
            'post' => $post
        ]);
    }
}
