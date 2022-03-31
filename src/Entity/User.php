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
     *     pattern     = "/^[a-z0-9._]+$/i",
     *     htmlPattern = "^[a-zA-Z0-9._]+$",
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
     * @ORM\OneToMany(targetEntity=Notification::class, mappedBy="sender")
     */
    private $sentNotifications;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Notification", mappedBy="receiver", orphanRemoval=true)
     */
    private $receivedNotifications;

    /**
     * @ORM\OneToMany(targetEntity=Post::class, mappedBy="author", orphanRemoval=true)
     */
    private $posts;

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

    /**
     * @ORM\OneToMany(targetEntity=View::class, mappedBy="user", orphanRemoval=true)
     */
    private $views;

    /**
     * @ORM\OneToMany(targetEntity=Follow::class, mappedBy="follower", orphanRemoval=true)
     */
    private $following;

    /**
     * @ORM\OneToMany(targetEntity=Follow::class, mappedBy="followed", orphanRemoval=true)
     */
    private $followers;

    /**
     * @ORM\ManyToMany(targetEntity=Post::class, mappedBy="taggedUsers")
     */
    private $taggedPosts;

    /**
     * @ORM\OneToMany(targetEntity=Like::class, mappedBy="user", orphanRemoval=true)
     */
    private $likes;

    /**
     * @ORM\OneToMany(targetEntity=Message::class, mappedBy="sender", orphanRemoval=true)
     */
    private $sentMessages;

    /**
     * @ORM\OneToMany(targetEntity=Message::class, mappedBy="receiver", orphanRemoval=true)
     */
    private $receivedMessages;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $lastActivityAt;

    /**
     * @ORM\Column(type="boolean")
     */
    private $hideOnline;

    public function __construct()
    {
        $this->songs = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->playlistSongs = new ArrayCollection();
        $this->replies = new ArrayCollection();
        $this->sentNotifications = new ArrayCollection();
        $this->receivedNotifications = new ArrayCollection();
        $this->posts = new ArrayCollection();
        $this->bookmarks = new ArrayCollection();
        $this->invitees = new ArrayCollection();
        $this->actions = new ArrayCollection();
        $this->remarks = new ArrayCollection();
        $this->views = new ArrayCollection();
        $this->following = new ArrayCollection();
        $this->followers = new ArrayCollection();
        $this->taggedPosts = new ArrayCollection();
        $this->likes = new ArrayCollection();
        $this->sentMessages = new ArrayCollection();
        $this->receivedMessages = new ArrayCollection();
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
    public function getSentNotifications(): Collection
    {
        return $this->sentNotifications;
    }

    public function addSentNotification(Notification $sentNotification): self
    {
        if (!$this->sentNotifications->contains($sentNotification)) {
            $this->sentNotifications[] = $sentNotification;
            $sentNotification->setSender($this);
        }

        return $this;
    }

    public function removeSentNotification(Notification $sentNotification): self
    {
        if ($this->sentNotifications->contains($sentNotification)) {
            $this->sentNotifications->removeElement($sentNotification);
            // set the owning side to null (unless already changed)
            if ($sentNotification->getSender() === $this) {
                $sentNotification->setSender(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Notification[]
     */
    public function getReceivedNotifications(): Collection
    {
        return $this->receivedNotifications;
    }

    public function addReceivedNotification(Notification $receivedNotification): self
    {
        if (!$this->receivedNotifications->contains($receivedNotification)) {
            $this->receivedNotifications[] = $receivedNotification;
            $receivedNotification->setReceiver($this);
        }

        return $this;
    }

    public function removeReceivedNotification(Notification $receivedNotification): self
    {
        if ($this->receivedNotifications->contains($receivedNotification)) {
            $this->receivedNotifications->removeElement($receivedNotification);
            // set the owning side to null (unless already changed)
            if ($receivedNotification->getReceiver() === $this) {
                $receivedNotification->setReceiver(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Post[]
     */
    public function getPosts(): Collection
    {
        return $this->posts;
    }

    public function addPost(Post $post): self
    {
        if (!$this->posts->contains($post)) {
            $this->posts[] = $post;
            $post->setAuthor($this);
        }

        return $this;
    }

    public function removePost(Post $post): self
    {
        if ($this->posts->contains($post)) {
            $this->posts->removeElement($post);
            // set the owning side to null (unless already changed)
            if ($post->getAuthor() === $this) {
                $post->setAuthor(null);
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

    /**
     * @return Collection|View[]
     */
    public function getViews(): Collection
    {
        return $this->views;
    }

    public function addView(View $view): self
    {
        if (!$this->views->contains($view)) {
            $this->views[] = $view;
            $view->setUser($this);
        }

        return $this;
    }

    public function removeView(View $view): self
    {
        if ($this->views->contains($view)) {
            $this->views->removeElement($view);
            // set the owning side to null (unless already changed)
            if ($view->getUser() === $this) {
                $view->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Follow[]
     */
    public function getFollowers(): Collection
    {
        return $this->followers;
    }

    /**
     * @return Collection|Follow[]
     */
    public function getFollowing(): Collection
    {
        return $this->following;
    }

    public function removeFollow(Follow $follow): self
    {
        if ($this->following->contains($follow)) {
            $this->following->removeElement($follow);
        }

        return $this;
    }

    public function addFollow($followed): Follow
    {
        $follow = new Follow();
        $follow->setFollower($this);
        $follow->setFollowed($followed);

        return $follow;
    }

    /**
     * @return Collection|Post[]
     */
    public function getTaggedPosts(): Collection
    {
        return $this->taggedPosts;
    }

    public function addTaggedPost(Post $taggedPost): self
    {
        if (!$this->taggedPosts->contains($taggedPost)) {
            $this->taggedPosts[] = $taggedPost;
            $taggedPost->addUser($this);
        }

        return $this;
    }

    public function removeTaggedPost(Post $taggedPost): self
    {
        if ($this->taggedPosts->contains($taggedPost)) {
            $this->taggedPosts->removeElement($taggedPost);
            $taggedPost->removeUser($this);
        }

        return $this;
    }

    /**
     * @return Collection|Like[]
     */
    public function getLikes(): Collection
    {
        return $this->likes;
    }

    public function addLike(Like $like): self
    {
        if (!$this->likes->contains($like)) {
            $this->likes[] = $like;
            $like->setUser($this);
        }

        return $this;
    }

    public function removeLike(Like $like): self
    {
        if ($this->likes->contains($like)) {
            $this->likes->removeElement($like);
            // set the owning side to null (unless already changed)
            if ($like->getUser() === $this) {
                $like->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Message[]
     */
    public function getSentMessages(): Collection
    {
        return $this->sentMessages;
    }

    public function addSentMessage(Message $sentMessage): self
    {
        if (!$this->sentMessages->contains($sentMessage)) {
            $this->sentMessages[] = $sentMessage;
            $sentMessage->setSender($this);
        }

        return $this;
    }

    public function removeSentMessage(Message $sentMessage): self
    {
        if ($this->sentMessages->contains($sentMessage)) {
            $this->sentMessages->removeElement($sentMessage);
            // set the owning side to null (unless already changed)
            if ($sentMessage->getSender() === $this) {
                $sentMessage->setSender(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Message[]
     */
    public function getReceivedMessages(): Collection
    {
        return $this->receivedMessages;
    }

    public function addReceivedMessage(Message $receivedMessage): self
    {
        if (!$this->receivedMessages->contains($receivedMessage)) {
            $this->receivedMessages[] = $receivedMessage;
            $receivedMessage->setReceiver($this);
        }

        return $this;
    }

    public function removeReceivedMessage(Message $receivedMessage): self
    {
        if ($this->receivedMessages->contains($receivedMessage)) {
            $this->receivedMessages->removeElement($receivedMessage);
            // set the owning side to null (unless already changed)
            if ($receivedMessage->getReceiver() === $this) {
                $receivedMessage->setReceiver(null);
            }
        }

        return $this;
    }

    public function getLastActivityAt(): ?\DateTimeInterface
    {
        return $this->lastActivityAt;
    }

    public function setLastActivityAt(?\DateTimeInterface $lastActivityAt): self
    {
        $this->lastActivityAt = $lastActivityAt;

        return $this;
    }

    public function getHideOnline(): ?bool
    {
        return $this->hideOnline;
    }

    public function setHideOnline(bool $hideOnline): self
    {
        $this->hideOnline = $hideOnline;

        return $this;
    }
}
