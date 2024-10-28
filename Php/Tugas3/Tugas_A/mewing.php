<?php

require_once 'Song.php';
require_once 'Album.php';

use MusicApp\Song;
use MusicApp\Album;

// Test the Music Application
$song1 = new Song("Song A", "Artist X", 240);
$song1->setGenre("Pop");

$song2 = new Song("Song B", "Artist Y", 300);
$song2->setGenre("Rock");

$album = new Album("Album Z", "Artist X");
$album->setGenre("Alternative");

$album->addSong($song1);
$album->addSong($song2);

echo $song1->play() . PHP_EOL;
echo "Genre: " . $song1->getGenre() . PHP_EOL;
echo "Duration: " . $song1->getDuration() . " seconds" . PHP_EOL;

echo $album->play() . PHP_EOL;
echo "Genre: " . $album->getGenre() . PHP_EOL;
echo "Album Songs:" . PHP_EOL;
foreach ($album->listSongs() as $song) {
    echo "- " . $song . PHP_EOL;
}
