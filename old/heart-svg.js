/** @format */

const song = document.getElementById('song');
// const heartContainer = document.getElementById('svg-heart-container');
const heartContainer = document.getElementById('inner-container');
const heartPath = window
  .getComputedStyle(document.documentElement)
  .getPropertyValue('--d');
const origPath = heartPath;
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
];
const classNames = ['moving-heart', 'moving-heart-2'];
// let printed = false; // t
 
const startTime = Date.now();

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

// Create additional moving hearts

for (let i = 0; i < 200; i++) {
  setTimeout(() => createHeart(i), i * 500);
}

// function createHeart(id) {
//   const image = document.createElement('img');
//   image.src = 'img/heart.svg';
//   image.style.fill = 'green'; // doesn't work
//   image.style.stroke = 'blue'; // doesn't work
//   image.id = 'heart' + id;
//   image.classList.add('moving-heart');
//   heartContainer.appendChild(image);
//   setTimeout(()=> image.remove(), 30000);
// }

function createHeart(id) {
  const color = colors[id % colors.length];
  const className = classNames[id % classNames.length];
  const tagString = svgHeart(color, className, id);
  const frag = document.createRange().createContextualFragment(tagString);
  // frag.classList.add('moving-heart'); // apparently this doesn't work
  heartContainer.appendChild(frag);
  setTimeout(() => document.getElementById(id).remove(), 20000);
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

heartContainer.addEventListener('click', playSong);
heartContainer.addEventListener('hover', playSong);

function playSong() {
  song.muted = false;
  song.play();
  console.log("trying to play song...")
}
