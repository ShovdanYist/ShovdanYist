<?php

namespace App\Twig;

use App\Entity\Comment;
use App\Entity\User;
use App\Form\CommentType;
use App\Repository\CategoryRepository;
use App\Service\Paginator;
use phpDocumentor\Reflection\Types\True_;
use Psr\Container\ContainerInterface;
use Symfony\Component\Form\FormInterface;
use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class ModulesExtension extends AbstractExtension
{
    private $categories;
    private $paginator;
    private $container;

    public function __construct(CategoryRepository $categories, Paginator $paginator, ContainerInterface $container)
    {
        $this->paginator = $paginator;
        $this->container = $container;
        $this->categories = $categories;
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('categories', [$this, 'categories'], ['is_safe' => ['html']]),
            new TwigFunction('comments', [$this, 'comments'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('crudActions', [$this, 'crudActions'], ['is_safe' => ['html'], 'needs_environment' => true]),
            new TwigFunction('breadcrumb', [$this, 'breadcrumb'], ['is_safe' => ['html'], 'needs_environment' => true]),
        ];
    }

    public function categories($section = null)
    {
        return $this->categories->findBySection($section);
    }

    public function createForm(string $type, $data = null, array $options = []): FormInterface
    {
        return $this->container->get('form.factory')->create($type, $data, $options);
    }

    public function comments(Environment $twig, $entity, $page, $params)
    {
        $name = strtolower((new \ReflectionClass($entity))->getShortName());

        $this->paginator->setClass(Comment::class)
            ->setType('comments')
            ->setOrder(['id' => 'DESC'])
            ->setCriteria([$name => $entity])
            ->setParameters($params)
            ->setLimit(10)
            ->setPage($page);

        return $twig->render('/layouts/modules/comments/comment_block.html.twig', [
            'commentForm' => $this->createForm(CommentType::class)->createView(),
            'comments' => $this->paginator->getData(),
            'paginator' => $this->paginator,
            'entity' => $entity,
            'name' => $name
        ]);
    }

    public function crudActions(Environment $twig, $entity, $name)
    {
        ($entity instanceof User) ? $instance = true : $instance = false;

        return $twig->render('dashboard/layouts/actions.html.twig', [
            'entity' => $entity,
            'name' => $name,
            'user' => $instance
        ]);
    }

    public function breadcrumb(Environment $twig, $links, $entity = null)
    {
        $name = ($entity) ? strtolower((new \ReflectionClass($entity))->getShortName()) : null ;

        return $twig->render('layouts/modules/breadcrumb.html.twig', [
            'links' => $links,
            'name' => $name,
            'entity' => $entity
        ]);
    }
}
