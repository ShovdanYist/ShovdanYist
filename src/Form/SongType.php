<?php

namespace App\Form;

use App\Entity\Genre;
use App\Entity\Song;
use App\Entity\People;
use App\Entity\Tag;
use App\Entity\Theme;
use App\Repository\PeopleRepository;
use App\Repository\TagRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Contracts\Translation\TranslatorInterface;
use Vich\UploaderBundle\Form\Type\VichFileType;

class SongType extends AbstractType
{
    private $people;
    private $translator;
    private $tags;

    public function __construct(TranslatorInterface $translator, PeopleRepository $peopleRepository, TagRepository $tags)
    {
        $this->translator = $translator;
        $this->people = $peopleRepository;
        $this->tags = $tags;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class, [
                'label' => 'title'
            ])
            ->add('audioFile', VichFileType::class, [
                'label' => 'music',
                'download_uri' => false,
                'allow_delete' => false,
                'required' => false
            ])
            ->add('lyrics', TextareaType::class, [
                'label' => 'lyrics',
                'required' => false,
                'attr' => [
                    'class' => 'ckeditor',
                    'rows' => 10
                ]
            ])
            ->add('translation', TextareaType::class, [
                'label' => 'translation',
                'required' => false,
                'attr' => [
                    'class' => 'ckeditor',
                    'rows' => 10
                ]
            ])
            ->add('releaseDate', DateType::class, [
                'label' => 'release.date',
                'required' => false,
                'widget' => 'single_text'
            ])
            ->add('featured', CheckboxType::class, [
                'label' => 'featured',
                'required' => false,
                'label_attr' => ['class' => 'switch-custom']
            ])
            ->add('status', CheckboxType::class, [
                'label' => 'activated',
                'required' => false,
                'label_attr' => ['class' => 'switch-custom']
            ])
            ->add('artist', EntityType::class, [
                'label' => 'artist',
                'class' => People::class,
                'choice_label' => 'fullName',
                'label_attr' => ['class' => 'checkbox-custom'],
                'choices' => $this->people->findByActivity('vocalist'),
                'attr' => [
                    'class' => 'chosen'
                ]
            ])
            ->add('featuring', EntityType::class, [
                'label' => 'featuring',
                'class' => People::class,
                'multiple' => true,
                'required' => false,
                'choice_label' => 'fullName',
                'label_attr' => ['class' => 'checkbox-custom'],
                'choices' => $this->people->findByActivity('vocalist'),
                'attr' => [
                    'data-placeholder' => $this->translator->trans('select.featuring'),
                    'class' => 'chosen'
                ]
            ])
            ->add('tags', EntityType::class, [
                'label' => 'tags',
                'class' => Tag::class,
                'required' => false,
                'multiple' => true,
                'choice_label' => 'title',
                'choices' => $this->tags->findBy(['type' => 'song']),
                'label_attr' => ['class' => 'checkbox-custom'],
                'attr' => [
                    'data-placeholder' => $this->translator->trans('select.tags'),
                    'class' => 'chosen'
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Song::class,
        ]);
    }
}
