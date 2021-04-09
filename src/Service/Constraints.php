<?php

namespace App\Service;

use App\Repository\UserRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Contracts\Translation\TranslatorInterface;

class Constraints
{
    private $userRepo;
    private $getUser;
    private $translator;

    public function __construct(UserRepository $userRepo, Security $security, TranslatorInterface $translator)
    {
        $this->userRepo = $userRepo;
        $this->getUser = $security->getUser();
        $this->translator = $translator;
    }

    public function trans(string $id, array $parameters = [], string $domain = null, string $locale = null) {
        return $this->translator->trans($id, $parameters, $domain, $locale);
    }

    public function username($username)
    {
        $exist = $this->userRepo->findOneBy(['username' => $username]);
        $message = null;
        $status = false;

        // Constraints for username
        if (strlen($username) < 8 || strlen($username) > 28) {
            $message = $this->trans('forn.username.must.be.between');
        } elseif (preg_match('/^[a-z1-9._]+$/i', $username) == 0) {
            $message = $this->trans('forn.username.can.consist.symbols');
        } elseif ($exist) {
            $message = $this->trans('forn.username.already.exists') . ' "' . $username . '"';
        } else {
            $status = true;
        }

        // Skip constraints if this user already have this username
        ($exist === $this->getUser) ? $status = true : null ;

        return ['status' => $status, 'message' => $message];
    }
}
