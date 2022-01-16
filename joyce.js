/** @format */

const innerContainer = document.getElementById('inner-container');
const main = document.getElementById('main');
const header = document.querySelector('h1');
const happyBirthday = document.getElementById('happy-birthday');
const birthdayImage = document.getElementById('birthday-image');
const birthdaySong = document.getElementById('birthday-song');

// Main!

let firstTimeScrollDown = true;
birthdaySong.pause(); // if using autoplay
let fromBottom;
// setTimeout(scrollTop, 1000); // this doesn't work w/out delay. W/out it, will stay where was before refreshed screen
window.addEventListener('load', ()=> {
  innerContainer.hidden=false; // gives cleaner load
  setTimeout(scrollTop,1000)
}); // not sure if this is better

// Event listeners

innerContainer.addEventListener('dblclick', doubleClick);
birthdayImage.addEventListener('mouseover', unMuteAndPlaySong);
birthdayImage.addEventListener('click', togglePlaySong);
document.addEventListener('scroll', moveBackgroundImage);

// Functions

function doubleClick() {
  //main.classList.toggle('dancing'); // Dancing script typeface
  console.log(fromBottom);
  document.location.reload(true);
}

function scrollTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function unMuteAndPlaySong() {
  unMuteSong();
  playSong();
}

function unMuteSong() {
  birthdaySong.muted = false;
}

function playSong() {
  birthdaySong.play();
}

function togglePlaySong() {
  if (birthdaySong.paused) birthdaySong.play(); else birthdaySong.pause();
}

function toggleMuteSong() {
  birthdaySong.muted = !birthdaySong.muted;
}

function moveBackgroundImage() {
// Toward bottom of screen, move background image up so can see the bottom of it
//
//console.log(window.innerHeight, window.pageYOffset, document.body.offsetHeight, document.body.scrollHeight);
  // 927, 0-2877, 1112
  // 625 0 4365 4365 at top
  // 625 3740 4365 4365 at bottom
  fromBottom = window.innerHeight + window.pageYOffset - document.body.scrollHeight;
  // fromBottom = document.body.clientHeight + window.pageYOffset - document.body.scrollHeight; // document.body.clientHeight is 4365 when window.innerHeight is 625
  let newPos;
  // if (fromBottom > -30) {
  //   newPos = 'bottom';
  // } else if (fromBottom > -300) {
  //   newPos = 'center';
  // } else {
  //   newPos = 'top';
  // }
  // more continuous, but might be smoother if checked less often...
  if (fromBottom > -800 && firstTimeScrollDown) {
    // console.log("unMute on Scroll Down");
    unMuteAndPlaySong();
    firstTimeScrollDown = false;
  }
  if (fromBottom < -300)
    newPos = 'top';
    else {
      newPos = `0 ${-300-fromBottom}px`;
    }
  innerContainer.style.backgroundPosition = newPos;
}

/*
They say:

window.innerHeight == Total height of browser window
window.scrollY == pageYOffset == Distance from top of page user has scrolled
document.body.offsetHeight == Height of everything in the body, including what is not within view
(all in px)

But for some reason, the above isn't working for me. Getting smallish number (e.g. 1112) for document.body.offsetHeight">
document.body.scrollHeight, however, is more like 3804, and that works.
LATER they were the same.
*/
