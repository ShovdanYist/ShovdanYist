<?php

namespace App\Controller\Dashboard;

use App\Entity\Song;
use App\Entity\People;
use App\Form\SongType;
use App\Repository\SongRepository;
use App\Repository\UserRepository;
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
     * @param People $person
     * @param SongRepository $songRepo
     * @return Response
     */
    public function vocalist(People $person, SongRepository $songRepo)
    {
        return $this->render('dashboard/song/vocalist.html.twig', [
            'person' => $person
        ]);
    }

    /**
     * @Route("/new/{person}", name="new", methods={"GET","POST"})
     * @param Request $request
     * @param UserRepository $repo
     * @param null $person
     * @return Response
     */
    public function new(Request $request, UserRepository $repo, $person = null): Response
    {
        $song = new Song();

        if ($person) {
            $person = $this->getDoctrine()->getRepository(People::class)->findOneBy(['id' => $person]);
            $song->setArtist($person);
        }

        $form = $this->createForm(SongType::class, $song)
            ->add('save', SubmitType::class)
            ->add('saveAndNew', SubmitType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $user = $repo->findOneBy(['username' => $this->getUser()->getUsername()]);
            $song->setAuthor($user);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($song);
            $entityManager->flush();

            if ($form->get('save')->isClicked()) {
                return $this->redirectToRoute('dash_song_edit', [
                    'id' => $song->getId()
                ]);
            } elseif ($form->get('saveAndNew')->isClicked()) {
                $person = $song->getArtist()->getId();
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
     * @return Response
     */
    public function edit(Request $request, Song $song): Response
    {
        $form = $this->createForm(SongType::class, $song)
            ->add('save', SubmitType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $this->getDoctrine()->getManager()->flush();

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
            'person' => $song->getArtist()
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
            // Delete each comments of song and each notification of each comments when you delete a song (song)
            foreach ($song->getComments() as $comment) {
                $em->remove($comment);
                foreach ($comment->getNotifications() as $notification) {
                    $em->remove($notification);
                }
            }
            $em->remove($song);
            $em->flush();
        }

        return $this->redirectToRoute('dash_song_index');
    }
}
