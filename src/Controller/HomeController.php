<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\EmailAddress;
use App\Entity\Profile;
use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Form\NewPasswordType;
use App\Security\UserAuthenticator;
use App\Service\Mailer;
use App\Service\Sitemap;
use App\Validator\Constraints\MailExists;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
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
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;

/**
 * @Route(name="app_")
 */
class HomeController extends CustomAbstractController
{
    /**
     * @Route("/sitemap.xml", name="sitemap", defaults={"_format"="xml"})
     * @param Request $request
     * @param Sitemap $sitemap
     * @throws RuntimeError
     * @throws SyntaxError
     * @throws LoaderError
     * @return Response
     */
    public function sitemap(Request $request, Sitemap $sitemap): Response
    {
        return $sitemap->urls($request->getSchemeAndHttpHost());
    }

    /**
     * @Route("/posts/sitemap.xml", name="posts_sitemap", defaults={"_format"="xml"})
     * @param Request $request
     * @param Sitemap $sitemap
     * @throws RuntimeError
     * @throws SyntaxError
     * @throws LoaderError
     * @return Response
     */
    public function postsSitemap(Request $request, Sitemap $sitemap): Response
    {
        return $sitemap->postsUrls($request->getSchemeAndHttpHost());
    }

    /**
     * @Route("/terms", name="terms", methods={"GET"})
     * @return Response
     */
    public function terms(): Response
    {
        return $this->render('interface/home/terms.html.twig');
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

        if ($error) {
            $this->addFlash('danger',$this->trans($error->getMessageKey(),[],'security'));
        }

        return $this->render('interface/home/login.html.twig', [
            'last_username' => $lastUsername
        ]);
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

        if ($form->isSubmitted() && $form->isValid()) {

            $user->setPassword(
                $passwordEncoder->encodePassword(
                    $user,
                    $form->get('password')->getData()
                )
            );

            $profile = new Profile();
            $user->setProfile($profile);
            $user->setToken($tokenGenerator->generateToken());
            $user->setUsername(strtolower($form->get('username')->getData()));
            $user->getProfile()->setGender($form->get('gender')->getData());
            $user->getProfile()->setBirthday($form->get('birthday')->getData());
            $user->getProfile()->setAvatar('avatar.jpg');

            if ($form->get('invitedBy')->getData() && $this->getDoctrine()->getRepository(User::class)->findOneBy(['username' => $form->get('invitedBy')->getData()])) {
                $user->setInvitedBy($this->getDoctrine()->getRepository(User::class)->findOneBy(['username' => $form->get('invitedBy')->getData()]));
            }

            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            $this->addFlash('success', $this->trans('flash.registration.successful.completed'));

            $mailer->setTo($form->get('email')->getData())
                ->setSubject($this->trans('mailer.shovdanyist.signup'))
                ->setTemplate('interface/layouts/mailer/registration.html.twig')
                ->setVariables(['user' => $user])
                ->notify();

            return $guardHandler->authenticateUserAndHandleSuccess(
                $user,
                $request,
                $authenticator,
                'main' // firewall name in security.yaml
            );
        }

        return $this->render('interface/home/register.html.twig', [
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
                'label' => 'email',
                'help' => 'email.recovery.help',
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
                ->setTemplate('interface/layouts/mailer/reset_password.html.twig')
                ->setVariables(['user' => $user])
                ->notify();

            $this->addFlash('success', $this->trans('flash.recovery.email.sent.successful'));

            return $this->redirectToRoute("app_login");
        }

        return $this->render('interface/home/account_recovery.html.twig', [
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

        return $this->render('interface/home/new_password.html.twig', [
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/emailValidation/{token}", name="email_validation")
     * @param $token
     * @return Response
     */
    public function emailValidation($token): Response
    {
        $user = $this->getDoctrine()->getRepository(User::class)->findOneBy(['token' => $token]);

        if ($user && $user->getStatus() !== false) {
            $user->setToken(null);
            $user->setStatus(true);
            $user->setConfirmedEmail($user->getEmail());
            $em = $this->getDoctrine()->getManager();

            if (!$this->getDoctrine()->getRepository(EmailAddress::class)->findOneBy(['address' => $user->getEmail()])) {
                $email = new EmailAddress();
                $email->setGender($user->getProfile()->getGender());
                $email->setAddress($user->getEmail());
                $email->setStatus($user->getStatus());
                $email->setBirthday($user->getProfile()->getBirthday());
                $em->persist($email);
            }

            $em->flush();
            $status = true;
        } elseif ($user && $user->getStatus() == false) {
            $status = false;
        } else {
            $status = null;
        }

        return $this->render('interface/home/email_validation.html.twig', [
            'user' => $user,
            'status' => $status
        ]);
    }
}
