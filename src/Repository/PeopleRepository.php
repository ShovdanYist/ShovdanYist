<?php

namespace App\Repository;

use App\Entity\People;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method People|null find($id, $lockMode = null, $lockVersion = null)
 * @method People|null findOneBy(array $criteria, array $orderBy = null)
 * @method People[]    findAll()
 * @method People[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PeopleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, People::class);
    }

    /**
     * @param $activity
     * @return People[] Returns an array of People objects
     */
    public function findByActivity($activity)
    {
        return $this->createQueryBuilder('p')
            ->join('p.activity', 'a')
            ->where('a.slug = :activity')
            ->setParameter('activity', $activity)
            ->orderBy('p.firstName', 'ASC')
            ->getQuery()
            ->getResult();
    }

    public function findOneActiveSinger($slug)
    {
        return $this->createQueryBuilder('p')
            ->join('p.musics', 'm')
            ->where('p.slug = :slug')
            ->andWhere('m.status = true')
            ->setParameter('slug', $slug)
            ->getQuery()
            ->getSingleResult()
            ;
    }

    /**
     * @param $singer
     * @return mixed
     */
    public function findAllSingers($singer)
    {
        return $this->createQueryBuilder('p')
            ->join('p.activity', 'a')
            ->join('p.musics', 'm')
            ->where('a.slug = :singer')
            ->andWhere('m.status = true')
            ->setParameter('singer', $singer)
            ->getQuery()
            ->getResult()
            ;
    }

    /**
     * @param $letter
     * @return People[] Returns an array of People objects
     */
    public function findSingerByLetter($letter)
    {
        return $this->createQueryBuilder('p')
            ->join('p.musics','m')
            ->where('p.slug like :letter')
            ->andWhere('m.status = true')
            ->setParameter('letter', $letter . '%')
            ->orderBy('p.firstName', 'ASC')
            ->getQuery()
            ->getResult()
            ;
    }


    /*
    public function findOneBySomeField($value): ?People
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
