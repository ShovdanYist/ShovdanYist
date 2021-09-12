<?php

namespace App\Entity;

use DateTime;
use Exception;
use Cocur\Slugify\Slugify;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\Repository\SongRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Validator\Constraints as MyAssert;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * @ORM\Entity(repositoryClass=SongRepository::class)
 * @ORM\HasLifecycleCallbacks()
 * @MyAssert\UniqueSong()
 * @Vich\Uploadable
 */
class Song
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank()
     * @Assert\Type("string")
     */
    private $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Assert\Type("string")
     */
    private $lyrics;

    /**
     * @Vich\UploadableField(mapping="vocalist_songs", fileNameProperty="audio")
     * @Assert\File(mimeTypes={"audio/mpeg","audio/mp4","audio/vnd.wav", "audio/x-aiff"}, mimeTypesMessage="audio.have.to.be.jpg.or.png")
     * @var File|null
     */
    private $audioFile;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $audio;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Assert\Date()
     */
    private $releaseDate;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Assert\DateTime()
     */
    private $publicationDate;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Assert\DateTime()
     */
    private $editingDate;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Assert\Type("bool")
     */
    private $featured;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Assert\Type("bool")
     */
    private $status;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Type("string")
     */
    private $slug;

    /**
     * @ORM\ManyToOne(targetEntity=Person::class, inversedBy="songs")
     */
    private $vocalist;

    /**
     * @ORM\ManyToMany(targetEntity=Person::class, inversedBy="featuring")
     */
    private $featuring;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $views;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="songs")
     */
    private $author;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Comment", mappedBy="song", orphanRemoval=true)
     */
    private $comments;

    /**
     * @ORM\OneToMany(targetEntity=PlaylistSong::class, mappedBy="song", orphanRemoval=true)
     */
    private $playlistSongs;

    /**
     * @ORM\ManyToMany(targetEntity=Article::class, mappedBy="songs")
     */
    private $articles;

    /**
     * @ORM\OneToMany(targetEntity=Notification::class, mappedBy="song")
     */
    private $notifications;

    /**
     * @ORM\ManyToMany(targetEntity=Tag::class, inversedBy="songs")
     */
    private $tags;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $translation;

    /**
     * @ORM\OneToMany(targetEntity=Action::class, mappedBy="song", orphanRemoval=true)
     */
    private $actions;

    public function __construct()
    {
        $this->featuring = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->playlistSongs = new ArrayCollection();
        $this->articles = new ArrayCollection();
        $this->notifications = new ArrayCollection();
        $this->tags = new ArrayCollection();
        $this->actions = new ArrayCollection();
    }

    public function getFullTitle(): string
    {
        ($this->vocalist) ? $fullName = $this->vocalist->getFullName() . ' - ' : $fullName = '';
        return $fullName . $this->getTitle();
    }

    /**
     * @param File|UploadedFile|null $audioFile
     * @throws Exception
     */
    public function setAudioFile(?File $audioFile = null): void
    {
        $this->audioFile = $audioFile;

        if (null !== $audioFile) {
            $this->editingDate = new \DateTimeImmutable();
        }
    }

    public function getAudioFile(): ?File
    {
        return $this->audioFile;
    }

    /**
     * Initialise un slug automatique
     * @ORM\PrePersist()
     * @ORM\PreUpdate()
     */
    public function initializeSlug()
    {
        $slugifier = new Slugify();
        $vocalist = '';
        if ($this->getVocalist()){
            $Vocalist = $this->getVocalist()->getFullName() . ' ';
        }

        $this->slug = $slugifier->slugify($vocalist . $this->title);
    }

    /**
     * Initialise une date de modification automatique
     * @ORM\PrePersist()
     * @ORM\PreUpdate()
     */
    public function initializeEditingDate()
    {
        $this->editingDate = new DateTime('now');
    }

    /**
     * Initialise une date de publiction automatique
     * @ORM\PrePersist()
     */
    public function initializePublicationDate()
    {
        $this->publicationDate = new DateTime('now');
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getLyrics(): ?string
    {
        return $this->lyrics;
    }

    public function setLyrics(?string $lyrics): self
    {
        $this->lyrics = $lyrics;

        return $this;
    }

    public function getAudio(): ?string
    {
        return $this->audio;
    }

    public function setAudio(?string $audio): self
    {
        $this->audio = $audio;

        return $this;
    }

    public function getReleaseDate(): ?\DateTimeInterface
    {
        return $this->releaseDate;
    }

    public function setReleaseDate(?\DateTimeInterface $releaseDate): self
    {
        $this->releaseDate = $releaseDate;

        return $this;
    }

    public function getPublicationDate(): ?\DateTimeInterface
    {
        return $this->publicationDate;
    }

    public function setPublicationDate(?\DateTimeInterface $publicationDate): self
    {
        $this->publicationDate = $publicationDate;

        return $this;
    }

    public function getEditingDate(): ?\DateTimeInterface
    {
        return $this->editingDate;
    }

    public function setEditingDate(?\DateTimeInterface $editingDate): self
    {
        $this->editingDate = $editingDate;

        return $this;
    }

    public function getFeatured(): ?bool
    {
        return $this->featured;
    }

    public function setFeatured(?bool $featured): self
    {
        $this->featured = $featured;

        return $this;
    }

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getVocalist(): ?Person
    {
        return $this->vocalist;
    }

    public function setVocalist(?Person $vocalist): self
    {
        $this->vocalist = $vocalist;

        return $this;
    }

    /**
     * @return Collection|Person[]
     */
    public function getFeaturing(): Collection
    {
        return $this->featuring;
    }

    public function addFeaturing(Person $featuring): self
    {
        if (!$this->featuring->contains($featuring)) {
            $this->featuring[] = $featuring;
        }

        return $this;
    }

    public function removeFeaturing(Person $featuring): self
    {
        if ($this->featuring->contains($featuring)) {
            $this->featuring->removeElement($featuring);
        }

        return $this;
    }

    public function getViews(): ?int
    {
        return $this->views;
    }

    public function setViews(?int $views): self
    {
        $this->views = $views;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

        return $this;
    }

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setSong($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->contains($comment)) {
            $this->comments->removeElement($comment);
            // set the owning side to null (unless already changed)
            if ($comment->getSong() === $this) {
                $comment->setSong(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|PlaylistSong[]
     */
    public function getPlaylistSongs(): Collection
    {
        return $this->playlistSongs;
    }

    public function addPlaylistSong(PlaylistSong $playlistSong): self
    {
        if (!$this->playlistSongs->contains($playlistSong)) {
            $this->playlistSongs[] = $playlistSong;
            $playlistSong->setSong($this);
        }

        return $this;
    }

    public function removePlaylistSong(PlaylistSong $playlistSong): self
    {
        if ($this->playlistSongs->contains($playlistSong)) {
            $this->playlistSongs->removeElement($playlistSong);
            // set the owning side to null (unless already changed)
            if ($playlistSong->getSong() === $this) {
                $playlistSong->setSong(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Article[]
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): self
    {
        if (!$this->articles->contains($article)) {
            $this->articles[] = $article;
            $article->addSong($this);
        }

        return $this;
    }

    public function removeArticle(Article $article): self
    {
        if ($this->articles->contains($article)) {
            $this->articles->removeElement($article);
            $article->removeSong($this);
        }

        return $this;
    }

    /**
     * @return Collection|Notification[]
     */
    public function getNotifications(): Collection
    {
        return $this->notifications;
    }

    public function addNotification(Notification $notification): self
    {
        if (!$this->notifications->contains($notification)) {
            $this->notifications[] = $notification;
            $notification->setSong($this);
        }

        return $this;
    }

    public function removeNotification(Notification $notification): self
    {
        if ($this->notifications->contains($notification)) {
            $this->notifications->removeElement($notification);
            // set the owning side to null (unless already changed)
            if ($notification->getSong() === $this) {
                $notification->setSong(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Tag[]
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tag $tag): self
    {
        if (!$this->tags->contains($tag)) {
            $this->tags[] = $tag;
        }

        return $this;
    }

    public function removeTag(Tag $tag): self
    {
        if ($this->tags->contains($tag)) {
            $this->tags->removeElement($tag);
        }

        return $this;
    }

    public function getTranslation(): ?string
    {
        return $this->translation;
    }

    public function setTranslation(?string $translation): self
    {
        $this->translation = $translation;

        return $this;
    }

    /**
     * @return Collection|Action[]
     */
    public function getActions(): Collection
    {
        return $this->actions;
    }

    public function addAction(Action $action): self
    {
        if (!$this->actions->contains($action)) {
            $this->actions[] = $action;
            $action->setSong($this);
        }

        return $this;
    }

    public function removeAction(Action $action): self
    {
        if ($this->actions->contains($action)) {
            $this->actions->removeElement($action);
            // set the owning side to null (unless already changed)
            if ($action->getSong() === $this) {
                $action->setSong(null);
            }
        }

        return $this;
    }
}
