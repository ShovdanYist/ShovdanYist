<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\Song;
use App\Entity\Person;
use App\Entity\PlaylistSong;
use App\Form\SongType;
use App\Form\PeopleType;
use App\Repository\SongRepository;
use App\Repository\PeopleRepository;
use App\Repository\PlaylistSongRepository;
use App\Repository\UserRepository;
use App\Service\Defender;
use App\Service\Initializer;
use App\Service\Paginator;
use App\Twig\SongExtension;
use Doctrine\ORM\NoResultException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SongController extends CustomAbstractController
{
    /**
     * @Route("/music", name="song_index", methods={"GET"})
     * @return Response
     */
    public function index(): Response
    {
        return $this->render('interface/song/index.html.twig');
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
            $paginator->setCriteria(['status' => true])->setMethod('findByViews');
        } elseif ($chart == 'lasts') {
            $paginator->setCriteria(['status' => true])->setOrder(['publicationDate' => 'DESC']);
        } elseif ($chart == 'novelty') {
            $paginator->setCriteria(['status' => true])->setOrder(['releaseDate' => 'DESC']);
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

        return $this->render('interface/song/chart.html.twig', [
            'songs' => $paginator->getData(),
            'paginator' => $paginator,
            'info' => $info
        ]);
    }

    /**
     * @Route("/song/new/{person}", name="song_new", methods={"GET","POST"})
     * @Security("has_role('ROLE_SONG_MODERATOR')")
     * @param Request $request
     * @param Initializer $initializer
     * @param null $person
     * @return Response
     */
    public function songNew(Request $request, Initializer $initializer, $person = null): Response
    {
        $song = new Song();

        if ($person) {
            $person = $this->getDoctrine()->getRepository(Person::class)->findOneBy(['id' => $person]);
            $song->setVocalist($person);
        }

        $form = $this->createForm(SongType::class, $song)
                     ->add('save', SubmitType::class)
                     ->add('saveAndNew', SubmitType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $initializer->initializeSongNew($song, $form);

            if ($form->get('save')->isClicked()) {
                return $this->redirectToRoute('song_edit', [
                    'slug' => $song->getSlug()
                ]);
            } elseif ($form->get('saveAndNew')->isClicked()) {
                $person = $song->getVocalist()->getId();
                return $this->redirectToRoute('song_new', [
                    'person' => $person
                ]);
            }

            return $this->redirectToRoute('moderation_music');
        }

        return $this->render('interface/song/song_new.html.twig', [
            'song' => $song,
            'form' => $form->createView(),
            'person' => $person
        ]);
    }

    /**
     * @Route("/song/{slug}/{page<\d+>?1}", name="song_show", methods={"GET", "POST"})
     * @param Song $song
     * @param $page
     * @param Initializer $initializer
     * @return Response
     */
    public function song(Song $song, $page, Initializer $initializer): Response
    {
        if ($song->getStatus() != true && !$this->isGranted('ROLE_OWNER')) {throw $this->createNotFoundException();}

        $initializer->initializeSongShow($song);

        return $this->render('interface/song/show.html.twig', [
            'song' => $song,
            'page' => $page
        ]);
    }

    /**
     * @Route("/song/edit/{slug}", name="song_edit", methods={"GET","POST"})
     * @param Request $request
     * @param Song $song
     * @param Initializer $initializer
     * @param Defender $defender
     * @return Response
     */
    public function songEdit(Request $request, Song $song, Initializer $initializer, Defender $defender): Response
    {
        if (!$defender->rightToEditSong($song)) {
            return $this->redirectToRoute('song_index');
        }

        $form = $this->createForm(SongType::class, $song)
                     ->add('save', SubmitType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $initializer->initializeSongEdit($song, $form);

            if ($form->get('save')->isClicked()) {
                return $this->redirectToRoute('song_edit', [
                    'slug' => $song->getSlug()
                ]);
            }

            if ($song->getStatus() == true) {
                return $this->redirectToRoute('song_show',['slug' => $song->getSlug()]);
            } elseif ($song->getStatus() === false) {
                return $this->redirectToRoute('moderation_ready');
            } elseif ($song->getStatus() === null && $song->getAuthor() === $this->user()) {
                return $this->redirectToRoute('moderation_music');
            } else {
                return $this->redirectToRoute('moderation_pending');
            }
        }

        return $this->render('interface/song/song_edit.html.twig', [
            'song' => $song,
            'form' => $form->createView(),
            'person' => $song->getVocalist()
        ]);
    }

    /**
     * @Route("/song/{id}", name="song_delete", methods={"DELETE"})
     * @param Request $request
     * @param Song $song
     * @return Response
     */
    public function songDelete(Request $request, Song $song): Response
    {
        $status = $song->getStatus();
        $author = $song->getAuthor()->getUsername();
        if ($this->isGranted('ROLE_SONG_MODERATOR') && !$song->getStatus() || $this->isGranted('ROLE_OWNER')) {
            if ($this->isCsrfTokenValid('delete'.$song->getId(), $request->request->get('_token'))) {
                $em = $this->getDoctrine()->getManager();
                $em->remove($song);
                $em->flush();
            }
        }

        if ($status === null && $author === $this->user()->getUsername()) {
            return $this->redirectToRoute('moderation_music');
        } elseif ($status === false) {
            return $this->redirectToRoute('moderation_ready');
        } else {
            return $this->redirectToRoute('moderation_pending');
        }
    }

    /**
     * @Route("/playlister/{slug}", name="song_playlister", methods={"POST", "GET"})
     * @param Song $song
     * @param UserRepository $userRepo
     * @param PlaylistSongRepository $playlistSongRepo
     * @return Response
     */
    public function playlister(Song $song, UserRepository $userRepo, PlaylistSongRepository $playlistSongRepo): Response
    {
        $user = $userRepo->findOneBy(['username' => $this->getUser()->getUsername()]);
        $contains = $playlistSongRepo->findOneBy(['user' => $user, 'song' => $song]);
        $em = $this->getDoctrine()->getManager();

        if ($contains) {
            $user->removePlaylistSong($contains);
            $response = ['status' => 'removed', 'title' => $this->trans('add.to.playlist'), 'message' => $this->trans('flash.removed.from.playlist')];
        } else {
            $playlistSong = new PlaylistSong();
            $playlistSong->setUser($user);
            $playlistSong->setSong($song);
            $em->persist($playlistSong);
            $response = ['status' => 'added', 'title' => $this->trans('remove.from.playlist'), 'message' => $this->trans('flash.added.to.playlist')];
        }

        $em->flush();

        return $this->json([
            'response' => $response
        ]);
    }
}
