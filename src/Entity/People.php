<?php

namespace App\Entity;

use Exception;
use Cocur\Slugify\Slugify;
use Doctrine\ORM\Mapping as ORM;
use App\Validator\Constraints as MyAssert;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\HttpFoundation\File\File;
use Doctrine\Common\Collections\ArrayCollection;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PeopleRepository")
 * @ORM\HasLifecycleCallbacks()
 * @MyAssert\UniquePeople()
 * @Vich\Uploadable
 */
class People
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
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\Type("string")
     */
    private $lastName;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Assert\Date()
     */
    private $birthDay;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Assert\Type("string")
     */
    private $biography;

    /**
     * @Vich\UploadableField(mapping="people_images", fileNameProperty="picture")
     * @Assert\File(mimeTypes={"image/jpeg","image/png","image/gif"}, mimeTypesMessage="image.have.to.be.jpg.or.png")
     * @var File|null
     */
    private $pictureFile;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\Type("string")
     */
    private $picture;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Assert\DateTime()
     */
    private $updatedAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Type("string")
     */
    private $slug;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Music", mappedBy="artist")
     */
    private $musics;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Activity", inversedBy="people")
     */
    private $activity;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Music", mappedBy="featuring")
     */
    private $featuring;

    public function __construct()
    {
        $this->musics = new ArrayCollection();
        $this->activity = new ArrayCollection();
        $this->featuring = new ArrayCollection();
    }

    /**
     * @ORM\PrePersist()
     * @ORM\PreUpdate()
     */
    public function initializeSlug()
    {
        $slugifier = new Slugify();
        $this->slug = $slugifier->slugify($this->getFullName());
    }

    /**
     * @param File|UploadedFile|null $pictureFile
     * @throws Exception
     */
    public function setPictureFile(?File $pictureFile = null): void
    {
        $this->pictureFile = $pictureFile;

        if (null !== $pictureFile) {
            $this->updatedAt = new \DateTimeImmutable();
        }
    }

    public function getPictureFile(): ?File
    {
        return $this->pictureFile;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFullName()
    {
        $space = ' ';
        if (empty($this->lastName)) {
            $space = '';
        }
        return $this->firstName . $space . $this->lastName;
    }

    public function getfirstName(): ?string
    {
        return $this->firstName;
    }

    public function setfirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getBirthDay(): ?\DateTimeInterface
    {
        return $this->birthDay;
    }

    public function setBirthDay(?\DateTimeInterface $birthDay): self
    {
        $this->birthDay = $birthDay;

        return $this;
    }

    public function getBiography(): ?string
    {
        return $this->biography;
    }

    public function setBiography(?string $biography): self
    {
        $this->biography = $biography;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): self
    {
        $this->picture = $picture;

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

    /**
     * @return Collection|Music[]
     */
    public function getMusics(): Collection
    {
        return $this->musics;
    }

    public function addMusic(Music $music): self
    {
        if (!$this->musics->contains($music)) {
            $this->musics[] = $music;
            $music->setArtist($this);
        }

        return $this;
    }

    public function removeMusic(Music $music): self
    {
        if ($this->musics->contains($music)) {
            $this->musics->removeElement($music);
            // set the owning side to null (unless already changed)
            if ($music->getArtist() === $this) {
                $music->setArtist(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Activity[]
     */
    public function getActivity(): Collection
    {
        return $this->activity;
    }

    public function addActivity(Activity $activity): self
    {
        if (!$this->activity->contains($activity)) {
            $this->activity[] = $activity;
        }

        return $this;
    }

    public function removeActivity(Activity $activity): self
    {
        if ($this->activity->contains($activity)) {
            $this->activity->removeElement($activity);
        }

        return $this;
    }

    /**
     * @return Collection|Music[]
     */
    public function getFeaturing(): Collection
    {
        return $this->featuring;
    }

    public function addFeaturing(Music $featuring): self
    {
        if (!$this->featuring->contains($featuring)) {
            $this->featuring[] = $featuring;
            $featuring->addFeaturing($this);
        }

        return $this;
    }

    public function removeFeaturing(Music $featuring): self
    {
        if ($this->featuring->contains($featuring)) {
            $this->featuring->removeElement($featuring);
            $featuring->removeFeaturing($this);
        }

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }
}
