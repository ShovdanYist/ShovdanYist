<?php

namespace App\Service;

use App\Entity\Action;
use App\Entity\Article;
use App\Entity\Person;
use App\Entity\Song;
use App\Entity\View;
use App\Repository\UserRepository;
use Cocur\Slugify\SlugifyInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;

class Initializer
{
    private $compiler;
    private $slugify;
    private $defender;
    private $user;
    private $em;

    public function __construct(Security $security, UserRepository $users, Defender $defender, Compiler $compiler, SlugifyInterface $slugify, EntityManagerInterface $em)
    {
        $this->user = $users->findOneBy(['username' => $security->getUser()->getUsername()]);
        $this->defender = $defender;
        $this->compiler = $compiler;
        $this->slugify = $slugify;
        $this->em = $em;
    }

    public function initializeSongShow(Song $song)
    {
        if (!$this->defender->isGranted($this->user, 'ROLE_GUEST')) {
            $view = $this->em->getRepository(View::class)->findOneBy(['user' => $this->user, 'song' => $song]);
            if ($view) {
                $this->updateView($view);
            } else {
                $this->createView($song);
            }
        }
        $this->em->flush();
    }

    public function initializeSongNew(Song $song)
    {
        $song->setPublicationDate(new \DateTime('now'));
        $song->setEditingDate(new \DateTime('now'));
        $song->setAuthor($this->user);
        $this->updateTagsDate($song);
        $this->setSearchData($song);
        $this->setSlug($song);

        $this->em->persist($song);
        $this->em->flush();
    }

    public function initializeSongEdit(Song $song)
    {
        $song->setEditingDate(new \DateTime('now'));
        $this->createAction($song, 'song_edited');
        $this->setSearchData($song);
        $this->setSlug($song);

        $this->em->flush();
    }

    public function initializeArticleNew(Article $article)
    {
        $article->setDescription(mb_substr($this->compiler->htmlToText($article->getContent()), 0, 120));
        $article->setSlug($this->slugify->slugify($article->getTitle()));
        $article->setUpdatedAt(new \DateTime('now'));
        $article->setSection('articles');
        $article->setAuthor($this->user);
        $article->setViews(0);

        $this->em->persist($article);
        $this->em->flush();
    }

    public function initializeArticleEdit(Article $article)
    {
        $article->setDescription(mb_substr($this->compiler->htmlToText($article->getContent()),0,120));
        $article->setSlug($this->slugify->slugify($article->getTitle()));

        if ($this->user === $article->getAuthor() && !$this->defender->isGranted($this->user,'ROLE_ARTICLE_APPROVER') || $this->user === $article->getAuthor() && !$this->defender->isGranted($this->user,'ROLE_ARTICLE_EDITOR')) {
            $article->setUpdatedAt(new \DateTime('now'));
            $article->setStatus(null);
        }

        if ($article->getStatus() !== true) {
            foreach ($article->getNotifications() as $value) {
                $value->setStatus(false);
            }
        } else {
            foreach ($article->getNotifications() as $value) {
                $value->setStatus(true);
            }
        }

        if ($article->getAuthor() !== $this->user) {
            $this->createAction($article,'article_edited');
        }

        $this->em->flush();
    }

    public function initializeVocalistNew(Person $person)
    {
        $person->setUpdatedAt(new \DateTime('now'));
        $this->setSlug($person);

        $this->em->persist($person);
        $this->em->flush();
    }

    public function initializeVocalistEdit(Person $person)
    {
        $person->setUpdatedAt(new \DateTime('now'));
        $this->createAction($person,'person_edited');
        $this->setSlug($person);

        $this->em->flush();
    }

    private function createAction($entity, $type)
    {
        $action = new Action();
        $action->setType($type);
        $action->setModerator($this->user);

        if ($entity instanceof Song) {
            $action->setSong($entity);
        } elseif ($entity instanceof Person) {
            $action->setPerson($entity);
        } elseif ($entity instanceof Article) {
            $action->setArticle($entity);
        }

        $this->em->persist($action);
    }

    private function createView(Song $song)
    {
        $view = new View();
        $view->setUser($this->user);
        $view->setSong($song);
        $view->setViewedAt(new \DateTime('now'));
        $view->setQuantity(1);

        $this->em->persist($view);
    }

    private function updateView(View $view)
    {
        $view->setQuantity($view->getQuantity() + 1);
        $view->setViewedAt(new \DateTime('now'));
    }

    private function updateTagsDate($entity)
    {
        if ($entity->getTags()) {
            foreach ($entity->getTags() as $tag) {
                $tag->setUpdatedAt(new \DateTime('now'));
            }
        }
    }

    private function setSearchData(Song $song)
    {
        $values = [
            $song->getFullTitle(),
            $song->getVocalist()->getFirstName() . ' ' . $song->getVocalist()->getLastName() . ' ' . $song->getTitle(),
            $this->compiler->htmlToText($song->getLyrics()),
        ];

        $song->setSearch(mb_strtolower(implode(' ', $values)));
    }

    private function setSlug($entity)
    {
        if ($entity instanceof Song) {
            $vocalist = '';
            if ($entity->getVocalist()){
                $vocalist = $entity->getVocalist()->getFullName() . ' ';
            }
            $entity->setSlug($this->slugify->slugify($vocalist . $entity->getTitle()));
        } elseif ($entity instanceof Person) {
            $entity->setSlug($this->slugify->slugify($entity->getFullName()));
        }
    }
}
