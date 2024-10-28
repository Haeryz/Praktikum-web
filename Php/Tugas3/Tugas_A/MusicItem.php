<?php
// Abstract class MusicItem
namespace MusicApp;

abstract class MusicItem {
    protected string $title;
    protected string $artist;

    public function __construct(string $title, string $artist) {
        $this->title = $title;
        $this->artist = $artist;
    }

    // Abstract method to be implemented in derived classes
    abstract public function play(): string;

    // Magic method __toString to return details of the music item
    public function __toString(): string {
        return "Title: {$this->title}, Artist: {$this->artist}";
    }
}
