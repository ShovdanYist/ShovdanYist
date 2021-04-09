<?php

namespace App\Twig;

use App\Entity\Post;
use App\Form\NotificationType;
use Psr\Container\ContainerInterface;
use Symfony\Component\Form\FormInterface;
use Twig\Environment;
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
            new TwigFunction('postInfo', [$this, 'postInfo'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('postTitle', [$this, 'postTitle'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('postCategories', [$this, 'postCategories'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('postImage', [$this, 'postImage'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('postDescription', [$this, 'postDescription'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('postActions', [$this, 'postActions'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('postView', [$this, 'postView'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('postStatus', [$this, 'postStatus'], ['is_safe' => ['html']]),
            new TwigFunction('rejectPost', [$this, 'rejectPost'], ['is_safe' => ['html'], 'needs_environment' => true]),
        ];
    }

    public function createForm(string $type, $data = null, array $options = []): FormInterface
    {
        return $this->container->get('form.factory')->create($type, $data, $options);
    }

    public function rejectPost(Environment $twig, $post)
    {
        $form = $this->createForm(NotificationType::class);

        return $twig->render('layouts/post/_post_reject.html.twig', [
            'post' => $post,
            'form' => $form->createView(),
        ]);
    }

    public function postInfo(Environment $twig, $post)
    {
        return $twig->render('layouts/post/post_info.html.twig', [
            'post' => $post
        ]);
    }

    public function postTitle(Environment $twig, $post)
    {
        return $twig->render('layouts/post/post_title.html.twig', [
            'post' => $post
        ]);
    }

    public function postCategories(Environment $twig, $post)
    {
        return $twig->render('layouts/post/post_categories.html.twig', [
            'post' => $post
        ]);
    }

    public function postImage(Environment $twig, $post)
    {
        return $twig->render('layouts/post/post_image.html.twig', [
            'post' => $post
        ]);
    }

    public function postDescription(Environment $twig, $post)
    {
        return $twig->render('layouts/post/post_description.html.twig', [
            'post' => $post
        ]);
    }

    public function postActions(Environment $twig, $post, $comments = true)
    {
        return $twig->render('layouts/post/post_actions.html.twig', [
            'post' => $post,
            'comments' => $comments
        ]);
    }

    public function postView(Environment $twig,$post,$type = null): string
    {
        return $twig->render('layouts/post/post_view.html.twig',[
            'post' => $post,
            'type' => $type
        ]);
    }

    public function postStatus(Post $post)
    {
        if ($post->getStatus() === null) {
            $badge = 'warning';
            $message = 'на модерации';
        } elseif ($post->getStatus() === false) {
            $badge = 'danger';
            $message = 'отклонен';
        } else {
            $badge = 'success';
            $message = 'опубликован';
        }

        $template = '<span class="badge badge-pill badge-%s">%s</span>';

        return sprintf(
            $template,
            $badge,
            $message
        );
    }
}
