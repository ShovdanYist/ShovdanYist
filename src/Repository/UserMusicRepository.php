<?php

namespace App\Repository;

use App\Entity\UserMusic;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method UserMusic|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserMusic|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserMusic[]    findAll()
 * @method UserMusic[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserMusicRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserMusic::class);
    }

    // /**
    //  * @return UserMusic[] Returns an array of UserMusic objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?UserMusic
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
