<?php

namespace MusicApp;

require_once 'MusicItem.php';
require_once 'GenreTrait.php';
require_once 'Song.php';

class Album extends MusicItem {
    use GenreTrait;

    private array $songs = [];

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
