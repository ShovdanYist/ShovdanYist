<?php

namespace App\CustomAbstracts;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Contracts\Translation\TranslatorInterface;

class CustomAbstractController extends AbstractController
{
    private $translator;

    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    public function trans(string $id, array $parameters = [], string $domain = null, string $locale = null): string
    {
        return $this->translator->trans($id, $parameters, $domain, $locale);
    }

    public function user(): User
    {
        return $this->getDoctrine()->getRepository(User::class)->findOneBy(['username' => $this->getUser()->getUsername()]);
    }

    public function updateLastActivity()
    {
        if ($this->getUser()) {
            $em = $this->getDoctrine()->getManager();
            $this->user()->setLastActivityAt(new \DateTime('now'));
            $em->flush();
        }
    }
}
