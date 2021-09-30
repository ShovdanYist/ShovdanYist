<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\Person;
use App\Form\PeopleType;
use App\Repository\PeopleRepository;
use App\Repository\SongRepository;
use App\Service\Initializer;
use App\Twig\SongExtension;
use Doctrine\ORM\NoResultException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PersonController extends CustomAbstractController
{
    /**
     * @Route("/people/{letter}", name="people_by_letter", methods={"GET"})
     * @param $letter
     * @param PeopleRepository $personRepo
     * @param SongExtension $extension
     * @return Response
     */
    public function people($letter, PeopleRepository $personRepo, SongExtension $extension): Response
    {
        if (!key_exists($letter,$extension->letters())) {
            return $this->redirectToRoute('song_index');
        }

        if ($this->isGranted('ROLE_PEOPLE_MODERATOR')) {
            $people = $personRepo->findPeopleByLetter($extension->letters()[$letter]);
        } else {
            $people = $personRepo->findPeopleByLetter($extension->letters()[$letter],true);
        }

        return $this->render('interface/person/people.html.twig', [
            'people' => $people,
            'letter' => $extension->letters()[$letter]
        ]);
    }

    /**
     * @Route("/person/new", name="person_new", methods={"GET","POST"})
     * @Security("has_role('ROLE_PEOPLE_MODERATOR')")
     * @param Request $request
     * @param Initializer $initializer
     * @return Response
     */
    public function new(Request $request, Initializer $initializer): Response
    {
        $person = new Person();
        $form = $this->createForm(PeopleType::class, $person);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $initializer->initializePersonNew($person);

            return $this->redirectToRoute('person_show', [
                'slug' => $person->getSlug()
            ]);
        }

        return $this->render('interface/person/new.html.twig', [
            'person' => $person,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/person/{slug}", name="person_show", methods={"GET"})
     * @param $slug
     * @param SongRepository $songRepo
     * @param PeopleRepository $people
     * @return Response
     */
    public function show($slug, SongRepository $songRepo, PeopleRepository $people): Response
    {
        if (!$this->isGranted("ROLE_PEOPLE_MODERATOR")) {
            try {
                $person = $people->findActiveSongsPerson($slug);
            }
            catch (NoResultException $e) {
                return $this->redirectToRoute('song_index');
            }
        } else {
            $person = $this->getDoctrine()->getRepository(Person::class)->findOneBy(['slug' => $slug]);
        }

        $songs = $songRepo->findBy(['vocalist' => $person, 'status' => true], ['releaseDate' => 'DESC']);

        return $this->render('interface/person/person.html.twig', [
            'person' => $person,
            'songs' => $songs
        ]);
    }

    /**
     * @Route("/person/{slug}/edit", name="person_edit", methods={"GET","POST"})
     * @Security("has_role('ROLE_PEOPLE_EDITOR')")
     * @param Request $request
     * @param Person $person
     * @param Initializer $initializer
     * @return Response
     */
    public function edit(Request $request, Person $person, Initializer $initializer): Response
    {
        $form = $this->createForm(PeopleType::class, $person);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $initializer->initializePersonEdit($person);

            return $this->redirectToRoute('person_show', ['slug' => $person->getSlug()]);
        }

        return $this->render('interface/person/edit.html.twig', [
            'person' => $person,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="person_delete", methods={"DELETE"})
     * @Security("has_role('ROLE_OWNER')")
     * @param Request $request
     * @param Person $person
     * @return Response
     */
    public function delete(Request $request, Person $person): Response
    {
        if ($this->isCsrfTokenValid('delete'.$person->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($person);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_home');
    }
}
