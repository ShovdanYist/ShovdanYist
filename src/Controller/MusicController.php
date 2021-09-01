<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\Music;
use App\Entity\People;
use App\Entity\Tag;
use App\Entity\UserMusic;
use App\Form\MusicType;
use App\Form\PeopleType;
use App\Repository\MusicRepository;
use App\Repository\PeopleRepository;
use App\Repository\UserMusicRepository;
use App\Repository\UserRepository;
use App\Service\Paginator;
use App\Twig\MusicExtension;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NoResultException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MusicController extends CustomAbstractController
{
    /**
     * @Route("/music", name="music_index", methods={"GET"})
     * @return Response
     */
    public function index(): Response
    {
        return $this->render('music/index.html.twig');
    }

    /**
     * @Route("/music/tag/{slug}/{page<\d+>?1}", name="tag_show", methods={"GET"})
     * @param Tag $tag
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function tag(Tag $tag, $page, Paginator $paginator): Response
    {
        if ($tag->getType() !== 'music') {
            throw $this->createNotFoundException();
        }

        $paginator
            ->setParameters(['slug' => $tag->getSlug()])
            ->setCriteria(['tag' => $tag])
            ->setMethod('findByTag')
            ->setOrder(['title' => 'DESC'])
            ->setClass(Music::class)
            ->setType('tag')
            ->setLimit(20)
            ->setPage($page);

        ($page > 1) ? $page = ' | Страница ' . $page : $page = '';

        $info = [
            'title' => $tag->getTitle() . ' | Чеченские песни с тегом «' . mb_strtolower($tag->getTitle()) . '»' . $page,
            'h1' => 'Песни с тегом «' . mb_strtolower($tag->getTitle()) . '»',
            'description' => 'Чеченские песни жанра «' . mb_strtolower($tag->getTitle()) . '»'
        ];

        return $this->render('music/chart.html.twig', [
            'songs' => $paginator->getData(),
            'paginator' => $paginator,
            'info' => $info
        ]);
    }

    /**
     * @Route("/chart/{chart}/{page<\d+>?1}", name="music_chart", methods={"GET"})
     * @param $chart
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function chart($chart, $page, Paginator $paginator): Response
    {
        $paginator->setClass(Music::class)->setParameters(['chart' => $chart])->setLimit(20)->setPage($page);

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

        return $this->render('music/chart.html.twig', [
            'songs' => $paginator->getData(),
            'paginator' => $paginator,
            'info' => $info
        ]);
    }

    /**
     * @Route("/song/{slug}/{page<\d+>?1}", name="music_song", methods={"GET", "POST"})
     * @param Music $music
     * @param $page
     * @param EntityManagerInterface $manager
     * @return Response
     */
    public function song(Music $music, $page, EntityManagerInterface $manager): Response
    {
        if ($music->getStatus() != true) {throw $this->createNotFoundException();}

        $music->setViews($music->getViews()+1);
        $manager->persist($music);
        $manager->flush();

        return $this->render('music/song.html.twig', [
            'song' => $music,
            'page' => $page
        ]);
    }

    /**
     * @Route("/song/{slug}/edit", name="song_edit", methods={"GET","POST"})
     * @Security("has_role('ROLE_SONG_EDITOR')")
     * @param Request $request
     * @param Music $music
     * @return Response
     */
    public function songEdit(Request $request, Music $music)
    {
        $form = $this->createForm(MusicType::class, $music)
            ->add('save', SubmitType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $this->getDoctrine()->getManager()->flush();

            if ($form->get('save')->isClicked()) {
                return $this->redirectToRoute('song_edit', [
                    'slug' => $music->getSlug()
                ]);
            }

            return $this->redirectToRoute('music_song',['slug' => $music->getSlug()]);
        }

        return $this->render('music/song_edit.html.twig', [
            'music' => $music,
            'form' => $form->createView(),
            'person' => $music->getArtist()
        ]);
    }

    /**
     * @Route("/playlister/{slug}", name="music_playlister", methods={"POST", "GET"})
     * @param Music $music
     * @param UserRepository $userRepo
     * @param UserMusicRepository $userMusicRepo
     * @return Response
     */
    public function playlister(Music $music, UserRepository $userRepo, UserMusicRepository $userMusicRepo): Response
    {
        $user = $userRepo->findOneBy(['username' => $this->getUser()->getUsername()]);
        $contains = $userMusicRepo->findOneBy(['user' => $user, 'music' => $music]);
        $em = $this->getDoctrine()->getManager();

        if ($contains) {
            $user->removeUserMusic($contains);
            $response = ['status' => 'removed', 'title' => $this->trans('add.to.playlist'), 'message' => $this->trans('flash.removed.from.playlist')];
        } else {
            $userMusic = new UserMusic();
            $userMusic->setUser($user);
            $userMusic->setMusic($music);
            $em->persist($userMusic);
            $response = ['status' => 'added', 'title' => $this->trans('remove.from.playlist'), 'message' => $this->trans('flash.added.to.playlist')];
        }

        $em->flush();

        return $this->json([
            'response' => $response
        ]);
    }

    /**
     * @Route("/vocalist/{slug}", name="music_vocalist", methods={"GET"})
     * @param $slug
     * @param MusicRepository $musicRepo
     * @param PeopleRepository $people
     * @return Response
     */
    public function vocalist($slug, MusicRepository $musicRepo, PeopleRepository $people): Response
    {
        try {
            $vocalist = $people->findOneActiveVocalist($slug);
        }
        catch (NoResultException $e) {
            throw $this->createNotFoundException();
        }

        $songs = $musicRepo->findBy(['artist' => $vocalist, 'status' => true], ['releaseDate' => 'DESC']);

        return $this->render('music/vocalist.html.twig', [
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

            return $this->redirectToRoute('music_vocalist', ['slug' => $person->getSlug()]);
        }

        return $this->render('music/vocalist_edit.html.twig', [
            'person' => $person,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/vocalists/{letter}", name="music_vocalists", methods={"GET"})
     * @param $letter
     * @param PeopleRepository $people
     * @param MusicExtension $extension
     * @return Response
     */
    public function vocalists($letter, PeopleRepository $people, MusicExtension $extension): Response
    {
        if (!key_exists($letter,$extension->letters())) {
            throw $this->createNotFoundException();
        }

        return $this->render('music/vocalists.html.twig', [
            'vocalists' => $people->findVocalistByLetter($extension->letters()[$letter]),
            'letter' => $extension->letters()[$letter]
        ]);
    }
}
