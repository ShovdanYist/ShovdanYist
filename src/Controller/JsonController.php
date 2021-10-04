<?php

namespace App\Controller;

use App\CustomAbstracts\CustomAbstractController;
use App\Entity\Bookmark;
use App\Entity\PlaylistSong;
use App\Entity\Post;
use App\Entity\Song;
use App\Repository\PlaylistSongRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class JsonController extends CustomAbstractController
{
    /**
     * @Route("/songPlaylist/{slug}", name="song_playlist", methods={"POST", "GET"})
     * @param Song $song
     * @param UserRepository $userRepo
     * @param PlaylistSongRepository $playlistSongRepo
     * @return Response
     */
    public function playlist(Song $song, UserRepository $userRepo, PlaylistSongRepository $playlistSongRepo): Response
    {
        $user = $userRepo->findOneBy(['username' => $this->getUser()->getUsername()]);
        $contains = $playlistSongRepo->findOneBy(['user' => $user, 'song' => $song]);
        $em = $this->getDoctrine()->getManager();

        if ($contains) {
            $user->removePlaylistSong($contains);
            $response = ['status' => 'removed', 'title' => $this->trans('add.to.playlist'), 'message' => $this->trans('flash.removed.from.playlist')];
        } else {
            $playlistSong = new PlaylistSong();
            $playlistSong->setUser($user);
            $playlistSong->setSong($song);
            $em->persist($playlistSong);
            $response = ['status' => 'added', 'title' => $this->trans('remove.from.playlist'), 'message' => $this->trans('flash.added.to.playlist')];
        }

        $em->flush();

        return $this->json([
            'response' => $response
        ]);
    }

    /**
     * @Route("/postBookmark/{slug}", name="post_bookmark", methods={"POST", "GET"})
     * @param Post $post
     * @param UserRepository $users
     * @return JsonResponse
     */
    public function bookmark(Post $post, UserRepository $users): Response
    {
        $user = $users->findOneBy(['username' => $this->getUser()->getUsername()]);
        $contains = $this->getDoctrine()->getRepository(Bookmark::class)->findOneBy(['user' => $user, 'post' => $post]);
        $em = $this->getDoctrine()->getManager();

        if ($contains) {
            $user->removeBookmark($contains);
            $response = ['status' => 'removed'];
        } else {
            $bookmark = new Bookmark();
            $bookmark->setUser($user);
            $bookmark->setPost($post);
            $em->persist($bookmark);
            $response = ['status' => 'added'];
        }

        $em->flush();

        return $this->json([
            'response' => $response
        ]);
    }

    /**
     * @Route("/postFeatured/{slug}", name="post_featured", methods={"POST", "GET"})
     * @param Post $post
     * @return JsonResponse
     */
    public function featured(Post $post): Response
    {
        $em = $this->getDoctrine()->getManager();

        if ($post->getFeatured()) {
            $post->setFeatured(false);
            $response = ['status' => 'removed'];
        } else {
            $post->setFeatured(true);
            $response = ['status' => 'added'];
        }

        $em->flush();

        return $this->json([
            'response' => $response
        ]);
    }
}
