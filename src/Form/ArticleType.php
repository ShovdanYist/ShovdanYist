<?php

namespace App\Form;

use App\Entity\Song;
use App\Entity\Article;
use App\Entity\Tag;
use App\Repository\SongRepository;
use App\Repository\TagRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Contracts\Translation\TranslatorInterface;
use Vich\UploaderBundle\Form\Type\VichImageType;

class ArticleType extends AbstractType
{
    private $translator;
    private $musics;
    private $user;
    private $role;
    private $tags;

    public function __construct(Security $security, AuthorizationCheckerInterface $authorizationChecker, TranslatorInterface $translator, SongRepository $musics, TagRepository $tags)
    {
        $this->user = $security->getUser();
        $this->role = $authorizationChecker;
        $this->translator = $translator;
        $this->musics = $musics;
        $this->tags = $tags;
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
            ->add('tags', EntityType::class, [
                'label' => 'categories',
                'class' => Tag::class,
                'multiple' => true,
                'required' => false,
                'choice_label' => 'title',
                'choices' => $this->tags->findBy(['type' => 'article']),
                'label_attr' => ['class' => 'checkbox-custom'],
                'attr' => [
                    'data-placeholder' => $this->translator->trans('select.categories'),
                    'class' => 'chosen'
                ]
            ])
            ->add('songs', EntityType::class, [
                'label' => 'music',
                'help' => 'music.help',
                'class' => Song::class,
                'required' => false,
                'multiple' => true,
                'choice_label' => 'FullTitle',
                'label_attr' => ['class' => 'checkbox-custom'],
                'choices' => (!$this->role->isGranted('ROLE_ARTICLE_APPROVER') && !$this->role->isGranted('ROLE_ARTICLE_EDITOR')) ? $this->musics->findUserPlaylist(['user'=>$this->user]) : null,
                'attr' => [
                    'data-placeholder' => $this->translator->trans('select.music'),
                    'class' => 'chosen'
                ]
            ])
            ->add('eventDate', DateType::class, [
                'label' => 'event.date',
                'help' => 'event.date.help',
                'years' => range(date('Y')+100, date('Y')-1000),
                'required' => false,
                'widget' => 'choice',
                'format' => 'ddMMMyyyy',
                'placeholder' => [
                    'year' => 'Год',
                    'month' => 'Месяц',
                    'day' => 'День',
                ],
                'attr' => [
                    'class' => 'user-birthday'
                ]
            ])
            ->add('moderation', CheckboxType::class, [
                'label' => 'send.for.moderation',
                'help' => 'send.for.moderation.help',
                'required' => false,
                'label_attr' => ['class' => 'switch-custom']
            ])
        ;

        if ($this->role->isGranted('ROLE_ARTICLE_APPROVER')) {
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
            'data_class' => Article::class
        ]);
    }
}
