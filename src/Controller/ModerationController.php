<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\Action;
use App\Entity\User;
use App\Repository\EmailAddressRepository;
use App\Service\Defender;
use DateTime;
use App\Entity\Article;
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
     * @Route("/actions/{page<\d+>?1}", name="actions")
     * @Security("has_role('ROLE_USER_ACTIONS')")
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
     * @Route("/articles/{page<\d+>?1}", name="articles", methods={"GET"})
     * @param $page
     * @param Paginator $paginator
     * @return Response
     */
    public function articles($page, Paginator $paginator): Response
    {
        $paginator
            ->setClass(Article::class)
            ->setOrder(['updatedAt' => 'ASC'])
            ->setCriteria(['status' => null, 'moderation' => true])
            ->setLimit(10)
            ->setPage($page)
        ;

        return $this->render('interface/moderation/articles.html.twig', [
            'articles' => $paginator->getData(),
            'paginator' => $paginator
        ]);
    }

    /**
     * @Route("/publish/article/{id}", name="publish_article")
     * @param Article $article
     * @return Response
     */
    public function publishArticle(Article $article):Response
    {
        $notification = new Notification();
        $notification->setReceiver($article->getAuthor());
        $notification->setType('article_posted');
        $notification->setArticle($article);

        $article->setStatus(true);

        if (!$article->getPublishedAt()) {
            $article->setPublishedAt(new DateTime('now'));
        }

        $article->setUpdatedAt(new DateTime('now'));

        foreach ($article->getNotifications() as $value) {
            $value->setStatus(true);
        }

        $action = new Action();
        $action->setModerator($this->user());
        $action->setArticle($article);
        $action->setType('article_published');

        $em = $this->getDoctrine()->getManager();
        $em->persist($action);
        $em->persist($notification);
        $em->flush();

        return $this->redirectToRoute('moderation_articles');
    }

    /**
     * @Route("/reject/article/{id}", name="reject_article")
     * @param Request $request
     * @param Article $article
     * @return Response
     */
    public function rejectArticle(Request $request, Article $article): Response
    {
        $notification = new Notification();
        $notification->setReceiver($article->getAuthor());
        $notification->setType('article_rejected');
        $notification->setArticle($article);
        $article->setStatus(false);

        $form = $this->createForm(NotificationType::class, $notification);
        $form->handleRequest($request);

        $action = new Action();
        $action->setModerator($this->user());
        $action->setArticle($article);
        $action->setType('article_rejected');
        $action->setContent($notification->getMessage());

        $em = $this->getDoctrine()->getManager();
        $em->persist($action);
        $em->persist($notification);
        $em->flush();

        return $this->redirectToRoute('moderation_articles');
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
                    'disabled' => $role === 'ROLE_USER_MANAGER' && !$defender->isGranted($this->user(),'ROLE_ADMINISTRATOR'),
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
     * @Security("has_role('ROLE_USER_BLOCKER')")
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
     * @Security("has_role('ROLE_USER_BLOCKER')")
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
