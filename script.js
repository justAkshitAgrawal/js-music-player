const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// Song Object
const songs = [
  {
    name: "jacinto-1",
    displayName: "Random #1",
    artist: "IDK",
  },
  {
    name: "jacinto-2",
    displayName: "Random #2",
    artist: "IDK",
  },
  {
    name: "jacinto-3",
    displayName: "Random #3",
    artist: "IDK",
  },
  {
    name: "metric-1",
    displayName: "Random #4",
    artist: "IDK",
  },
];

// Boolean for play / pause
let isPlaying = false;

// Play Function

function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play-circle", "fa-pause-circle");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause-circle", "fa-play-circle");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Play / Pause

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

let currentSong = 0;

function nextSong() {
  currentSong++;

  if (currentSong > songs.length - 1) {
    currentSong = 0;
  }
  loadSong(songs[currentSong]);
  playSong();
}

function prevSong() {
  currentSong--;
  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }
  loadSong(songs[currentSong]);
  playSong();
}

function updateProgressBar(e) {
  if (isPlaying) {
    // console.log(e);
    const { duration, currentTime } = e.srcElement;

    // // Progress Bar Update
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    //Duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  //   console.log(width, clickX);

  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

loadSong(songs[currentSong]);

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
music.addEventListener("ended", nextSong);
