<?php

namespace App\Controller\Dashboard;

use App\Entity\Profile;
use App\Entity\User;
use App\Form\NewUserType;
use App\Form\ProfileType;
use App\Form\UserType;
use App\Repository\CommentRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Vich\UploaderBundle\Handler\UploadHandler;

/**
 * @Route("/dashboard/users", name="dash_user_")
 */
class DashUserController extends AbstractController
{
    /**
     * @Route("/", name="index", methods={"GET"})
     * @param UserRepository $userRepository
     * @return Response
     */
    public function index(UserRepository $userRepository): Response
    {
        return $this->render('dashboard/user/index.html.twig', [
            'users' => $userRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="new", methods={"GET","POST"})
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @return Response
     */
    public function new(Request $request, UserPasswordEncoderInterface $passwordEncoder): Response
    {
        $user = new User();
        $form = $this->createForm(NewUserType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $user->setPassword(
                $passwordEncoder->encodePassword(
                    $user,
                    $form->get('password')->getData()
                )
            );

            $profile = new Profile();
            $user->setProfile($profile);
            $user->setRoles(["ROLE_USER"]);
            $user->getProfile()->setGender(0);
            $user->getProfile()->setAvatar('avatar.jpg');

            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            $this->addFlash('success', 'Регистрация успешно завершена');

            return $this->redirectToRoute('dash_user_index');
        }

        return $this->render('dashboard/user/new.html.twig', [
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}/editProfile", name="edit_profile", methods={"GET","POST"})
     * @param Request $request
     * @param User $user
     * @param UploadHandler $handler
     * @return Response
     */
    public function editProfile(Request $request, User $user, UploadHandler $handler): Response
    {
        $profile = $user->getProfile();
        $form = $this   ->createForm(ProfileType::class, $profile)
                            ->add('verified', CheckboxType::class, [
                                'label' => 'verified',
                                'required' => false,
                                'label_attr' => ['class' => 'switch-custom']
                            ]);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            if ($form->get('avatarDelete')->getData() == true) {
                $handler->remove($user->getProfile(),'avatarFile');
                $user->getProfile()->setAvatar('avatar.jpg');
            }
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('dash_user_index');
        }

        return $this->render('dashboard/user/edit_profile.html.twig', [
            'profile' => $profile,
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}/editPrivacy", name="edit_privacy", methods={"GET","POST"})
     * @param Request $request
     * @param User $user
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @return Response
     */
    public function editPrivacy(Request $request, User $user, UserPasswordEncoderInterface $passwordEncoder): Response
    {
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            if (isset($form->get('roles')->getData()[1]) && $form->get('roles')->getData()[1] == 'ROLE_USER') {
                $user->setRoles(['ROLE_USER']);
            }

            if ($form->get('password')->getData() ==! null) {
                $user->setPassword(
                    $passwordEncoder->encodePassword(
                        $user,
                        $form->get('password')->getData()
                    )
                );
            }

            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            return $this->redirectToRoute('dash_user_index');
        }

        return $this->render('dashboard/user/edit_privacy.html.twig', [
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}/delete", name="delete", methods={"DELETE"})
     * @param Request $request
     * @param User $user
     * @return Response
     */
    public function delete(Request $request, User $user): Response
    {
        if ($this->isCsrfTokenValid('delete'.$user->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($user);
            $em->flush();
        }

        return $this->redirectToRoute('dash_user_index');
    }
}
