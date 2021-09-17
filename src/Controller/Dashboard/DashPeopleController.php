<?php

namespace App\Controller\Dashboard;

use App\Entity\Person;
use App\Form\PeopleType;
use App\Repository\PeopleRepository;
use App\Service\Initializer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/dashboard/people", name="dash_people_")
 */
class DashPeopleController extends AbstractController
{
    /**
     * @Route("/", name="index", methods={"GET"})
     * @param PeopleRepository $peopleRepository
     * @return Response
     */
    public function index(PeopleRepository $peopleRepository): Response
    {
        return $this->render('dashboard/people/index.html.twig', [
            'people' => $peopleRepository->findBy([],['firstName' => 'ASC']),
        ]);
    }

    /**
     * @Route("/new", name="new", methods={"GET","POST"})
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
            $initializer->initializeVocalistNew($person);

            return $this->redirectToRoute('dash_people_index');
        }

        return $this->render('dashboard/people/new.html.twig', [
            'person' => $person,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}/edit", name="edit", methods={"GET","POST"})
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
            $initializer->initializeVocalistEdit($person);

            return $this->redirectToRoute('dash_people_index');
        }

        return $this->render('dashboard/people/edit.html.twig', [
            'person' => $person,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"})
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

        return $this->redirectToRoute('dash_people_index');
    }
}
