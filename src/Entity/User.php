<?php

namespace App\Entity;

use App\Validator\Constraints\BlockedEmail;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ORM\HasLifecycleCallbacks()
 * @UniqueEntity("username", message="forn.username.already.exists")
 * @BlockedEmail("email")
 * @UniqueEntity("email", message="forn.email.already.exists")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\NotBlank(message="username.not_blank")
     * @Assert\Regex(
     *     pattern     = "/^[a-z1-9._]+$/i",
     *     htmlPattern = "^[a-zA-Z1-9._]+$",
     *     message     = "forn.username.can.consist.symbols"
     * )
     */
    private $username;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @var DateTime
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $passwordRequestedAt;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Assert\Email(message="form.its.not.an.email")
     * @Assert\NotBlank(message="email.not_blank")
     */
    private $email;

    /**
     * @var string
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $token;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Profile", inversedBy="user", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $profile;

    /**
     * @ORM\OneToMany(targetEntity=Song::class, mappedBy="author")
     */
    private $songs;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Comment", mappedBy="author", orphanRemoval=true)
     */
    private $comments;

    /**
     * @ORM\OneToMany(targetEntity=PlaylistSong::class, mappedBy="user", orphanRemoval=true)
     */
    private $playlistSongs;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Comment", mappedBy="replyTo", orphanRemoval=true)
     */
    private $replies;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Notification", mappedBy="receiver", orphanRemoval=true)
     */
    private $notifications;

    /**
     * @ORM\OneToMany(targetEntity=Article::class, mappedBy="author", orphanRemoval=true)
     */
    private $articles;

    /**
     * @ORM\OneToMany(targetEntity=Bookmark::class, mappedBy="user", orphanRemoval=true)
     */
    private $bookmarks;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $status;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $confirmedEmail;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="invitees")
     */
    private $invitedBy;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="invitedBy")
     */
    private $invitees;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $registeredAt;

    /**
     * @ORM\OneToMany(targetEntity=Action::class, mappedBy="moderator", orphanRemoval=true)
     */
    private $actions;

    /**
     * @ORM\OneToMany(targetEntity=Action::class, mappedBy="user", orphanRemoval=true)
     */
    private $remarks;

    public function __construct()
    {
        $this->songs = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->playlistSongs = new ArrayCollection();
        $this->replies = new ArrayCollection();
        $this->notifications = new ArrayCollection();
        $this->articles = new ArrayCollection();
        $this->bookmarks = new ArrayCollection();
        $this->invitees = new ArrayCollection();
        $this->actions = new ArrayCollection();
        $this->remarks = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(?string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(?string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get passwordRequestedAt
     */
    public function getPasswordRequestedAt(): DateTime
    {
        return $this->passwordRequestedAt;
    }

    /**
     * Set passwordRequestedAt
     * @param $passwordRequestedAt
     * @return User
     */
    public function setPasswordRequestedAt($passwordRequestedAt): User
    {
        $this->passwordRequestedAt = $passwordRequestedAt;
        return $this;
    }

    /**
     * Get token
     */
    public function getToken(): string
    {
        return $this->token;
    }

    /**
     * Set token
     * @param $token
     * @return User
     */
    public function setToken($token): User
    {
        $this->token = $token;
        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getProfile(): ?Profile
    {
        return $this->profile;
    }

    public function setProfile(Profile $profile): self
    {
        $this->profile = $profile;

        return $this;
    }

    /**
     * @return Collection|Song[]
     */
    public function getSongs(): Collection
    {
        return $this->songs;
    }

    public function addSong(Song $song): self
    {
        if (!$this->songs->contains($song)) {
            $this->songs[] = $song;
            $song->setAuthor($this);
        }

        return $this;
    }

    public function removeSong(Song $song): self
    {
        if ($this->songs->contains($song)) {
            $this->songs->removeElement($song);
            // set the owning side to null (unless already changed)
            if ($song->getAuthor() === $this) {
                $song->setAuthor(null);
            }
        }

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
            $comment->setAuthor($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->contains($comment)) {
            $this->comments->removeElement($comment);
            // set the owning side to null (unless already changed)
            if ($comment->getAuthor() === $this) {
                $comment->setAuthor(null);
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
            $playlistSong->setUser($this);
        }

        return $this;
    }

    public function removePlaylistSong(PlaylistSong $playlistSong): self
    {
        if ($this->playlistSongs->contains($playlistSong)) {
            $this->playlistSongs->removeElement($playlistSong);
            // set the owning side to null (unless already changed)
            if ($playlistSong->getUser() === $this) {
                $playlistSong->setUser(null);
            }
        }

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @return Collection|Comment[]
     */
    public function getReplies(): Collection
    {
        return $this->replies;
    }

    public function addReply(Comment $reply): self
    {
        if (!$this->replies->contains($reply)) {
            $this->replies[] = $reply;
            $reply->setReplyTo($this);
        }

        return $this;
    }

    public function removeReply(Comment $reply): self
    {
        if ($this->replies->contains($reply)) {
            $this->replies->removeElement($reply);
            // set the owning side to null (unless already changed)
            if ($reply->getReplyTo() === $this) {
                $reply->setReplyTo(null);
            }
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
            $notification->setReceiver($this);
        }

        return $this;
    }

    public function removeNotification(Notification $notification): self
    {
        if ($this->notifications->contains($notification)) {
            $this->notifications->removeElement($notification);
            // set the owning side to null (unless already changed)
            if ($notification->getReceiver() === $this) {
                $notification->setReceiver(null);
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
            $article->setAuthor($this);
        }

        return $this;
    }

    public function removeArticle(Article $article): self
    {
        if ($this->articles->contains($article)) {
            $this->articles->removeElement($article);
            // set the owning side to null (unless already changed)
            if ($article->getAuthor() === $this) {
                $article->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Bookmark[]
     */
    public function getBookmarks(): Collection
    {
        return $this->bookmarks;
    }

    public function addBookmark(Bookmark $bookmark): self
    {
        if (!$this->bookmarks->contains($bookmark)) {
            $this->bookmarks[] = $bookmark;
            $bookmark->setUser($this);
        }

        return $this;
    }

    public function removeBookmark(Bookmark $bookmark): self
    {
        if ($this->bookmarks->contains($bookmark)) {
            $this->bookmarks->removeElement($bookmark);
            // set the owning side to null (unless already changed)
            if ($bookmark->getUser() === $this) {
                $bookmark->setUser(null);
            }
        }

        return $this;
    }

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(?bool $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getConfirmedEmail(): ?string
    {
        return $this->confirmedEmail;
    }

    public function setConfirmedEmail(?string $confirmedEmail): self
    {
        $this->confirmedEmail = $confirmedEmail;

        return $this;
    }

    public function getInvitedBy(): ?self
    {
        return $this->invitedBy;
    }

    public function setInvitedBy(?self $invitedBy): self
    {
        $this->invitedBy = $invitedBy;

        return $this;
    }

    /**
     * @return Collection|self[]
     */
    public function getInvitees(): Collection
    {
        return $this->invitees;
    }

    public function addInvitee(self $invitee): self
    {
        if (!$this->invitees->contains($invitee)) {
            $this->invitees[] = $invitee;
            $invitee->setInvitedBy($this);
        }

        return $this;
    }

    public function removeInvitee(self $invitee): self
    {
        if ($this->invitees->contains($invitee)) {
            $this->invitees->removeElement($invitee);
            // set the owning side to null (unless already changed)
            if ($invitee->getInvitedBy() === $this) {
                $invitee->setInvitedBy(null);
            }
        }

        return $this;
    }

    public function getRegisteredAt(): ?\DateTimeInterface
    {
        return $this->registeredAt;
    }

    public function setRegisteredAt(\DateTimeInterface $registeredAt): self
    {
        $this->registeredAt = $registeredAt;

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
            $action->setModerator($this);
        }

        return $this;
    }

    public function removeAction(Action $action): self
    {
        if ($this->actions->contains($action)) {
            $this->actions->removeElement($action);
            // set the owning side to null (unless already changed)
            if ($action->getModerator() === $this) {
                $action->setModerator(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Action[]
     */
    public function getRemarks(): Collection
    {
        return $this->remarks;
    }

    public function addRemark(Action $remark): self
    {
        if (!$this->remarks->contains($remark)) {
            $this->remarks[] = $remark;
            $remark->setUser($this);
        }

        return $this;
    }

    public function removeRemark(Action $remark): self
    {
        if ($this->remarks->contains($remark)) {
            $this->remarks->removeElement($remark);
            // set the owning side to null (unless already changed)
            if ($remark->getUser() === $this) {
                $remark->setUser(null);
            }
        }

        return $this;
    }
}
