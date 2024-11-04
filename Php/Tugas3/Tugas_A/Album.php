<?php

namespace MusicApp;

//include these file only once
require_once 'MusicItem.php';
require_once 'GenreTrait.php';
require_once 'Song.php';

class Album extends MusicItem {
    use GenreTrait;

    //initialize song
    private array $songs = [];

    //create an instance of song
    public function addSong(Song $song) {
        $this->songs[] = $song;
    }

    public function play(): string {
        return "Playing album '{$this->title}' by {$this->artist}.";
    }

    public function listSongs(): array {
        return $this->songs;
    }
}
