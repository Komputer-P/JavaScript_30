/* Get Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const fullScreen = player.querySelector('.full__screen');


video.defaultPlaybackRate = 1.0;
/* Build Functions */
function togglePlay(e) {
    if(video.paused) {
        console.log('video playing');
        video.play();
    } else {
        console.log('video pausing');
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skipVideo(e) {
    console.log(video.currentTime);
    video.currentTime += parseFloat(this.dataset.skip);

}

function handleRangeUpdate() {
    video[this.name] = this.value;
    console.log(this.name);
    console.log(this.value);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}

/* Hook up the event listeners */
video.addEventListener('click',togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click',togglePlay);

skipButtons.forEach(skipButton => skipButton.addEventListener('click',skipVideo));

ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

let mouseDown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e) => {
    if(mouseDown) {
        scrub(e);
    }
});
progress.addEventListener('mousedown',() => mouseDown = true);
progress.addEventListener('mouseup',() => mouseDown = false);

fullScreen.addEventListener('click', () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) { 
        video.msRequestFullscreen();
      }
});

