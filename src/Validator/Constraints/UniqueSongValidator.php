<?php


namespace App\Validator\Constraints;

use App\Entity\Song;
use App\Repository\SongRepository;
use Cocur\Slugify\Slugify;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Contracts\Translation\TranslatorInterface;

class UniqueSongValidator extends ConstraintValidator
{
    private $translator;
    private $repo;

    public function __construct(SongRepository $repo, TranslatorInterface $translator)
    {
        $this->repo = $repo;
        $this->translator = $translator;
    }

    public function validate($entity, Constraint $constraint)
    {
        $slugifier  = new Slugify();
        $artist     = '';
        $message    = '';

        if ($entity->getArtist()){
            $artist = $entity->getArtist()->getFullName() . ' ';
        }

        $slug       = $slugifier->slugify($artist . $entity->getTitle());
        $exist      = $this->repo->findOneBy(['slug' => $slug]);
        $duplicate  = $this->duplicate($entity);

        if ($duplicate) {
            $message   = $this->translator->trans('This performer already has a composition with this title');
        } elseif ($exist) {
            $message   = $this->translator->trans('Composition with this alias already exists');
            $duplicate = true;
        }

        /** Verify if this is an existing song entity, for allow update */
        if ($this->repo->findOneBy(['id' => $entity->getId()])){
            if ($exist && $exist->getId() == $entity->getId()) {
                $duplicate = false;
            }
        }

        if ($duplicate) {
            $this->context  ->buildViolation($constraint->message)
                            ->atPath('title')
                            ->setParameter('{{ message }}', $message)
                            ->addViolation();
        }
    }

    public function duplicate(Song $newSong)
    {
        $songs     = $this->repo->findBy(['title' => $newSong->getTitle()]);
        $bool       = false;

        foreach ($songs as $song) {
            /** Verify if vocalist exists to compare with others in database */
            if ($newSong->getArtist()){
                $fullname = false;
                $same     = false;

                if ($song->getArtist()) {
                    $fullname = $newSong->getArtist()->getFullName() == $song->getArtist()->getFullName();
                    $same = $newSong->getId() !== $song->getId();
                }

                if ($fullname && $same) {
                    $bool = true;
                }
            }
        }

        return $bool;
    }
}
