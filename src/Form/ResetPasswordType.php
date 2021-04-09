<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class ResetPasswordType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('current', PasswordType::class, [
                'label' => 'form.current.password',
                'mapped' => false
            ])
            ->add('new', RepeatedType::class, [
                'type' => PasswordType::class,
                'mapped' => false,
                'invalid_message' => 'form.password.not.same',
                'first_options' => [
                    'label' => 'form.new.password',
                    'constraints' => [
                        new NotBlank([
                            'message' => 'form.password.is.empty'
                        ]),
                        new Length([
                            'min' => 6,
                            'max' => 80,
                            'minMessage' =>  'form.password.min.length.message',
                            'maxMessage' => 'form.password.max.length.message'
                        ]),
                    ]
                ],
                'second_options' => ['label' => 'form.confirm.password']
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
