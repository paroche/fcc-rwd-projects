/** @format */


const song = document.getElementById('song');
// const heartContainer = document.getElementById('svg-heart-container');
const container = document.getElementById('container');
const clickMessage = document.getElementById('click-me');
const heartContainer = document.getElementById('heart-container');
const heartInG = document.getElementById('heartInG');
const heartOutG = document.getElementById('heartOutG');
const svgCard = document.getElementById('svg-card');
const curvedMessage = document.getElementById('curved-message');
const lowerRText = document.getElementById('lowerRText');
const valHeart = document.getElementById('ValHeart');
const heartPath = window
  .getComputedStyle(document.documentElement)
  .getPropertyValue('--d');
const origPath = heartPath;
// Create Heart Path for little hearts going around and inside big heart
scalePath(heartPath, '--d', 5.1);
scalePath(heartPath, '--d2', 2);

//   'rgb(50,250,150)', // former green

const colors = [
  'red',
  'rgb(255,50,50)',
  'rgb(255,50,200)',
  'red',
  'rgb(255,100,100)',
  'rgb(75,75,255)',
  'red',
  'rgb(255,50,150)',
  'rgb(50,200,100)',
  'red',
  'rgb(255,50,200)',
];
const classNames = ['moving-heart', 'moving-heart', 'moving-heart-2', 'moving-heart-2'];
// let printed = false; // t

const startTime = Date.now();
let prevInterval = 0;
const hearts = 300;
const heartBeat = 1200;

window.addEventListener('load', () => {
  heartContainer.hidden = false; // gives cleaner load
  setTimeout(scrollTop, 1);
  setTimeout(unhideCurvedMessage, 2500);
  setTimeout(unhideCard, 5000);
  setTimeout(unhideLowerRText, 7500);
});


// ******** Create moving hearts ********

for (let i = 0; i < hearts; i++) {
  setTimeout(() => createHeart(i), createInterval(i));
}

//

function scalePath(path, pathVar, scale) {
  let pathArray = path.split(' ');
  pathArray.forEach((e, i) => {
    if (!isNaN(e)) {
      pathArray[i] = e * scale;
    }
  });
  pathArray.shift(); // for some reason was an element 0 added
  const newPath = pathArray.join(' ');
  document.documentElement.style.setProperty(pathVar, newPath);
}

function createInterval(i) {
  // total time before next element creation
  const p1 = 15,
    t1 = 100,
    p2 = 45,
    t2 = 300;
  let interval = prevInterval;
  if (i <= p1) {
    interval += t1;
  } else if (i < p2) {
    interval += t1 + t2 * (1 - (p2 - i) / (p2 - p1)); // gradual transition
  } else {
    interval += t2;
  }
  // console.log("(interval - prevInterval): ", (interval - prevInterval));
  prevInterval = interval;
  return interval;
}

function createHeart(id) {
  const color = colors[id % colors.length];
  const className = classNames[id % classNames.length];
  const tagString = svgHeart(color, className, id);
  const frag = document.createRange().createContextualFragment(tagString);
  // frag.classList.add('moving-heart'); // apparently this doesn't work
  heartContainer.appendChild(frag);
  const newHeart = document.getElementById(id);
  newHeart.classList.add('b');
  setTimeout(() => document.getElementById(id).remove(), 20000);
  if (id == Math.floor(hearts / 2)) setHeartInOutBeats(); // After half little heart created, set side hearts beating
  if (id == hearts - 1) fadeOutIn(); // When last heart made, set times to fade out, then fade back in
}

function svgHeart(color, className, id) {
  return `
<svg id=${id} class=${className} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="500" height="500" viewBox="0 0 500 500" xml:space="preserve">
<desc>Created with Fabric.js 4.6.0</desc>
<defs>
</defs>
<g transform="matrix(4.38 0 0 4.46 268.31 276.15)" id="MssjSHtxtHLVm4WHNMBiQ"  >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: ${color}; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(-44, -46)" d="M 60 4.346 C 71 4.346 80 13.973 80 25.738 C 80 58.45 40 74.762 40 75.65299999999999 L 40 75.65299999999999 C 40 74.763 0 58.54 0 25.738 C 0 13.884 9 4.346 20 4.346 C 31.1 4.346 40 10.835 40 22.689 C 40 10.835 48.9 4.346 60 4.346 z" stroke-linecap="round" />
</g>
</svg>
`;
}

function unhideCard() {
svgCard.classList.remove('hidden');
}
function unhideCurvedMessage() {
  curvedMessage.classList.remove('hidden');
}
function unhideLowerRText() {
  lowerRText.classList.remove('hidden');
}

// ******** Event Listeners ********

container.addEventListener('dblclick', toggleSong);
heartContainer.addEventListener('click', toggleSong);
heartContainer.addEventListener('click', toggleBeatInPlace);
heartContainer.addEventListener('click', hideClickMessage);

//

function setHeartInOutBeats() {
  const heartInGInterval = setInterval(
    () => toggleBeat(heartInG, heartBeat * 2.5, 1000),
    heartBeat
  );
  const heartOutGInterval = setInterval(
    () => toggleBeat(heartOutG, heartBeat * 2, 1000),
    heartBeat
  );
}

function fadeOutIn() {
  setTimeout(fadeOut, 30000);
  setTimeout(fadeIn, 50000);
}

function fadeOut() {
  heartContainer.classList.add('faded');
}

function fadeIn() {
  heartContainer.classList.remove('faded');
  heartContainer.addEventListener('click', () => location.reload());
}

function toggleSong() {
  song.muted = false;
  if (song.paused) song.play();
  else song.pause();
  // console.log('trying to play song...');
}

function toggleBeatInPlace() {
  valHeart.className.baseVal =
    valHeart.className.baseVal == 'beatInPlace' ? '' : 'beatInPlace';
}

function toggleBeat(el, delay, duration) {
  setTimeout(() => {
    el.className.baseVal = el.className.baseVal == 'beat' ? '' : 'beat';
  }, delay);
  // setTimeout(() => {
  //   el.className.baseVal = 'beat';
  //   setTimeOut(() => (el.className.baseVal = ''), duration);
  // }, delay);
}

function hideClickMessage() {
  clickMessage.classList.add('hidden');
}

function scrollTop() {
  document.body.scrollTop = 5;
  document.documentElement.scrollTop = 5;
}
