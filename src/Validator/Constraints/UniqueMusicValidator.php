<?php


namespace App\Validator\Constraints;

use App\Entity\Song;
use App\Repository\SongRepository;
use Cocur\Slugify\Slugify;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class UniqueMusicValidator extends ConstraintValidator
{
    public $repo;

    public function __construct(SongRepository $repo)
    {
        $this->repo = $repo;
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
            $message   = 'This artist already has a song with same title';
        } elseif ($exist) {
            $message   = 'Song with this alias already exists';
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

    public function duplicate(Song $newMusic)
    {
        $musics     = $this->repo->findBy(['title' => $newMusic->getTitle()]);
        $bool       = false;

        foreach ($musics as $music) {
            /** Verify if artist exists to compare with others in database */
            if ($newMusic->getArtist()){
                $fullname = false;
                $same     = false;

                if ($newMusic->getArtist() && $music->getArtist()) {
                    $fullname = $newMusic->getArtist()->getFullName() == $music->getArtist()->getFullName();
                    $same = $newMusic->getId() !== $music->getId();
                }

                if ($fullname && $same) {
                    $bool = true;
                }
            }
        }

        return $bool;
    }
}
