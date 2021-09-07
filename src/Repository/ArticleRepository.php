<?php

namespace App\Repository;

use App\Entity\Article;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Article|null find($id, $lockMode = null, $lockVersion = null)
 * @method Article|null findOneBy(array $criteria, array $orderBy = null)
 * @method Article[]    findAll()
 * @method Article[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ArticleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Article::class);
    }

    public function findUserBookmarks($criteria, $orderBy = ['id' => 'DESC'], $limit = 10, $offset = 0)
    {
        $qb = $this->createQueryBuilder('a');

        foreach ($criteria as $property => $value) {
            if ($property == 'user') {
                $qb
                    ->join('a.bookmarks', 'b')
                    ->join('b.user', 'u')
                    ->where('a.status = true')
                    ->andWhere('u = :' . $property . '')
                    ->setParameter($property,$value)
                ;
            } else {
                // TODO: Не понятно что такое "m" (Музыка?)
                $qb ->andWhere('m.'. $property .' = :' . $property . '')
                    ->setParameter($property,$value)
                ;
            }
        }

        foreach ($orderBy as $key => $value) {
            $qb->orderBy('b.'.$key,$value);
        }

        $qb ->setMaxResults($limit)
            ->setFirstResult($offset);

        return $qb->getQuery()->getResult();
    }

    public function findArticles($criteria = [], $orderBy = ['id' => 'DESC'], $limit = 10, $offset = 0)
    {
        $qb = $this->createQueryBuilder('a');

        foreach ($criteria as $key => $value) {
            if ($key == 'tag') {
                $qb ->join('a.tags', 't')
                    ->andWhere('t.slug = :' . $key . '')
                    ->setParameter($key,$value->getSlug())
                ;
            } else {
                $qb->andWhere('a.'. $key .' = :' . $key . '')
                    ->setParameter($key,$value)
                ;
            }
        }

        foreach ($orderBy as $key => $value) {
            $qb->orderBy('a.'. $key, $value);
        }

        $qb ->setMaxResults($limit)
            ->setFirstResult($offset);

        return $qb->getQuery()->getResult();
    }

    // /**
    //  * @return Article[] Returns an array of Article objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Article
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
