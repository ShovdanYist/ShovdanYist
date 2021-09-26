<?php

namespace App\Twig;

use App\Entity\Post;
use App\Form\NotificationType;
use Psr\Container\ContainerInterface;
use Symfony\Component\Form\FormInterface;
use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class PostExtension extends AbstractExtension
{
    private $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('postValidation', [$this, 'postValidation'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('postInfo', [$this, 'postInfo'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('postTitle', [$this, 'postTitle'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('postTags', [$this, 'postTags'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('postImage', [$this, 'postImage'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('postDescription', [$this, 'postDescription'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('postActions', [$this, 'postActions'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('postPreview', [$this, 'postPreview'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('actionMessage', [$this, 'actionMessage'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('actionView', [$this, 'actionView'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('postStatus', [$this, 'postStatus'], ['is_safe' => ['html']]),
        ];
    }

    public function createForm(string $type, $data = null, array $options = []): FormInterface
    {
        return $this->container->get('form.factory')->create($type, $data, $options);
    }

    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function postValidation(Environment $twig, $post): string
    {
        $form = $this->createForm(NotificationType::class);

        return $twig->render('interface/layouts/post/_post_reject.html.twig', [
            'post' => $post,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @throws RuntimeError
     * @throws SyntaxError
     * @throws LoaderError
     */
    public function postInfo(Environment $twig, $post): string
    {
        return $twig->render('interface/layouts/post/post_info.html.twig', [
            'post' => $post
        ]);
    }

    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function postTitle(Environment $twig, $post): string
    {
        return $twig->render('interface/layouts/post/post_title.html.twig', [
            'post' => $post
        ]);
    }

    /**
     * @throws RuntimeError
     * @throws SyntaxError
     * @throws LoaderError
     */
    public function postTags(Environment $twig, $post): string
    {
        return $twig->render('interface/layouts/post/post_tags.html.twig', [
            'post' => $post
        ]);
    }

    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function postImage(Environment $twig, $post): string
    {
        return $twig->render('interface/layouts/post/post_image.html.twig', [
            'post' => $post
        ]);
    }

    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function postDescription(Environment $twig, $post): string
    {
        return $twig->render('interface/layouts/post/post_description.html.twig', [
            'post' => $post
        ]);
    }

    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function postActions(Environment $twig, $post, $comments = true): string
    {
        return $twig->render('interface/layouts/post/post_actions.html.twig', [
            'post' => $post,
            'comments' => $comments
        ]);
    }

    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function actionMessage(Environment $twig, $action): string
    {
        return $twig->render('interface/layouts/action_message.html.twig', [
            'action' => $action
        ]);
    }

    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function actionView(Environment $twig, $action): string
    {
        return $twig->render('interface/layouts/action_view.html.twig', [
            'action' => $action
        ]);
    }

    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function postPreview(Environment $twig, Post $post, $view = 'feed'): string
    {
        return $twig->render('interface/layouts/post/post_preview.html.twig',[
            'post' => $post,
            'type' => $post->getType(),
            'view' => $view
        ]);
    }

    public function postStatus(Post $post): string
    {
        if (!$post->getModeration()) {
            $badge = 'info';
        } else {
            if ($post->getStatus() === null) {
                $badge = 'warning';
            } elseif ($post->getStatus() === false) {
                $badge = 'danger';
            } else {
                $badge = 'success';
            }
        }

        $template = '<i class="fas fa-circle text-%s"></i>';

        return sprintf(
            $template,
            $badge
        );
    }
}
