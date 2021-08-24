<?php

namespace App\Twig;

use App\Entity\Article;
use App\Form\NotificationType;
use Psr\Container\ContainerInterface;
use Symfony\Component\Form\FormInterface;
use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class ArticleExtension extends AbstractExtension
{
    private $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('articleInfo', [$this, 'articleInfo'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('articleTitle', [$this, 'articleTitle'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('articleTags', [$this, 'articleTags'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('articleImage', [$this, 'articleImage'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('articleDescription', [$this, 'articleDescription'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('articleActions', [$this, 'articleActions'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('articleView', [$this, 'articleView'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('articleStatus', [$this, 'articleStatus'], ['is_safe' => ['html']]),
            new TwigFunction('rejectArticle', [$this, 'rejectArticle'], ['is_safe' => ['html'], 'needs_environment' => true]),
        ];
    }

    public function createForm(string $type, $data = null, array $options = []): FormInterface
    {
        return $this->container->get('form.factory')->create($type, $data, $options);
    }

    public function rejectArticle(Environment $twig, $article)
    {
        $form = $this->createForm(NotificationType::class);

        return $twig->render('layouts/article/_article_reject.html.twig', [
            'article' => $article,
            'form' => $form->createView(),
        ]);
    }

    public function articleInfo(Environment $twig, $article)
    {
        return $twig->render('layouts/article/article_info.html.twig', [
            'article' => $article
        ]);
    }

    public function articleTitle(Environment $twig, $article)
    {
        return $twig->render('layouts/article/article_title.html.twig', [
            'article' => $article
        ]);
    }

    public function articleTags(Environment $twig, $article)
    {
        return $twig->render('layouts/article/article_tags.html.twig', [
            'article' => $article
        ]);
    }

    public function articleImage(Environment $twig, $article)
    {
        return $twig->render('layouts/article/article_image.html.twig', [
            'article' => $article
        ]);
    }

    public function articleDescription(Environment $twig, $article)
    {
        return $twig->render('layouts/article/article_description.html.twig', [
            'article' => $article
        ]);
    }

    public function articleActions(Environment $twig, $article, $comments = true)
    {
        return $twig->render('layouts/article/article_actions.html.twig', [
            'article' => $article,
            'comments' => $comments
        ]);
    }

    public function articleView(Environment $twig,$article,$type = null): string
    {
        return $twig->render('layouts/article/article_view.html.twig',[
            'article' => $article,
            'type' => $type
        ]);
    }

    public function articleStatus(Article $article)
    {
        if (!$article->getModeration()) {
            $badge = 'info';
        } else {
            if ($article->getStatus() === null) {
                $badge = 'warning';
            } elseif ($article->getStatus() === false) {
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
