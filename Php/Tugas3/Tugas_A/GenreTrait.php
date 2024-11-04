<?php
// Traits for genre
namespace MusicApp;

//setter and getter
trait GenreTrait {
    private string $genre;

    public function setGenre(string $genre) {
        $this->genre = $genre;
    }

    public function getGenre(): string {
        return $this->genre;
    }
}
