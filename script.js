document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const playBtn = document.querySelector('.play');
    const prevBtn = document.querySelector('.previous');
    const nextBtn = document.querySelector('.next');
    const shuffleBtn = document.querySelector('.shuffle');
    const repeatBtn = document.querySelector('.repeat');
    const progressBar = document.querySelector('.progress');
    const volumeBar = document.querySelector('.volume-level');
    const songCards = document.querySelectorAll('.song-card');
    const playlistCards = document.querySelectorAll('.playlist-card');
    const navItems = document.querySelectorAll('.nav li');

    // Audio Element
    const audio = new Audio();

    // Mock songs data
    const songs = [{
        title: 'Sollu Nee I Love You',
        artist: 'Nandeesh', // You can change this if you know the artist
        cover: 'https://source.unsplash.com/random/100x100/?love,song',
        file: 'solu-nee-i-love-u-6062.mp3'
    }];
    // Player state
    let currentSongIndex = 0;
    let isPlaying = false;
    let isShuffled = false;
    let isRepeated = false;

    // Initialize player
    function loadSong(index) {
        const song = songs[index];
        audio.src = song.file;

        // Update UI
        document.querySelector('.song-info img').src = song.cover;
        document.querySelector('.song-details h4').textContent = song.title;
        document.querySelector('.song-details p').textContent = song.artist;

        if (isPlaying) {
            audio.play();
        }
    }

    // Play/Pause toggle
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }

    // Next song
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
    }

    // Previous song
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
    }

    // Update progress bar
    function updateProgress() {
        const { currentTime, duration } = audio;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;

        // Update time display
        document.querySelector('.time-start').textContent = formatTime(currentTime);
        document.querySelector('.time-end').textContent = formatTime(duration);
    }

    // Format time (seconds to MM:SS)
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Set progress bar on click
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    // Set volume
    function setVolume(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const volume = clickX / width;
        audio.volume = volume;
        volumeBar.style.width = `${volume * 100}%`;
    }

    // Toggle shuffle
    function toggleShuffle() {
        isShuffled = !isShuffled;
        shuffleBtn.style.color = isShuffled ? '#1DB954' : '#b3b3b3';
    }

    // Toggle repeat
    function toggleRepeat() {
        isRepeated = !isRepeated;
        repeatBtn.style.color = isRepeated ? '#1DB954' : '#b3b3b3';
        audio.loop = isRepeated;
    }

    // Event Listeners
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    shuffleBtn.addEventListener('click', toggleShuffle);
    repeatBtn.addEventListener('click', toggleRepeat);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
        if (!isRepeated) {
            nextSong();
        }
    });

    document.querySelector('.progress-bar').addEventListener('click', setProgress);
    document.querySelector('.volume-bar').addEventListener('click', setVolume);

    // Song card click events
    songCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentSongIndex = index % songs.length; // Cycle through available songs
            loadSong(currentSongIndex);
            if (!isPlaying) {
                togglePlay();
            }
        });
    });

    // Playlist card click events
    playlistCards.forEach(card => {
        card.addEventListener('click', () => {
            // In a real app, this would load the playlist
            alert('Playlist selected! This would load the playlist in a real app.');
        });
    });

    // Nav item click events
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Initialize with first song
    loadSong(currentSongIndex);
});