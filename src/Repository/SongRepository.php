<?php

namespace App\Repository;

use App\Entity\Song;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\Query\Expr;

/**
 * @method Song|null find($id, $lockMode = null, $lockVersion = null)
 * @method Song|null findOneBy(array $criteria, array $orderBy = null)
 * @method Song[]    findAll()
 * @method Song[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SongRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Song::class);
    }

    public function findUserPlaylist($criteria, $orderBy = ['id' => 'DESC'], $limit = 10, $offset = 0)
    {
        $qb = $this->createQueryBuilder('s');

        foreach ($criteria as $property => $value) {
            if ($property == 'user') {
                $qb
                    ->join('s.userMusics', 'us')
                    ->join('us.user', 'u')
                    ->where('s.status = true')
                    ->andWhere('u = :' . $property . '')
                    ->setParameter($property,$value)
                ;
            } else {
                $qb ->andWhere('s.'. $property .' = :' . $property . '')
                    ->setParameter($property,$value)
                ;
            }
        }

        foreach ($orderBy as $key => $value) {
            $qb->orderBy('us.'.$key,$value);
        }

        $qb ->setMaxResults($limit)
            ->setFirstResult($offset);

        return $qb->getQuery()->getResult();
    }

    public function findRandom($limit = 20)
    {
        $count = $this->createQueryBuilder('s')
            ->select('COUNT(s)')
            ->getQuery()
            ->getSingleScalarResult();

        return $this->createQueryBuilder('s')
            ->setFirstResult(rand(0, $count - 7))
            ->where('s.status = true')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }

    public function findByDiscussed($criteria, $orderBy = null, $limit = null, $offset = 0)
    {
        $date = (new \DateTime('now'))->modify('-3 day')->format('Y-m-d');

        $qb = $this->createQueryBuilder('s');

        $qb ->leftJoin('s.comments','c',Expr\Join::WITH,'c.publishedAt > \'' . $date . '\'')
            ->groupBy('s')
            ->orderBy('COUNT(c.id)','DESC')
        ;

        foreach ($criteria as $property => $value) {
            $qb ->andWhere('s.'. $property .' = :' . $property . '')
                ->setParameter($property,$value)
            ;
        }

        $qb ->setMaxResults($limit)
            ->setFirstResult($offset);

        return $qb->getQuery()->getResult();
    }

    public function findByTag($criteria, $orderBy = ['id' => 'DESC'], $limit = 10, $offset = 0)
    {
        $qb = $this->createQueryBuilder('s');

        foreach ($criteria as $property => $value) {
            if ($property == 'tag') {
                $qb ->leftJoin('s.tags', 't')
                    ->where('t = :' . $property . '')
                    ->andWhere('s.status = true')
                    ->setParameter($property,$value)
                ;
            } else {
                $qb ->andWhere('s.'. $property .' = :' . $property . '')
                    ->setParameter($property,$value)
                ;
            }
        }

        foreach ($orderBy as $key => $value) {
            $qb->orderBy('s.'.$key,$value);
        }

        $qb ->setMaxResults($limit)
            ->setFirstResult($offset);

        return $qb->getQuery()->getResult();
    }

    public function findByGenre($criteria, $orderBy = ['id' => 'DESC'], $limit = 10, $offset = 0)
    {
        $qb = $this->createQueryBuilder('s');

        foreach ($criteria as $property => $value) {
            if ($property == 'genre') {
                $qb ->leftJoin('s.genre', 'g')
                    ->where('g = :' . $property . '')
                    ->andWhere('s.status = true')
                    ->setParameter($property,$value)
                ;
            } else {
                $qb ->andWhere('s.'. $property .' = :' . $property . '')
                    ->setParameter($property,$value)
                ;
            }
        }

        foreach ($orderBy as $key => $value) {
            $qb->orderBy('s.'.$key,$value);
        }

        $qb ->setMaxResults($limit)
            ->setFirstResult($offset);

        return $qb->getQuery()->getResult();
    }

    public function findByTheme($criteria, $orderBy = ['id' => 'DESC'], $limit = 10, $offset = 0)
    {
        $qb = $this->createQueryBuilder('s');

        foreach ($criteria as $property => $value) {
            if ($property == 'theme') {
                $qb ->leftJoin('s.theme', 't')
                    ->where('t = :' . $property . '')
                    ->andWhere('s.status = true')
                    ->setParameter($property,$value)
                ;
            } else {
                $qb ->andWhere('s.'. $property .' = :' . $property . '')
                    ->setParameter($property,$value)
                ;
            }
        }

        foreach ($orderBy as $key => $value) {
            $qb->orderBy('s.'.$key,$value);
        }

        $qb ->setMaxResults($limit)
            ->setFirstResult($offset);

        return $qb->getQuery()->getResult();
    }

    public function findFeaturingCount($artist)
    {
        return $this->createQueryBuilder('s')
            ->select('COUNT(s.id)')
            ->join('s.artist','a')
            ->join('s.featuring', 'f')
            ->where('a = :artist')
            ->andWhere('s.status = true')
            ->setParameter('artist', $artist)
            ->groupBy('s.id')
            ->getQuery()
            ->getResult()
            ;
    }

    /*
    public function findOneBySomeField($value): ?Song
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
