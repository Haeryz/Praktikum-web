<?php
// Traits for genre
namespace MusicApp;

trait GenreTrait {
    private string $genre;

    public function setGenre(string $genre) {
        $this->genre = $genre;
    }

    public function getGenre(): string {
        return $this->genre;
    }
}
