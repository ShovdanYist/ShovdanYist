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
 * @MyAssert\UniqueMusic()
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
     * @Vich\UploadableField(mapping="artist_songs", fileNameProperty="audio")
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
     * @ORM\ManyToOne(targetEntity="App\Entity\People", inversedBy="songs")
     */
    private $artist;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\People", inversedBy="featuring")
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
     * @ORM\OneToMany(targetEntity="App\Entity\Comment", mappedBy="song")
     */
    private $comments;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\UserMusic", mappedBy="song", orphanRemoval=true)
     */
    private $userMusics;

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

    public function __construct()
    {
        $this->featuring = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->userMusics = new ArrayCollection();
        $this->articles = new ArrayCollection();
        $this->notifications = new ArrayCollection();
        $this->tags = new ArrayCollection();
    }

    public function getFullTitle(): string
    {
        ($this->artist) ? $fullName = $this->artist->getFullName() . ' - ' : $fullName = '';
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
        $artist = '';
        if ($this->getArtist()){
            $artist = $this->getArtist()->getFullName() . ' ';
        }

        $this->slug = $slugifier->slugify($artist . $this->title);
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

    public function getArtist(): ?People
    {
        return $this->artist;
    }

    public function setArtist(?People $artist): self
    {
        $this->artist = $artist;

        return $this;
    }

    /**
     * @return Collection|People[]
     */
    public function getFeaturing(): Collection
    {
        return $this->featuring;
    }

    public function addFeaturing(People $featuring): self
    {
        if (!$this->featuring->contains($featuring)) {
            $this->featuring[] = $featuring;
        }

        return $this;
    }

    public function removeFeaturing(People $featuring): self
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
     * @return Collection|UserMusic[]
     */
    public function getUserMusics(): Collection
    {
        return $this->userMusics;
    }

    public function addUserMusic(UserMusic $userMusic): self
    {
        if (!$this->userMusics->contains($userMusic)) {
            $this->userMusics[] = $userMusic;
            $userMusic->setSong($this);
        }

        return $this;
    }

    public function removeUserMusic(UserMusic $userMusic): self
    {
        if ($this->userMusics->contains($userMusic)) {
            $this->userMusics->removeElement($userMusic);
            // set the owning side to null (unless already changed)
            if ($userMusic->getSong() === $this) {
                $userMusic->setSong(null);
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
}
