<?php

namespace App\Form;

use App\Entity\Category;
use App\Entity\Music;
use App\Entity\Post;
use App\Repository\MusicRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Contracts\Translation\TranslatorInterface;
use Vich\UploaderBundle\Form\Type\VichImageType;

class PostType extends AbstractType
{
    private $translator;
    private $musics;
    private $user;

    public function __construct(Security $security, TranslatorInterface $translator, MusicRepository $musics)
    {
        $this->user = $security->getUser();
        $this->translator = $translator;
        $this->musics = $musics;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('imageFile', VichImageType::class, [
                'label' => 'image',
                'required' => false,
                'download_uri' => false,
                'image_uri' => false,
                'allow_delete' => false
            ])
            ->add('title', TextType::class, [
                'label' => 'heading',
                'constraints' => [
                    new Length([
                        'max' => 80,
                        'maxMessage' => 'form.max.message'
                    ])
                ]
            ])
            ->add('content', TextareaType::class, [
                'label' => 'article',
                'required' => false,
                'attr' => [
                    'class' => 'ckeditor',
                    'rows' => 9
                ],
                'constraints' => [
                    new Length([
                        'max' => 10000,
                        'maxMessage' => 'form.max.message'
                    ])
                ]
            ])
            ->add('categories', EntityType::class, [
                'label' => 'categories',
                'class' => Category::class,
                'multiple' => true,
                'required' => false,
                'choice_label' => 'title',
                'label_attr' => ['class' => 'checkbox-custom'],
                'attr' => [
                    'data-placeholder' => $this->translator->trans('select.categories'),
                    'class' => 'chosen'
                ]
            ])
            ->add('songs', EntityType::class, [
                'label' => 'music',
                'help' => 'music.help',
                'class' => Music::class,
                'required' => false,
                'multiple' => true,
                'choice_label' => 'FullTitle',
                'label_attr' => ['class' => 'checkbox-custom'],
                'choices' => ($options['playlist']) ? $this->musics->findUserPlaylist(['user'=>$this->user]) : null,
                'attr' => [
                    'data-placeholder' => $this->translator->trans('select.music'),
                    'class' => 'chosen'
                ]
            ])
            ->add('eventDate', DateType::class, [
                'help' => 'event.date.help',
                'label' => 'event.date',
                'required' => false,
                'widget' => 'single_text'
            ])
            ->add('moderation', CheckboxType::class, [
                'label' => 'send.for.moderation',
                'help' => 'send.for.moderation.help',
                'required' => false,
                'label_attr' => ['class' => 'switch-custom']
            ])
        ;

        if ($options['status']) {
            $builder
                ->add('status', ChoiceType::class, [
                    'label' => 'activated',
                    'choices' => [
                        'На модерации' => null,
                        'Опубликована' => true,
                        'Отклонена' => false
                    ],
                    'label_attr' => ['class' => 'switch-custom']
                ]);
        }
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Post::class,
            'playlist' => null,
            'status' => null
        ]);
    }
}
