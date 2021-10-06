<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\Action;
use App\Entity\Person;
use App\Entity\Song;
use App\Entity\User;
use App\Repository\EmailAddressRepository;
use App\Service\Defender;
use DateTime;
use App\Entity\Post;
use App\Entity\Notification;
use App\Form\NotificationType;
use App\Service\Paginator;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/moderation", name="moderation_")
 */
class ModerationController extends CustomAbstractController
{
    /**
     * @Route("/", name="index")
     * @return Response
     */
    public function index(): Response
    {
        $posts = $this->getDoctrine()->getRepository(Post::class);
        $songs = $this->getDoctrine()->getRepository(Song::class);
        $users = $this->getDoctrine()->getRepository(User::class);
        $people = $this->getDoctrine()->getRepository(Person::class);

        $stats = [
            'users' => [
                'name' => 'users',
                'moderation' => null,
                'published' => null,
                'total' => $users->count([])
            ],
            'posts' => [
                'name' => 'posts',
                'moderation' => $posts->count(['status' => false]),
                'published' => $posts->count(['status' => true]),
                'total' => $posts->count([])
            ],
            'songs' => [
                'name' => 'songs',
                'moderation' => $songs->count(['status' => false]),
                'published' => $songs->count(['status' => true]),
                'total' => $songs->count([])
            ],
            'people' => [
                'name' => 'people',
                'moderation' => null,
                'published' => null,
                'total' => $people->count([])
            ]
        ];

        return $this->render('interface/moderation/index.html.twig', [
            'stats' => $stats
        ]);
    }

    /**
     * @Route("/music/{page<\d+>?1}", name="music")
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function music($page, Paginator $paginator): Response
    {
        $paginator
            ->setClass(Song::class)
            ->setType('song')
            ->setPage($page)
            ->setLimit(15)
            ->setOrder(['publicationDate' => 'DESC'])
            ->setCriteria(['author' => $this->user(), 'status' => null])
        ;

        return $this->render('interface/moderation/songs.html.twig', [
            'songs' => $paginator->getData(),
            'paginator' => $paginator
        ]);
    }

    /**
     * @Route("/ready/{page<\d+>?1}", name="ready")
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function ready($page, Paginator $paginator): Response
    {
        $paginator
            ->setClass(Song::class)
            ->setType('song')
            ->setPage($page)
            ->setLimit(15)
            ->setOrder(['publicationDate' => 'DESC'])
            ->setCriteria(['status' => false])
        ;

        return $this->render('interface/moderation/songs.html.twig', [
            'songs' => $paginator->getData(),
            'paginator' => $paginator
        ]);
    }

    /**
     * @Route("/pending/{page<\d+>?1}", name="pending")
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function pending($page, Paginator $paginator): Response
    {
        $paginator
            ->setClass(Song::class)
            ->setType('song')
            ->setPage($page)
            ->setLimit(15)
            ->setOrder(['publicationDate' => 'DESC'])
            ->setMethod('findPendingSongs')
            ->setCriteria(['user' => $this->user()])
        ;

        return $this->render('interface/moderation/songs.html.twig', [
            'songs' => $paginator->getData(),
            'paginator' => $paginator
        ]);
    }

    /**
     * @Route("/actions/{page<\d+>?1}", name="actions")
     * @param $page
     * @param Paginator $paginator
     * @param Defender $defender
     * @return Response
     */
    public function actions($page, Paginator $paginator, Defender $defender): Response
    {
        $paginator
            ->setOrder(['createdAt' => 'DESC'])
            ->setClass(Action::class)
            ->setType('action')
            ->setLimit(20)
            ->setPage($page);

        return $this->render('interface/moderation/actions.html.twig', [
            'actions' => $paginator->getData(),
            'paginator' => $paginator,
            'moderators' => $defender->getActionUsers()
        ]);
    }

    /**
     * @Route("/action/{id}/delete", name="action_delete", methods={"DELETE"})
     * @Security("has_role('ROLE_OWNER')")
     * @param Request $request
     * @param Action $action
     * @return Response
     */
    public function deleteAction(Request $request, Action $action): Response
    {
        if ($this->isCsrfTokenValid('delete'.$action->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($action);
            $em->flush();
        }

        return $this->redirectToRoute('moderation_actions');
    }

    /**
     * @Route("/actions/user/{username}/{page<\d+>?1}", name="user_actions")
     * @Security("has_role('ROLE_USER_ACTIONS')")
     * @param User $user
     * @param $page
     * @param Paginator $paginator
     * @param Defender $defender
     * @return Response
     */
    public function userActions(User $user,$page, Paginator $paginator, Defender $defender): Response
    {
        $paginator
            ->setCriteria(['moderator' => $user])
            ->setParameters(['username' => $user->getUsername()])
            ->setOrder(['createdAt' => 'DESC'])
            ->setClass(Action::class)
            ->setType('action')
            ->setLimit(20)
            ->setPage($page);

        return $this->render('interface/moderation/actions.html.twig', [
            'actions' => $paginator->getData(),
            'paginator' => $paginator,
            'user' => $user,
            'moderators' => $defender->getActionUsers()
        ]);
    }

    /**
     * @Route("/actions/type/{type}/{page<\d+>?1}", name="type_actions")
     * @Security("has_role('ROLE_USER_ACTIONS')")
     * @param $type
     * @param $page
     * @param Paginator $paginator
     * @param Defender $defender
     * @return Response
     */
    public function typeActions($type,$page, Paginator $paginator, Defender $defender): Response
    {
        $paginator
            ->setCriteria(['type' => $type])
            ->setOrder(['createdAt' => 'DESC'])
            ->setClass(Action::class)
            ->setType('action')
            ->setLimit(20)
            ->setPage($page);

        return $this->render('interface/moderation/actions.html.twig', [
            'actions' => $paginator->getData(),
            'paginator' => $paginator,
            'moderators' => $defender->getActionUsers(),
            'type' => $type
        ]);
    }

    /**
     * @Route("/posts/{page<\d+>?1}", name="posts", methods={"GET"})
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function posts($page, Paginator $paginator): Response
    {
        $paginator
            ->setClass(Post::class)
            ->setOrder(['updatedAt' => 'ASC'])
            ->setCriteria(['status' => null])
            ->setLimit(10)
            ->setPage($page)
        ;

        return $this->render('interface/moderation/posts.html.twig', [
            'posts' => $paginator->getData(),
            'paginator' => $paginator
        ]);
    }

    /**
     * @Route("/validation/post/{id}", name="post_validation")
     * @param Request $request
     * @param Post $post
     * @return Response
     */
    public function postValidation(Request $request, Post $post): Response
    {
        if ($post->getStatus() === null) {
            $em = $this->getDoctrine()->getManager();
            $sender = $this->getDoctrine()->getRepository(User::class)->findOneBy(['id' => 2]);

            $notification = new Notification();
            $notification->setReceiver($post->getAuthor());
            $notification->setPost($post);
            $notification->setSender($sender);

            $form = $this->createForm(NotificationType::class, $notification);
            $form->handleRequest($request);

            $action = new Action();
            $action->setModerator($this->user());
            $action->setPost($post);

            if ($form->get('approve')->isClicked()) {
                $notification->setType('post_approved');
                $action->setType('post_approved');
                $post->setStatus(true);
                $post->setGender($form->get('gender')->getData());

                if ($post->getTaggedUsers()) {
                    foreach ($post->getTaggedUsers()->getValues() as $user) {
                        $notify = new Notification();
                        $notify->setReceiver($user);
                        $notify->setPost($post);
                        $notify->setSender($post->getAuthor());
                        $notify->setType('user_tagged');
                        $em->persist($notify);
                    }
                }

                if ($post->getNotifications()) {
                    foreach ($post->getNotifications() as $notification) {
                        $notification->setStatus(true);
                    }
                }

                if ($post->getPublishedAt()->getTimestamp() === $post->getUpdatedAt()->getTimestamp()) {
                    $post->setPublishedAt(new DateTime('now'));
                }
            } elseif ($form->get('reject')->isClicked()) {
                if (!$form->get('message')->getData()) {
                    $this->addFlash('danger', 'Вы не указали причину отказа');
                    return $this->redirectToRoute('moderation_posts');
                }

                $notification->setType('post_rejected');
                $action->setContent($notification->getMessage());
                $action->setType('post_rejected');
                $post->setStatus(false);
            }

            $em->persist($action);
            $em->persist($notification);
            $em->flush();
        } else {
            ($post->getStatus() === true) ? $status = 'approved' : $status = 'rejected';
            $this->addFlash('info', $this->trans( 'post.is.already.' . $status));
        }

        return $this->redirectToRoute('moderation_posts');
    }

    /**
     * @Route("/user/rights/{username}", name="user_rights", methods={"GET", "POST"})
     * @Security("has_role('ROLE_SUPER_MODERATOR')")
     * @param Request $request
     * @param User $user
     * @param Defender $defender
     * @return Response
     */
    public function userRights(Request $request, User $user, Defender $defender): Response
    {
        if (!$defender->rightToChangeUserRights($this->user(),$user)) {
            return $this->redirectToRoute('user_profile', ['username' => $user->getUsername()]);
        }

        $form = $this->createFormBuilder($user)->getForm();

        foreach ($defender->getRoles() as $role) {
            if ($defender->isGranted($this->user(),$role)) {
                $form->add($role, CheckboxType::class,[
                    'label' => $role,
                    'mapped' => false,
                    'required' => false,
                    'data' => $defender->isGranted($user,$role),
                    'disabled' => $role === 'ROLE_USER_RIGHTS' && !$defender->isGranted($this->user(),'ROLE_ADMINISTRATOR'),
                    'label_attr' => ['class' => 'switch-custom']
                ]);
            } else {
                $form->add($role, CheckboxType::class,[
                    'label' => $role,
                    'mapped' => false,
                    'required' => false,
                    'data' => $defender->isGranted($user,$role),
                    'disabled' => true,
                    'label_attr' => ['class' => 'switch-custom']
                ]);
            }
        }

        if ($defender->isGranted($this->user(),'ROLE_OWNER')) {
            $form->add('ROLE_ADMINISTRATOR', CheckboxType::class,[
                'label' => 'ROLE_ADMINISTRATOR',
                'mapped' => false,
                'required' => false,
                'data' => $defender->isGranted($user,'ROLE_ADMINISTRATOR'),
                'label_attr' => ['class' => 'switch-custom']
            ]);
        }

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $rightsBefore = $user->getRoles();

            $rights = [];

            foreach ($defender->getRoles() as $role) {
                $status = $form->get($role)->getData();
                if ($status) {
                    $rights[] = $role;
                }
            }

            if ($defender->isGranted($this->user(),'ROLE_OWNER') && $form->get('ROLE_ADMINISTRATOR')->getData()) {
                $rights[] = 'ROLE_ADMINISTRATOR';
            }

            ($rights) ? $user->setRoles($rights) : $user->setRoles(["ROLE_USER"]);

            $rightsAfter = $user->getRoles();

            $message = '';

            foreach (array_diff($rightsBefore, $rightsAfter) as $value) {
                $message .= '<br> - ' . $this->trans($value);
            }

            foreach (array_diff($rightsAfter, $rightsBefore) as $value) {
                $message .= '<br> + ' . $this->trans($value);
            }

            $em = $this->getDoctrine()->getManager();

            if ($message !== '') {
                $action = new Action();
                $action->setModerator($this->user());
                $action->setUser($user);
                $action->setType('rights_changed');
                $action->setContent($message);
                $em->persist($action);
            }

            $em->flush();

            return $this->redirectToRoute('user_profile', [
                'username' => $user->getUsername()
            ]);
        }

        return $this->render('interface/moderation/rights.html.twig', [
            'form' => $form->createView(),
            'user' => $user,
            'roles' => $defender->getRoles()
        ]);
    }

    /**
     * @Route("/blockUser/{id}", name="block_user", methods={"GET","POST"})
     * @param User $user
     * @param EmailAddressRepository $emails
     * @param Defender $defender
     * @return Response
     */
    public function blockUser(User $user, EmailAddressRepository $emails, Defender $defender): Response
    {
        if (!$defender->rightToBlockUser($this->user(),$user)) {
            $this->addFlash('warning', 'Вы не можете блокировать данного пользователя');
            return $this->redirectToRoute('user_profile', ['username' => $user->getUsername()]);
        }

        $email = $emails->findOneBy(['address' => $user->getConfirmedEmail()]);

        if ($email) {
            $email->setStatus(false);
        }

        $user->setStatus(false);
        $user->setRoles(["ROLE_USER"]);

        $action = new Action();
        $action->setModerator($this->user());
        $action->setUser($user);
        $action->setType('user_blocked');

        $em = $this->getDoctrine()->getManager();
        $em->persist($action);
        $em->flush();

        $this->addFlash('danger', 'Пользователь '. $user->getUsername() . ' заблокирован');

        return $this->redirectToRoute('user_profile', [
            'username' => $user->getUsername()
        ]);
    }

    /**
     * @Route("/unblockUser/{id}", name="unblock_user", methods={"GET","POST"})
     * @param User $user
     * @param EmailAddressRepository $emails
     * @return Response
     */
    public function unblockUser(User $user, EmailAddressRepository $emails): Response
    {
        $email = $emails->findOneBy(['address' => $user->getConfirmedEmail()]);

        if ($email) {
            $email->setStatus(true);;
        }

        $user->setStatus(true);

        $action = new Action();
        $action->setModerator($this->user());
        $action->setUser($user);
        $action->setType('user_unblocked');

        $em = $this->getDoctrine()->getManager();
        $em->persist($action);
        $em->flush();

        $this->addFlash('success', 'Пользователь '. $user->getUsername() . ' разблоктрован');

        return $this->redirectToRoute('user_profile', [
            'username' => $user->getUsername()
        ]);
    }
}
