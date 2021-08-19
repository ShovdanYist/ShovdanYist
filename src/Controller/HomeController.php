<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\EmailAddress;
use App\Entity\Post;
use App\Entity\Profile;
use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Form\NewPasswordType;
use App\Security\UserAuthenticator;
use App\Service\Mailer;
use App\Service\Paginator;
use App\Validator\Constraints\MailExists;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;
use Symfony\Component\Security\Guard\GuardAuthenticatorHandler;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * @Route(name="app_")
 */
class HomeController extends CustomAbstractController
{
    /**
     * @Route("/{page<\d+>?1}", name="home", methods={"GET"})
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function index($page, Paginator $paginator): Response
    {
        $paginator
            ->setClass(Post::class)
            ->setOrder(['publishedAt' => 'DESC'])
            ->setCriteria(['status' => true, 'moderation' => true])
            ->setLimit(10)
            ->setPage($page)
        ;

        return $this->render('home/index.html.twig', [
            'posts' => $paginator->getData(),
            'paginator' => $paginator
        ]);
    }

    /**
     * @Route("/terms", name="terms", methods={"GET"})
     * @return Response
     */
    public function terms(): Response
    {
        return $this->render('home/terms.html.twig');
    }

    /**
     * @Route("/login", name="login")
     * @param AuthenticationUtils $authenticationUtils
     * @return Response
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        if ($this->getUser()) {
            return $this->redirectToRoute('app_home');
        }

        $error = $authenticationUtils->getLastAuthenticationError();
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('home/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    /**
     * @Route("/logout", name="logout")
     */
    public function logout(): Response
    {
        return $this->redirectToRoute('app_home');
    }

    /**
     * @Route("/register", name="register")
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @param GuardAuthenticatorHandler $guardHandler
     * @param UserAuthenticator $authenticator
     * @param Mailer $mailer
     * @param TokenGeneratorInterface $tokenGenerator
     * @return Response
     */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder, GuardAuthenticatorHandler $guardHandler, UserAuthenticator $authenticator, Mailer $mailer, TokenGeneratorInterface $tokenGenerator): Response
    {
        if ($this->getUser()) {
            return $this->redirectToRoute('app_home');
        }

        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

//        if ($this->getDoctrine()->getRepository(EmailAddress::class)->findOneBy(['address' => $form->get('email')->getData()])->getStatus() === false) {
//            $form->get('email')->addError(new FormError('Указанная электронная почта в черном списке'));
//        }

        if ($form->isSubmitted() && $form->isValid()) {

//            $form->get('email')->addError(new FormError('Указанная электронная почта в черном списке'));

//            dd($this->getDoctrine()->getRepository(EmailAddress::class)->findOneBy(['address' => $form->get('email')->getData()])->getStatus());
//
//            if ($this->getDoctrine()->getRepository(EmailAddress::class)->findOneBy(['address' => $form->get('email')->getData()])->getStatus() === false) {
//                $form->addError(new FormError('Указанная электронная почта в черном списке'));
//            }

            $user->setPassword(
                $passwordEncoder->encodePassword(
                    $user,
                    $form->get('password')->getData()
                )
            );

            $profile = new Profile();
            $user->setProfile($profile);
            $user->setRoles(["ROLE_USER"]);
            $user->setToken($tokenGenerator->generateToken());
            $user->getProfile()->setGender($form->get('gender')->getData());
            $user->getProfile()->setAvatar('avatar.jpg');

            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            $this->addFlash('success', $this->trans('flash.registration.successful.completed'));

            $mailer->setTo($form->get('email')->getData())
                ->setSubject($this->trans('mailer.shovdanyist.signup'))
                ->setTemplate('layouts/mailer/registration.html.twig')
                ->setVariables(['user' => $user])
                ->notify();

            return $guardHandler->authenticateUserAndHandleSuccess(
                $user,
                $request,
                $authenticator,
                'main' // firewall name in security.yaml
            );
        }

        return $this->render('home/register.html.twig', [
            'registrationForm' => $form->createView(),
        ]);
    }

    /**
     * @Route("/accountRecovery", name="account_recovery")
     * @param Request $request
     * @param Mailer $mailer
     * @param TokenGeneratorInterface $tokenGenerator
     * @return Response
     */
    public function accountRecovery(Request $request, Mailer $mailer, TokenGeneratorInterface $tokenGenerator): Response
    {
        if ($this->getUser()) {
            return $this->redirectToRoute('app_home');
        }
        $form = $this->createFormBuilder()
            ->add('email', EmailType::class, [
                'label' => 'form.email',
                'help' => 'form.email.help',
                'constraints' => [new Email(), new NotBlank(), new MailExists()]
            ])
            ->getForm();
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $user = $em->getRepository(User::class)->findOneBy(['email' => $form->getData()['email']]);

            $user->setToken($tokenGenerator->generateToken());
            $user->setPasswordRequestedAt(new \Datetime());
            $em->flush();

            $mailer ->setTo($form->getData()['email'])
                ->setSubject($this->trans('mailer.shovdanyist.account.recovery'))
                ->setTemplate('layouts/mailer/reset_password.html.twig')
                ->setVariables(['user' => $user])
                ->notify();

            $this->addFlash('success', $this->trans('flash.recovery.email.sent.successful'));

            return $this->redirectToRoute("app_login");
        }

        return $this->render('home/account_recovery.html.twig', [
            'form' => $form->createView()
        ]);
    }

    private function isRequestInTime(\Datetime $passwordRequestedAt = null): bool
    {
        if ($passwordRequestedAt === null) {
            return false;
        }
        $now = new \DateTime();
        $interval = $now->getTimestamp() - $passwordRequestedAt->getTimestamp();
        $daySeconds = 60 * 10;
        return !($interval > $daySeconds);
    }

    /**
     * @Route("/newPassword/{id}/{token}", name="new_password")
     * @param User $user
     * @param $token
     * @param Request $request
     * @param UserPasswordEncoderInterface $encoder
     * @return Response
     */
    public function newPassword(User $user, $token, Request $request, UserPasswordEncoderInterface $encoder): Response
    {
        if ($this->getUser()) {
            return $this->redirectToRoute('app_home');
        }
        if ($user->getToken() === null || $token !== $user->getToken() || !$this->isRequestInTime($user->getPasswordRequestedAt())) {
            throw new AccessDeniedHttpException($this->trans('password.recovery.link.timeout'));
        }

        $form = $this->createForm(NewPasswordType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $password = $encoder->encodePassword($user, $user->getPassword());
            $user->setPassword($password);

            $user->setToken(null);
            $user->setPasswordRequestedAt(null);

            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            $this->addFlash('success', $this->trans('flash.password.successful.recovered'));
            return $this->redirectToRoute('app_login');
        }

        return $this->render('home/new_password.html.twig', [
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/emailValidation/{id}/{token}", name="email_validation")
     * @param User $user
     * @param $token
     * @return Response
     */
    public function emailValidation(User $user, $token): Response
    {
        if ($user->getToken() == $token) {
            $user->setToken(null);
            if ($user->getStatus() !== false) {
                $user->setStatus(true);
            }
            $user->setConfirmedEmail($user->getEmail());
            $em = $this->getDoctrine()->getManager();

            if (!$this->getDoctrine()->getRepository(EmailAddress::class)->findOneBy(['address' => $user->getEmail()])) {
                $email = new EmailAddress();
                $email->setGender($user->getProfile()->getGender());
                $email->setAddress($user->getEmail());
                $email->setStatus($user->getStatus());
                $em->persist($email);
            }

            $em->flush();
        }

        return $this->render('home/email_validation.html.twig', [
            'user' => $user
        ]);
    }
}
