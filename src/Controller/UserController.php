<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\EmailAddress;
use App\Entity\Music;
use App\Entity\Notification;
use App\Entity\Article;
use App\Entity\User;
use App\Form\ResetPasswordType;
use App\Form\ProfileType;
use App\Repository\EmailAddressRepository;
use App\Repository\NotificationRepository;
use App\Repository\UserRepository;
use App\Service\Constraints;
use App\Service\Mailer;
use App\Service\Paginator;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;
use Vich\UploaderBundle\Handler\UploadHandler;

/**
 * Class UserController
 * @package App\Controller
 * @Route(name="user_")
 */
class UserController extends CustomAbstractController
{
    /**
     * @Route("/user/{username}/{page<\d+>?1}", name="profile")
     * @param User $user
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function profile(User $user, $page, Paginator $paginator): Response
    {
        if ($this->isGranted('IS_AUTHENTICATED_FULLY') && $user === $this->user() || $this->isGranted('ROLE_MODER')) {
            $criteria = ['author' => $user];
        } else {
            $criteria = ['author' => $user, 'status' => true];
        }

        $paginator
            ->setClass(Article::class)
            ->setOrder(['publishedAt' => 'DESC'])
            ->setCriteria($criteria)
            ->setParameters(['username' => $user->getUsername()])
            ->setLimit(10)
            ->setPage($page)
        ;

        return $this->render('user/profile.html.twig', [
            'invitees' => $this->getDoctrine()->getRepository(User::class)->count(['invitedBy' => $user, 'status' => true]),
            'articles' => $paginator->getData(),
            'paginator' => $paginator,
            'profile' => $user->getProfile(),
            'user' => $user,
        ]);
    }

    /**
     * @Route("/edit", name="edit")
     * @param Request $request
     * @param UserRepository $repo
     * @param UploadHandler $handler
     * @return Response
     */
    public function edit(Request $request, UserRepository $repo, UploadHandler $handler): Response
    {
        $user = $repo->findOneBy(['username' => $this->getUser()->getUsername()]);
        $form = $this->createForm(ProfileType::class, $user->getProfile());
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            if ($form->get('avatarDelete')->getData() == true) {
                $handler->remove($user->getProfile(),'avatarFile');
                $user->getProfile()->setAvatar('avatar.jpg');
            }

            if ($user->getProfile()->getBirthday() && $user->getConfirmedEmail()) {
                if ($user->getProfile()->getBirthday() !== $this->getDoctrine()->getRepository(EmailAddress::class)->findOneBy(['address' => $user->getConfirmedEmail()])->getBirthday()) {
                    $this->getDoctrine()->getRepository(EmailAddress::class)->findOneBy(['address' => $user->getConfirmedEmail()])->setBirthday($user->getProfile()->getBirthday());
                }
            }

            $this->getDoctrine()->getManager()->flush();
            $this->addFlash('success', $this->trans('profile.changes.saved'));
            return $this->redirectToRoute('user_profile', ['username' => $user->getUsername()]);
        }

        return $this->render('user/edit.html.twig', [
            'user' => $user,
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/settings", name="settings", methods={"GET","POST"})
     * @param Request $request
     * @param UserRepository $repo
     * @param Constraints $constraints
     * @param Mailer $mailer
     * @param TokenGeneratorInterface $tokenGenerator
     * @return Response
     */
    public function settings(Request $request, UserRepository $repo, Constraints $constraints, Mailer $mailer, TokenGeneratorInterface $tokenGenerator): Response
    {
        $user = $repo->findOneBy(['username' => $this->getUser()->getUsername()]);
        $form = $this->createFormBuilder($user)
            ->add('username', TextType::class, [
                'label' => $this->trans('form.username'),
                'attr' => ['value' => $user->getUsername()],
                'mapped' => false
            ])
            ->add('email', EmailType::class, [
                'label' => $this->trans('form.email'),
                'help' => 'Если не подтверждена, то проверьте свою электронную почту и перейдите по отправленной ссылке'
            ])
            ->getForm();

        if ($user->getEmail() != $user->getConfirmedEmail()) {
            $form->get('email')->addError(new FormError('Электронная почта не подтверждена'));
        }

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $verification = $constraints->username($form->get('username')->getData());

            if ($verification['status'] == true) {
                if ($user->getEmail() != $user->getConfirmedEmail()) {
                    $user->setToken($tokenGenerator->generateToken());
                    $mailer->setTo($form->get('email')->getData())
                        ->setSubject($this->trans('Подтверждение почты на сайте ShovdanYist'))
                        ->setTemplate('layouts/mailer/email_confirmation.html.twig')
                        ->setVariables(['user' => $user])
                        ->notify();

                    if ($user->getConfirmedEmail() && $user->getStatus() !== false) {
                        $user->setStatus(null);
                    }
                } elseif ($user->getEmail() == $user->getConfirmedEmail() && $user->getStatus() === null) {
                    $user->setStatus(true);
                }

                $user->setUsername($form->get('username')->getData());
                $em = $this->getDoctrine()->getManager();
                $em->flush();

                return $this->redirectToRoute('user_profile', ['username' => $form->get('username')->getData()]);
            } else {
                $form->get('username')->addError(new FormError($verification['message']));
            }
        }

        return $this->render('user/settings.html.twig', [
            'user' => $user,
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/reset", name="reset", methods={"GET", "POST"})
     * @param Request $request
     * @param UserRepository $repo
     * @param UserPasswordEncoderInterface $encoder
     * @return Response
     */
    public function reset(Request $request, UserRepository $repo, UserPasswordEncoderInterface $encoder): Response
    {
        $user = $repo->findOneBy(['username' => $this->getUser()->getUsername()]);
        $form = $this->createForm(ResetPasswordType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            if ($encoder->isPasswordValid($user,$form->get('current')->getData())) {
                $user->setPassword($encoder->encodePassword($user, $form->get('new')->getData()));

                $em = $this->getDoctrine()->getManager();
                $em->persist($user);
                $em->flush();

                $this->addFlash('success', $this->trans('flash.password.changed'));

                return $this->redirectToRoute('user_profile', ['username' => $user->getUsername()]);
            } else {
                $form->get('current')->addError(new FormError($this->trans('current.password.incorrect')));
            }
        }

        return $this->render('user/reset.html.twig', [
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/notifications/{page<\d+>?1}", name="notifications")
     * @param $page
     * @param NotificationRepository $notifyRepo
     * @param UserRepository $userRepo
     * @param Paginator $paginator
     * @return Response
     */
    public function notifications($page, NotificationRepository $notifyRepo, UserRepository $userRepo, Paginator $paginator): Response
    {
        $user = $userRepo->findOneBy(['username' => $this->getUser()->getUsername()]);

        if ($notifyRepo->count(['receiver' => $user]) > 100) {
            $notifications = $notifyRepo->findBy(['receiver' => $user], ['id' => 'DESC'], null, 100);
            foreach ($notifications as $notification) {
                $user->removeNotification($notification);
            }
            $this->getDoctrine()->getManager()->flush();
        }

        foreach ($notifyRepo->findBy(['receiver' => $user]) as $notification) {
            $notification->setSeen(true);
        }

        $this->getDoctrine()->getManager()->flush();

        $paginator
            ->setClass(Notification::class)
            ->setType('notification')
            ->setOrder(['publishedAt' => 'DESC'])
            ->setCriteria(['receiver' => $user, 'status' => true])
            ->setLimit(10)
            ->setPage($page);

        return $this->render('user/notifications.html.twig', [
            'notifications' => $paginator->getData(),
            'paginator' => $paginator
        ]);
    }

    /**
     * @Route("/user/{username}/playlist/{page<\d+>?1}", name="playlist")
     * @param User $user
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function playlist(User $user, $page, Paginator $paginator): Response
    {
        $paginator
            ->setParameters(['username' => $user->getUsername()])
            ->setMethod('findUserPlaylist')
            ->setOrder(['addedAt' => 'DESC'])
            ->setCriteria(['user' => $user])
            ->setClass(Music::class)
            ->setType('playlist')
            ->setLimit(20)
            ->setPage($page);

        return $this->render('user/playlist.html.twig', [
            'playlist' => $paginator->getData(),
            'paginator' => $paginator,
            'user' => $user
        ]);
    }

    /**
     * @Route("/bookmarks/{page<\d+>?1}", name="bookmarks")
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function bookmarks($page, Paginator $paginator): Response
    {
        $user = $this->getDoctrine()->getRepository(User::class)->findOneBy(['username' => $this->getUser()->getUsername()]);

        $paginator
            ->setMethod('findUserBookmarks')
            ->setOrder(['addedAt' => 'DESC'])
            ->setCriteria(['user' => $user])
            ->setClass(Article::class)
            ->setType('bookmark')
            ->setLimit(10)
            ->setPage($page)
        ;

        return $this->render('user/bookmarks.html.twig', [
            'articles' => $paginator->getData(),
            'paginator' => $paginator
        ]);
    }

    /**
     * @Route("/blockingUser/{id}", name="blocking_user", methods={"GET","POST"})
     * @param User $user
     * @param EmailAddressRepository $emails
     * @return Response
     */
    public function blocking(User $user, EmailAddressRepository $emails): Response
    {
        $email = $emails->findOneBy(['address' => $user->getConfirmedEmail()]);
        $email->setStatus(false);
        $user->setStatus(false);
        $em = $this->getDoctrine()->getManager();
        $em->flush();

        $this->addFlash('danger', 'Пользователь '. $user->getUsername() . ' заблокирован');

        return $this->redirectToRoute('user_profile', [
            'username' => $user->getUsername()
        ]);
    }

    /**
     * @Route("/unblockingUser/{id}", name="unblocking_user", methods={"GET","POST"})
     * @param User $user
     * @param EmailAddressRepository $emails
     * @return Response
     */
    public function unblocking(User $user, EmailAddressRepository $emails): Response
    {
        $email = $emails->findOneBy(['address' => $user->getConfirmedEmail()]);
        $email->setStatus(true);
        $user->setStatus(true);
        $em = $this->getDoctrine()->getManager();
        $em->flush();

        $this->addFlash('success', 'Пользователь '. $user->getUsername() . ' разблоктрован');

        return $this->redirectToRoute('user_profile', [
            'username' => $user->getUsername()
        ]);
    }

    /**
     * @Route("/deleteAccount", name="delete_account", methods={"GET","POST"})
     * @return Response
     */
    public function deleteAccount(): Response
    {
        return $this->render('user/delete_account.html.twig');
    }

    /**
     * @Route("/userDelete/{id}", name="delete", methods={"DELETE"})
     * @param Request $request
     * @param UserPasswordEncoderInterface $encoder
     * @param User $user
     * @return Response
     */
    public function delete(Request $request, UserPasswordEncoderInterface $encoder, User $user): Response
    {
        if ($user === $this->user() && $this->isCsrfTokenValid('delete'.$user->getId(), $request->request->get('_token')) && $encoder->isPasswordValid($user, $request->request->get('password'))) {
            $session = new Session();
            $session->invalidate();

            $em = $this->getDoctrine()->getManager();
            $em->remove($user);
            $em->flush();

            return $this->render('@Twig/Exception/user_deleted.html.twig');
        }

        $this->addFlash('danger', $this->trans('flash.password.is.wrong'));
        return $this->redirectToRoute('user_delete_account');
    }
}
