<?php

namespace App\Twig;

use App\Entity\Comment;
use App\Entity\User;
use App\Form\CommentType;
use App\Repository\TagRepository;
use App\Service\Paginator;
use Psr\Container\ContainerInterface;
use Symfony\Component\Form\FormInterface;
use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class ModulesExtension extends AbstractExtension
{
    private $tags;
    private $paginator;
    private $container;

    public function __construct(TagRepository $tags, Paginator $paginator, ContainerInterface $container)
    {
        $this->paginator = $paginator;
        $this->container = $container;
        $this->tags = $tags;
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('tags', [$this, 'tags'], ['is_safe' => ['html']]),
            new TwigFunction('comments', [$this, 'comments'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('crudActions', [$this, 'crudActions'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('breadcrumb', [$this, 'breadcrumb'], ['is_safe' => ['html'], 'needs_environment' => true]),
        ];
    }

    public function tags($type = null)
    {
        return $this->tags->findByType($type);
    }

    public function createForm(string $type, $data = null, array $options = []): FormInterface
    {
        return $this->container->get('form.factory')->create($type, $data, $options);
    }

    /**
     * @throws RuntimeError
     * @throws SyntaxError
     * @throws LoaderError
     */
    public function comments(Environment $twig, $entity, $page, $params): string
    {
        $name = strtolower((new \ReflectionClass($entity))->getShortName());

        $this->paginator->setClass(Comment::class)
            ->setType('comments')
            ->setOrder(['id' => 'DESC'])
            ->setCriteria([$name => $entity])
            ->setParameters($params)
            ->setLimit(10)
            ->setPage($page);

        return $twig->render('interface/layouts/comments/comment_block.html.twig', [
            'commentForm' => $this->createForm(CommentType::class)->createView(),
            'comments' => $this->paginator->getData(),
            'paginator' => $this->paginator,
            'entity' => $entity,
            'name' => $name
        ]);
    }

    /**
     * @throws RuntimeError
     * @throws SyntaxError
     * @throws LoaderError
     */
    public function crudActions(Environment $twig, $entity, $name): string
    {
        ($entity instanceof User) ? $instance = true : $instance = false;

        return $twig->render('dashboard/layouts/actions.html.twig', [
            'entity' => $entity,
            'name' => $name,
            'user' => $instance
        ]);
    }

    /**
     * @throws SyntaxError
     * @throws RuntimeError
     * @throws LoaderError
     */
    public function breadcrumb(Environment $twig, $links, $entity = null, $name = null): string
    {
        return $twig->render('interface/layouts/service/breadcrumb.html.twig', [
            'links' => $links,
            'entity' => $entity,
            'name' => $name
        ]);
    }
}
