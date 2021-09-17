<?php

namespace App\Controller\Dashboard;

use App\Entity\Song;
use App\Entity\Person;
use App\Form\SongType;
use App\Repository\SongRepository;
use App\Repository\UserRepository;
use App\Service\Initializer;
use App\Service\Paginator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/dashboard/song", name="dash_song_")
 */
class DashSongController extends AbstractController
{
    /**
     * @Route("/{page<\d+>?1}", name="index", methods={"GET"})
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function index($page, Paginator $paginator): Response
    {
        $paginator->setClass(Song::class)->setLimit(10)
            ->setPage($page)->setOrder(['publicationDate' => 'DESC']);

        return $this->render('dashboard/song/index.html.twig', [
            'songs' => $paginator->getData(),
            'paginator' => $paginator,
            'type' => 'index'
        ]);
    }

    /**
     * @Route("/featureds/{page<\d+>?1}", name="featureds", methods={"GET"})
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function featureds($page, Paginator $paginator): Response
    {
        $paginator->setClass(Song::class)->setLimit(10)
            ->setPage($page)->setCriteria(['featured' => true])->setOrder(['publicationDate' => 'DESC']);

        return $this->render('dashboard/song/index.html.twig', [
            'songs' => $paginator->getData(),
            'paginator' => $paginator,
            'type' => 'featureds'
        ]);
    }

    /**
     * @Route("/moderation/{page<\d+>?1}", name="moderation", methods={"GET"})
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function moderation($page, Paginator $paginator): Response
    {
        $paginator->setClass(Song::class)->setLimit(10)
            ->setPage($page)->setCriteria(['status' => false]);

        return $this->render('dashboard/song/moderation.html.twig', [
            'songs' => $paginator->getData(),
            'paginator' => $paginator
        ]);
    }

    /**
     * @Route("/vocalist/{slug}", name="vocalist", methods={"GET"})
     * @param Person $person
     * @param SongRepository $songRepo
     * @return Response
     */
    public function vocalist(Person $person, SongRepository $songRepo): Response
    {
        return $this->render('dashboard/song/vocalist.html.twig', [
            'person' => $person
        ]);
    }

    /**
     * @Route("/new/{person}", name="new", methods={"GET","POST"})
     * @param Request $request
     * @param Initializer $initializer
     * @param null $person
     * @return Response
     */
    public function new(Request $request, Initializer $initializer, $person = null): Response
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
            $initializer->initializeSongNew($song);

            if ($form->get('save')->isClicked()) {
                return $this->redirectToRoute('dash_song_edit', [
                    'id' => $song->getId()
                ]);
            } elseif ($form->get('saveAndNew')->isClicked()) {
                $person = $song->getVocalist()->getId();
                return $this->redirectToRoute('dash_song_new', [
                    'person' => $person
                ]);
            }

            return $this->redirectToRoute('dash_song_index');
        }

        return $this->render('dashboard/song/new.html.twig', [
            'song' => $song,
            'form' => $form->createView(),
            'person' => $person
        ]);
    }

    /**
     * @Route("/{id}/edit", name="edit", methods={"GET","POST"})
     * @param Request $request
     * @param Song $song
     * @param Initializer $initializer
     * @return Response
     */
    public function edit(Request $request, Song $song, Initializer $initializer): Response
    {
        $form = $this->createForm(SongType::class, $song)
            ->add('save', SubmitType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $initializer->initializeSongEdit($song);

            if ($form->get('save')->isClicked()) {
                return $this->redirectToRoute('dash_song_edit', [
                    'id' => $song->getId()
                ]);
            }

            return $this->redirectToRoute('dash_song_index');
        }

        return $this->render('dashboard/song/edit.html.twig', [
            'song' => $song,
            'form' => $form->createView(),
            'person' => $song->getVocalist()
        ]);
    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"})
     * @param Request $request
     * @param Song $song
     * @return Response
     */
    public function delete(Request $request, Song $song): Response
    {
        if ($this->isCsrfTokenValid('delete'.$song->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($song);
            $em->flush();
        }

        return $this->redirectToRoute('dash_song_index');
    }
}
