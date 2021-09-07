<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\Song;
use App\Entity\People;
use App\Entity\Tag;
use App\Entity\UserMusic;
use App\Form\SongType;
use App\Form\PeopleType;
use App\Repository\SongRepository;
use App\Repository\PeopleRepository;
use App\Repository\UserMusicRepository;
use App\Repository\UserRepository;
use App\Service\Paginator;
use App\Twig\SongExtension;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NoResultException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SongController extends CustomAbstractController
{
    /**
     * @Route("/song", name="song_index", methods={"GET"})
     * @return Response
     */
    public function index(): Response
    {
        return $this->render('song/index.html.twig');
    }

    /**
     * @Route("/song/tag/{slug}/{page<\d+>?1}", name="tag_show", methods={"GET"})
     * @param Tag $tag
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function tag(Tag $tag, $page, Paginator $paginator): Response
    {
        if ($tag->getType() !== 'song') {
            throw $this->createNotFoundException();
        }

        $paginator
            ->setParameters(['slug' => $tag->getSlug()])
            ->setCriteria(['tag' => $tag])
            ->setMethod('findByTag')
            ->setOrder(['title' => 'DESC'])
            ->setClass(Song::class)
            ->setType('tag')
            ->setLimit(20)
            ->setPage($page);

        ($page > 1) ? $page = ' | Страница ' . $page : $page = '';

        $info = [
            'title' => $tag->getTitle() . ' | Чеченские песни с тегом «' . mb_strtolower($tag->getTitle()) . '»' . $page,
            'h1' => 'Песни с тегом «' . mb_strtolower($tag->getTitle()) . '»',
            'description' => 'Чеченские песни жанра «' . mb_strtolower($tag->getTitle()) . '»'
        ];

        return $this->render('song/chart.html.twig', [
            'songs' => $paginator->getData(),
            'paginator' => $paginator,
            'info' => $info
        ]);
    }

    /**
     * @Route("/chart/{chart}/{page<\d+>?1}", name="song_chart", methods={"GET"})
     * @param $chart
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function chart($chart, $page, Paginator $paginator): Response
    {
        $paginator->setClass(Song::class)->setParameters(['chart' => $chart])->setLimit(20)->setPage($page);

        if ($chart == 'trends') {
            $paginator->setOrder(['editingDate' => 'DESC'])->setCriteria(['status' => true, 'featured' => true]);
        } elseif ($chart == 'lasts') {
            $paginator->setOrder(['publicationDate' => 'DESC'])->setCriteria(['status' => true]);
        } elseif ($chart == 'novelty') {
            $paginator->setOrder(['releaseDate' => 'DESC'])->setCriteria(['status' => true]);
        } elseif ($chart == 'discussed') {
            $paginator->setCriteria(['status' => true])->setMethod('findByDiscussed');
        } else {
            throw $this->createNotFoundException();
        }

        ($page > 1) ? $page = ' | Страница ' . $page : $page = '';

        if ($chart == 'lasts' || $chart == 'random') {
            $title = $this->trans($chart) . ' песни' . $page;
            $description = $this->trans($chart) . ' песни на ShovdanYist';
        } else {
            $title = $this->trans($chart) . ' | Чеченские музыкальные ' . mb_strtolower($this->trans($chart)) . ' ' . date("Y") . $page;
            $description = 'Чеченские музыкальные ' . mb_strtolower($this->trans($chart)) . ' ' . date("Y") . ' года';
        }

        $info = [
            'title' => $title,
            'h1' => $this->trans($chart),
            'description' => $description
        ];

        return $this->render('song/chart.html.twig', [
            'songs' => $paginator->getData(),
            'paginator' => $paginator,
            'info' => $info
        ]);
    }

    /**
     * @Route("/song/{slug}/{page<\d+>?1}", name="song_show", methods={"GET", "POST"})
     * @param Song $song
     * @param $page
     * @param EntityManagerInterface $manager
     * @return Response
     */
    public function song(Song $song, $page, EntityManagerInterface $manager): Response
    {
        if ($song->getStatus() != true) {throw $this->createNotFoundException();}

        $song->setViews($song->getViews()+1);
        $manager->persist($song);
        $manager->flush();

        return $this->render('song/show.html.twig', [
            'song' => $song,
            'page' => $page
        ]);
    }

    /**
     * @Route("/song/{slug}/edit", name="song_edit", methods={"GET","POST"})
     * @Security("has_role('ROLE_SONG_EDITOR')")
     * @param Request $request
     * @param Song $song
     * @return Response
     */
    public function songEdit(Request $request, Song $song)
    {
        $form = $this->createForm(SongType::class, $song)
            ->add('save', SubmitType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $this->getDoctrine()->getManager()->flush();

            if ($form->get('save')->isClicked()) {
                return $this->redirectToRoute('song_edit', [
                    'slug' => $song->getSlug()
                ]);
            }

            return $this->redirectToRoute('song_show',['slug' => $song->getSlug()]);
        }

        return $this->render('song/song_edit.html.twig', [
            'song' => $song,
            'form' => $form->createView(),
            'person' => $song->getArtist()
        ]);
    }

    /**
     * @Route("/playlister/{slug}", name="song_playlister", methods={"POST", "GET"})
     * @param Song $song
     * @param UserRepository $userRepo
     * @param UserMusicRepository $userMusicRepo
     * @return Response
     */
    public function playlister(Song $song, UserRepository $userRepo, UserMusicRepository $userMusicRepo): Response
    {
        $user = $userRepo->findOneBy(['username' => $this->getUser()->getUsername()]);
        $contains = $userMusicRepo->findOneBy(['user' => $user, 'song' => $song]);
        $em = $this->getDoctrine()->getManager();

        if ($contains) {
            $user->removeUserMusic($contains);
            $response = ['status' => 'removed', 'title' => $this->trans('add.to.playlist'), 'message' => $this->trans('flash.removed.from.playlist')];
        } else {
            $userMusic = new UserMusic();
            $userMusic->setUser($user);
            $userMusic->setSong($song);
            $em->persist($userMusic);
            $response = ['status' => 'added', 'title' => $this->trans('remove.from.playlist'), 'message' => $this->trans('flash.added.to.playlist')];
        }

        $em->flush();

        return $this->json([
            'response' => $response
        ]);
    }

    /**
     * @Route("/vocalist/{slug}", name="song_vocalist", methods={"GET"})
     * @param $slug
     * @param SongRepository $songRepo
     * @param PeopleRepository $people
     * @return Response
     */
    public function vocalist($slug, SongRepository $songRepo, PeopleRepository $people): Response
    {
        try {
            $vocalist = $people->findOneActiveVocalist($slug);
        }
        catch (NoResultException $e) {
            throw $this->createNotFoundException();
        }

        $songs = $songRepo->findBy(['artist' => $vocalist, 'status' => true], ['releaseDate' => 'DESC']);

        return $this->render('song/vocalist.html.twig', [
            'vocalist' => $vocalist,
            'songs' => $songs
        ]);
    }

    /**
     * @Route("/vocalist/{slug}/edit", name="vocalist_edit", methods={"GET","POST"})
     * @Security("has_role('ROLE_VOCALIST_EDITOR')")
     * @param Request $request
     * @param People $person
     * @return Response
     */
    public function vocalistEdit(Request $request, People $person): Response
    {
        $form = $this->createForm(PeopleType::class, $person);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('song_vocalist', ['slug' => $person->getSlug()]);
        }

        return $this->render('song/vocalist_edit.html.twig', [
            'person' => $person,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/vocalists/{letter}", name="song_vocalists", methods={"GET"})
     * @param $letter
     * @param PeopleRepository $people
     * @param SongExtension $extension
     * @return Response
     */
    public function vocalists($letter, PeopleRepository $people, SongExtension $extension): Response
    {
        if (!key_exists($letter,$extension->letters())) {
            throw $this->createNotFoundException();
        }

        return $this->render('song/vocalists.html.twig', [
            'vocalists' => $people->findVocalistByLetter($extension->letters()[$letter]),
            'letter' => $extension->letters()[$letter]
        ]);
    }
}
