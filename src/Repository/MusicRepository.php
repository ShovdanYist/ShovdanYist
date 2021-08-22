<?php

namespace App\Repository;

use App\Entity\Music;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\Query\Expr;

/**
 * @method Music|null find($id, $lockMode = null, $lockVersion = null)
 * @method Music|null findOneBy(array $criteria, array $orderBy = null)
 * @method Music[]    findAll()
 * @method Music[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MusicRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Music::class);
    }

    public function findUserPlaylist($criteria, $orderBy = ['id' => 'DESC'], $limit = 10, $offset = 0)
    {
        $qb = $this->createQueryBuilder('m');

        foreach ($criteria as $property => $value) {
            if ($property == 'user') {
                $qb
                    ->join('m.userMusics', 'um')
                    ->join('um.user', 'u')
                    ->where('m.status = true')
                    ->andWhere('u = :' . $property . '')
                    ->setParameter($property,$value)
                ;
            } else {
                $qb ->andWhere('m.'. $property .' = :' . $property . '')
                    ->setParameter($property,$value)
                ;
            }
        }

        foreach ($orderBy as $key => $value) {
            $qb->orderBy('um.'.$key,$value);
        }

        $qb ->setMaxResults($limit)
            ->setFirstResult($offset);

        return $qb->getQuery()->getResult();
    }

    public function findRandom($limit = 20)
    {
        $count = $this->createQueryBuilder('m')
            ->select('COUNT(m)')
            ->getQuery()
            ->getSingleScalarResult();

        return $this->createQueryBuilder('m')
            ->setFirstResult(rand(0, $count - 7))
            ->where('m.status = true')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }

    public function findByDiscussed($criteria, $orderBy = ['id' => 'DESC'], $limit = 10, $offset = 0)
    {
        $date = (new \DateTime('now'))->modify('-3 day')->format('Y-m-d');

        $qb = $this->createQueryBuilder('m');

        $qb ->leftJoin('m.comments','c',Expr\Join::WITH,'c.publishedAt > \'' . $date . '\'')
            ->groupBy('m')
            ->orderBy('COUNT(c.id)','DESC')
        ;

        foreach ($criteria as $property => $value) {
            $qb ->andWhere('m.'. $property .' = :' . $property . '')
                ->setParameter($property,$value)
            ;
        }

        $qb ->setMaxResults($limit)
            ->setFirstResult($offset);

        return $qb->getQuery()->getResult();
    }

    public function findByGenre($criteria, $orderBy = ['id' => 'DESC'], $limit = 10, $offset = 0)
    {
        $qb = $this->createQueryBuilder('m');

        foreach ($criteria as $property => $value) {
            if ($property == 'genre') {
                $qb ->leftJoin('m.genre', 'g')
                    ->where('g = :' . $property . '')
                    ->andWhere('m.status = true')
                    ->setParameter($property,$value)
                ;
            } else {
                $qb ->andWhere('m.'. $property .' = :' . $property . '')
                    ->setParameter($property,$value)
                ;
            }
        }

        foreach ($orderBy as $key => $value) {
            $qb->orderBy('m.'.$key,$value);
        }

        $qb ->setMaxResults($limit)
            ->setFirstResult($offset);

        return $qb->getQuery()->getResult();
    }

    public function findByTheme($criteria, $orderBy = ['id' => 'DESC'], $limit = 10, $offset = 0)
    {
        $qb = $this->createQueryBuilder('m');

        foreach ($criteria as $property => $value) {
            if ($property == 'theme') {
                $qb ->leftJoin('m.theme', 't')
                    ->where('t = :' . $property . '')
                    ->andWhere('m.status = true')
                    ->setParameter($property,$value)
                ;
            } else {
                $qb ->andWhere('m.'. $property .' = :' . $property . '')
                    ->setParameter($property,$value)
                ;
            }
        }

        foreach ($orderBy as $key => $value) {
            $qb->orderBy('m.'.$key,$value);
        }

        $qb ->setMaxResults($limit)
            ->setFirstResult($offset);

        return $qb->getQuery()->getResult();
    }

    public function findFeaturingCount($artist)
    {
        return $this->createQueryBuilder('m')
            ->select('COUNT(m.id)')
            ->join('m.artist','a')
            ->join('m.featuring', 'f')
            ->where('a = :artist')
            ->andWhere('m.status = true')
            ->setParameter('artist', $artist)
            ->groupBy('m.id')
            ->getQuery()
            ->getResult()
            ;
    }

    /*
    public function findOneBySomeField($value): ?Music
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
