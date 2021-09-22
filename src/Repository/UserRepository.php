<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function findByKeyword($keyword, $orderBy = ['id' => 'DESC'], $limit = null, $offset = 0)
    {
        $qb = $this->createQueryBuilder('u');

        $qb ->join('u.profile','p')
            ->where('u.username LIKE :keyword')
            ->orWhere('p.fullname LIKE :keyword')
            ->orWhere('p.about LIKE :keyword')
            ->setParameter('keyword','%'. $keyword .'%')
        ;

        foreach ($orderBy as $key => $value) {
            $qb->orderBy('u.'.$key,$value);
        }

        $qb ->setMaxResults($limit)
            ->setFirstResult($offset);

        return $qb->getQuery()->getResult();
    }

    /**
     * @return int|mixed|string
     */
    public function findActionUsers()
    {
        $actionRoles = [
            'ROLE_POST_COMMENT_REMOVER',
            'ROLE_POST_EDITOR',
            'ROLE_POST_MODERATOR',
            'ROLE_PEOPLE_EDITOR',
            'ROLE_SONG_COMMENT_REMOVER',
            'ROLE_SONG_EDITOR',
            'ROLE_USER_BLOCKER'
        ];

        $qb = $this->createQueryBuilder('u');

        foreach ($actionRoles as $key => $role) {
            $qb->orWhere('u.roles LIKE :role' . $key)
               ->setParameter('role' . $key, '%'. $role .'%');
        }

        return $qb->getQuery()->getResult();
    }

    public function findByRole($role)
    {
        $qb = $this->createQueryBuilder('u');

        $qb->where('u.roles LIKE :role')
            ->orWhere('u.roles LIKE :owner')
            ->setParameter('role', '%'. $role .'%')
            ->setParameter('owner', '%ROLE_OWNER%');

        return $qb->getQuery()->getResult();
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     * @param UserInterface $user
     * @param string $newEncodedPassword
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function upgradePassword(UserInterface $user, string $newEncodedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
        }

        $user->setPassword($newEncodedPassword);
        $this->_em->persist($user);
        $this->_em->flush();
    }

    public function inviteesCount(User $user)
    {
        $date = (new \DateTime('now'))->modify('-3 day')->format('Y-m-d');

        $qb = $this->createQueryBuilder('u');

        $qb->where('u.status = true')
            ->andWhere('u.invitedBy = :invitedBy')
            ->setParameter('invitedBy',$user)
        ;

        return $qb->getQuery()->getResult();
    }

    // /**
    //  * @return User[] Returns an array of User objects
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
    public function findOneBySomeField($value): ?User
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
