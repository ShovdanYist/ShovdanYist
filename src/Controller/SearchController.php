<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\Article;
use App\Entity\Song;
use App\Entity\User;
use App\Service\Compiler;
use App\Service\Paginator;
use Symfony\Component\Form\Extension\Core\Type\SearchType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route(name="search_")
 * Class ArticleController
 * @package App\Controller
 */
class SearchController extends CustomAbstractController
{
    /**
     * @Route("/search/{keyword}", name="index", methods={"POST","GET"})
     * @param Request $request
     * @param $keyword
     * @param Compiler $compiler
     * @return Response
     */
    public function index(Request $request, $keyword, Compiler $compiler): Response
    {
        $form = $this->createFormBuilder()
            ->add('keyword', SearchType::class, [
                'label' => 'search',
                'attr' => ['value' => $keyword]
            ])
            ->getForm();

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            return $this->redirectToRoute('search_index',[
                'keyword' => $form->get('keyword')->getData()
            ]);
        }

        $keyword = mb_strtolower($keyword);
        $repoSongs = $this->getDoctrine()->getRepository(Song::class)->findByKeyword($keyword, ['releaseDate' => 'DESC'],5);
        $repoArticles = $this->getDoctrine()->getRepository(Article::class)->findByKeyword($keyword, [],5);
        $repoUsers = $this->getDoctrine()->getRepository(User::class)->findByKeyword($keyword,['registeredAt' => 'DESC'],5);
        $songs = [];
        $articles = [];

        foreach ($repoSongs as $song) {
            $result = $compiler->matchInText($compiler->htmlToText($song->getLyrics()),$keyword);

            $songs[] = [
                'info' => $song,
                'words' => str_replace($keyword,'<span class="found-keyword">' . $keyword . '</span>', $result)
            ];
        }

        foreach ($repoArticles as $article) {
            $result = $compiler->matchInText($compiler->htmlToText($article->getContent()),$keyword);

            $articles[] = [
                'info' => $article,
                'words' => str_replace($keyword,'<span class="found-keyword">' . $keyword . '</span>', $result)
            ];
        }

        return $this->render('interface/search/index.html.twig', [
            'form' => $form->createView(),
            'keyword' => $keyword,
            'songs' => $songs,
            'articles' => $articles,
            'users' => $repoUsers
        ]);
    }

    /**
     * @Route("/search/songs/{keyword}/{page<\d+>?1}", name="songs", methods={"POST","GET"})
     * @param $keyword
     * @param $page
     * @param Paginator $paginator
     * @param Compiler $compiler
     * @return Response
     */
    public function songs($keyword, $page, Paginator $paginator, Compiler $compiler): Response
    {
        $paginator
            ->setClass(Song::class)
            ->setMethod('findByKeyword')
            ->setOrder(['releaseDate' => 'DESC'])
            ->setParameters(['keyword' => $keyword])
            ->setCriteria($keyword)
            ->setLimit(10)
            ->setPage($page)
        ;

        $songs = [];

        foreach ($paginator->getData() as $song) {
            $result = $compiler->matchInText($compiler->htmlToText($song->getLyrics()),$keyword);

            $songs[] = [
                'info' => $song,
                'words' => str_replace($keyword,'<span class="found-keyword">' . $keyword . '</span>', $result)
            ];
        }

        return $this->render('interface/search/songs.html.twig', [
            'keyword' => $keyword,
            'page' => $page,
            'songs' => $songs,
            'paginator' => $paginator
        ]);
    }

    /**
     * @Route("/search/articles/{keyword}/{page<\d+>?1}", name="articles", methods={"POST","GET"})
     * @param $keyword
     * @param $page
     * @param Paginator $paginator
     * @param Compiler $compiler
     * @return Response
     */
    public function articles($keyword, $page, Paginator $paginator, Compiler $compiler): Response
    {
        $paginator
            ->setClass(Article::class)
            ->setMethod('findByKeyword')
            ->setOrder([])
            ->setParameters(['keyword' => $keyword])
            ->setCriteria($keyword)
            ->setLimit(10)
            ->setPage($page)
        ;

        $articles = [];

        foreach ($paginator->getData() as $article) {
            $result = $compiler->matchInText($compiler->htmlToText($article->getContent()),$keyword);

            $articles[] = [
                'info' => $article,
                'words' => str_replace($keyword,'<span class="found-keyword">' . $keyword . '</span>', $result)
            ];
        }

        return $this->render('interface/search/articles.html.twig', [
            'keyword' => $keyword,
            'page' => $page,
            'articles' => $articles,
            'paginator' => $paginator
        ]);
    }

    /**
     * @Route("/search/users/{keyword}/{page<\d+>?1}", name="users", methods={"POST","GET"})
     * @param $keyword
     * @param $page
     * @param Paginator $paginator
     * @param Compiler $compiler
     * @return Response
     */
    public function users($keyword, $page, Paginator $paginator, Compiler $compiler): Response
    {
        $paginator
            ->setClass(User::class)
            ->setMethod('findByKeyword')
            ->setOrder(['registeredAt' => 'DESC'])
            ->setParameters(['keyword' => $keyword])
            ->setCriteria($keyword)
            ->setLimit(20)
            ->setPage($page)
        ;

        return $this->render('interface/search/users.html.twig', [
            'keyword' => $keyword,
            'page' => $page,
            'paginator' => $paginator,
            'users' => $paginator->getData()
        ]);
    }
}
