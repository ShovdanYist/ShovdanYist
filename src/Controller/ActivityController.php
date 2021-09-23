<?php

namespace App\Controller;

use App\Entity\Activity;
use App\Form\ActivityType;
use App\Repository\ActivityRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ActivityController extends AbstractController
{
    /**
     * @Route("/activities", name="activities_index", methods={"GET"})
     * @Security("has_role('ROLE_OWNER')")
     * @param ActivityRepository $activityRepository
     * @return Response
     */
    public function index(ActivityRepository $activityRepository): Response
    {
        return $this->render('interface/activity/index.html.twig', [
            'activities' => $activityRepository->findAll(),
        ]);
    }

    /**
     * @Route("/activity/new", name="activity_new", methods={"GET","POST"})
     * @Security("has_role('ROLE_OWNER')")
     * @param Request $request
     * @return Response
     */
    public function new(Request $request): Response
    {
        $activity = new Activity();
        $form = $this->createForm(ActivityType::class, $activity);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($activity);
            $entityManager->flush();

            return $this->redirectToRoute('activities_index');
        }

        return $this->render('interface/activity/new.html.twig', [
            'activity' => $activity,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/activity/{id}/edit", name="activity_edit", methods={"GET","POST"})
     * @Security("has_role('ROLE_OWNER')")
     * @param Request $request
     * @param Activity $activity
     * @return Response
     */
    public function edit(Request $request, Activity $activity): Response
    {
        $form = $this->createForm(ActivityType::class, $activity);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('activities_index');
        }

        return $this->render('interface/activity/edit.html.twig', [
            'activity' => $activity,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/activity/{id}", name="activity_delete", methods={"DELETE"})
     * @Security("has_role('ROLE_OWNER')")
     * @param Request $request
     * @param Activity $activity
     * @return Response
     */
    public function delete(Request $request, Activity $activity): Response
    {
        if ($this->isCsrfTokenValid('delete'.$activity->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($activity);
            $entityManager->flush();
        }

        return $this->redirectToRoute('activities_index');
    }
}
