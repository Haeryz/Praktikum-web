<?php

namespace MusicApp;

require_once 'MusicItem.php';
require_once 'GenreTrait.php';

class Song extends MusicItem {
    use GenreTrait;

    private int $duration; // in seconds

    //create music item constructor and constructor inheritance
    public function __construct(string $title, string $artist, int $duration) {
        parent::__construct($title, $artist);
        $this->duration = $duration;
    }

    public function play(): string {
        return "Playing song: '{$this->title}' by {$this->artist}.";
    }

    public function getDuration(): int {
        return $this->duration;
    }
}
