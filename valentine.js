/** @format */

const heartContainer = document.getElementById('svg-heart-container');
const heartPath = window
  .getComputedStyle(document.documentElement)
  .getPropertyValue('--d');
const origPath = heartPath;
scalePath(heartPath, '--d', 4.8);
scalePath(heartPath, '--d2', 2);

const colors = [
  'red',
  'rgb(255,50,50)',
  'rgb(255,50,200)',
  'red',
  'rgb(255,100,100)',
  'rgb(75,75,255)',
  'red',
  'rgb(255,50,150)',
  'rgb(50,250,150)',
];
const classNames = ['moving-heart', 'moving-heart-2'];
// let printed = false; // t

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

function createHeart(id) {
  const color = colors[id % colors.length];
  const className = classNames[id % classNames.length];
  const tagString = svgHeart(color, className);
  const frag = document.createRange().createContextualFragment(tagString);
  heartContainer.appendChild(frag);
  setTimeout(() => frag.remove(), 20000);
}

function svgHeart(color, className) {
  return `
<svg class=${className} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="500" height="500" viewBox="0 0 500 500" xml:space="preserve">
<desc>Created with Fabric.js 4.6.0</desc>
<defs>
</defs>
<g transform="matrix(4.38 0 0 4.46 268.31 276.15)" id="MssjSHtxtHLVm4WHNMBiQ"  >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: ${color}; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(-44, -46)" d="M 60 4.346 C 71 4.346 80 13.973 80 25.738 C 80 58.45 40 74.762 40 75.65299999999999 L 40 75.65299999999999 C 40 74.763 0 58.54 0 25.738 C 0 13.884 9 4.346 20 4.346 C 31.1 4.346 40 10.835 40 22.689 C 40 10.835 48.9 4.346 60 4.346 z" stroke-linecap="round" />
</g>
</svg>
`;
}
