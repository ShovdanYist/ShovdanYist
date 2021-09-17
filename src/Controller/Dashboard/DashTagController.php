<?php

namespace App\Controller\Dashboard;

use App\Entity\Tag;
use App\Form\TagType;
use App\Repository\TagRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/dashboard", name="dash_tag_")
 */
class DashTagController extends AbstractController
{
    /**
     * @Route("/tags", name="index", methods={"GET"})
     * @param TagRepository $tagRepository
     * @return Response
     */
    public function index(TagRepository $tagRepository): Response
    {
        return $this->render('dashboard/tag/index.html.twig', [
            'tags' => $tagRepository->findBy([],['title' => 'ASC']),
        ]);
    }

    /**
     * @Route("/tag/new", name="new", methods={"GET","POST"})
     * @param Request $request
     * @return Response
     */
    public function new(Request $request): Response
    {
        $tag = new Tag();
        $form = $this->createForm(TagType::class, $tag);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $tag->setUpdatedAt(new \DateTime('now'));
            $em = $this->getDoctrine()->getManager();
            $em->persist($tag);
            $em->flush();

            return $this->redirectToRoute('dash_tag_index');
        }

        return $this->render('dashboard/tag/new.html.twig', [
            'tag' => $tag,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/tag/{id}/edit", name="edit", methods={"GET","POST"})
     * @param Request $request
     * @param Tag $tag
     * @return Response
     */
    public function edit(Request $request, Tag $tag): Response
    {
        $form = $this->createForm(TagType::class, $tag);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('dash_tag_index');
        }

        return $this->render('dashboard/tag/edit.html.twig', [
            'tag' => $tag,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/tag/{id}", name="delete", methods={"DELETE"})
     * @param Request $request
     * @param Tag $tag
     * @return Response
     */
    public function delete(Request $request, Tag $tag): Response
    {
        if ($this->isCsrfTokenValid('delete'.$tag->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($tag);
            $em->flush();
        }

        return $this->redirectToRoute('dash_tag_index');
    }
}
