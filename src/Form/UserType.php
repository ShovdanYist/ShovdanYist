<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Contracts\Translation\TranslatorInterface;

class UserType extends AbstractType
{
    private $translator;

    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username', TextType::class, [
                'label' => 'username'
            ])
            ->add('password', PasswordType::class, [
                'label' => 'password',
                'mapped' => false,
                'required' => false
            ])
            ->add('email', EmailType::class, [
                'label' => 'form.email'
            ])
            ->add('roles', ChoiceType::class, [
                'label' => 'roles',
                'choices' => [
                    'Пользователь' => 'ROLE_USER',
                    'Автор' => 'ROLE_AUTHOR',
                    'Модератор' => 'ROLE_MODER',
                    'Администратор' => 'ROLE_ADMIN',
                ],
                'multiple' => true,
                'attr' => [
                    'data-placeholder' => $this->translator->trans('select.roles')
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
