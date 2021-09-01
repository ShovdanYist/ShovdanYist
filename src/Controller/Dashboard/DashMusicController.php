<?php

namespace App\Controller\Dashboard;

use App\Entity\Music;
use App\Entity\People;
use App\Form\MusicType;
use App\Repository\MusicRepository;
use App\Repository\UserRepository;
use App\Service\Paginator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/dashboard/music", name="dash_music_")
 */
class DashMusicController extends AbstractController
{
    /**
     * @Route("/{page<\d+>?1}", name="index", methods={"GET"})
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function index($page, Paginator $paginator): Response
    {
        $paginator->setClass(Music::class)->setLimit(10)
            ->setPage($page)->setOrder(['publicationDate' => 'DESC']);

        return $this->render('dashboard/music/index.html.twig', [
            'musics' => $paginator->getData(),
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
        $paginator->setClass(Music::class)->setLimit(10)
            ->setPage($page)->setCriteria(['featured' => true])->setOrder(['publicationDate' => 'DESC']);

        return $this->render('dashboard/music/index.html.twig', [
            'musics' => $paginator->getData(),
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
        $paginator->setClass(Music::class)->setLimit(10)
            ->setPage($page)->setCriteria(['status' => false]);

        return $this->render('dashboard/music/moderation.html.twig', [
            'musics' => $paginator->getData(),
            'paginator' => $paginator
        ]);
    }

    /**
     * @Route("/vocalist/{slug}", name="vocalist", methods={"GET"})
     * @param People $person
     * @param MusicRepository $musicRepo
     * @return Response
     */
    public function vocalist(People $person, MusicRepository $musicRepo)
    {
        return $this->render('dashboard/music/vocalist.html.twig', [
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
        $music = new Music();

        if ($person) {
            $person = $this->getDoctrine()->getRepository(People::class)->findOneBy(['id' => $person]);
            $music->setArtist($person);
        }

        $form = $this->createForm(MusicType::class, $music)
            ->add('save', SubmitType::class)
            ->add('saveAndNew', SubmitType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $user = $repo->findOneBy(['username' => $this->getUser()->getUsername()]);
            $music->setAuthor($user);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($music);
            $entityManager->flush();

            if ($form->get('save')->isClicked()) {
                return $this->redirectToRoute('dash_music_edit', [
                    'id' => $music->getId()
                ]);
            } elseif ($form->get('saveAndNew')->isClicked()) {
                $person = $music->getArtist()->getId();
                return $this->redirectToRoute('dash_music_new', [
                    'person' => $person
                ]);
            }

            return $this->redirectToRoute('dash_music_index');
        }

        return $this->render('dashboard/music/new.html.twig', [
            'music' => $music,
            'form' => $form->createView(),
            'person' => $person
        ]);
    }

    /**
     * @Route("/{id}/edit", name="edit", methods={"GET","POST"})
     * @param Request $request
     * @param Music $music
     * @return Response
     */
    public function edit(Request $request, Music $music): Response
    {
        $form = $this->createForm(MusicType::class, $music)
            ->add('save', SubmitType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $this->getDoctrine()->getManager()->flush();

            if ($form->get('save')->isClicked()) {
                return $this->redirectToRoute('dash_music_edit', [
                    'id' => $music->getId()
                ]);
            }

            return $this->redirectToRoute('dash_music_index');
        }

        return $this->render('dashboard/music/edit.html.twig', [
            'music' => $music,
            'form' => $form->createView(),
            'person' => $music->getArtist()
        ]);
    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"})
     * @param Request $request
     * @param Music $music
     * @return Response
     */
    public function delete(Request $request, Music $music): Response
    {
        if ($this->isCsrfTokenValid('delete'.$music->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            // Delete each comments of music and each notification of each comments when you delete a song (music)
            foreach ($music->getComments() as $comment) {
                $em->remove($comment);
                foreach ($comment->getNotifications() as $notification) {
                    $em->remove($notification);
                }
            }
            $em->remove($music);
            $em->flush();
        }

        return $this->redirectToRoute('dash_music_index');
    }
}
