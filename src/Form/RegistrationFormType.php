<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class RegistrationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username', TextType::class, [
                'label' => 'form.username',
                'help' => 'form.username_help',
                'constraints' => [
                    new Length([
                        'min' => 8,
                        'max' => 28,
                        'minMessage' => 'form.username.min.length.message',
                        'maxMessage' => 'form.username.max.length.message'
                    ])
                ]
            ])
            ->add('email', EmailType::class, [
                'label' => 'form.email'
            ])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'invalid_message' => 'form.password.not.same',
                'second_options' => ['label' => 'form.confirm.password'],
                'first_options' => [
                    'label' => 'form.password',
                    'constraints' => [
                        new NotBlank([
                            'message' => 'form.password.is.empty',
                        ]),
                        new Length([
                            'min' => 6,
                            'max' => 80,
                            'minMessage' => 'form.password.min.length.message'
                        ]),
                    ]
                ]
            ])
            ->add('gender', ChoiceType::class, [
                'label' => 'form.gender',
                'mapped' => false,
                'expanded' => true,
                'label_attr' => ['class' => 'radio-custom'],
                'choices' => [
                    'form.gender.male' => 0,
                    'form.gender.female' => 1
                ],
                'constraints' => [
                    new NotBlank([
                        'message' => 'form.gender.required.message'
                    ])
                ]
            ])
            ->add('birthday', DateType::class, [
                'label' => 'birthday',
                'mapped' => false,
                'widget' => 'single_text',
                'constraints' => [
                    new NotBlank([
                        'message' => 'birthday.required'
                    ])
                ]
            ])
//            ->add('invitedBy', TextType::class, [
//                'label' => 'invited.by',
//                'help' => 'Тот кто вас пригласил',
//                'mapped' => false,
//                'required' => false
//            ])
//            ->add('agreeTerms', CheckboxType::class, [
//                'mapped' => false,
//                'label_attr' => ['class' => 'checkbox-custom'],
//                'constraints' => [
//                    new IsTrue([
//                        'message' => 'form.agree.terms.message',
//                    ])
//                ]
//            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
