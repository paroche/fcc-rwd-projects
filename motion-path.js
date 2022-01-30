/** @format */

const heartContainer = document.getElementById('svg-heart-container');
// const heartPath = "M 60 4.346 C 71 4.346 80 13.973 80 25.738 C 80 58.45 40 74.762 40 75.65299999999999 L 40 75.65299999999999 C 40 74.763 0 58.54 0 25.738 C 0 13.884 9 4.346 20 4.346 C 31.1 4.346 40 10.835 40 22.689 C 40 10.835 48.9 4.346 60 4.346 z"; /* heart - original */
const heartPath = window
  .getComputedStyle(document.documentElement)
  .getPropertyValue('--d');
scalePath(heartPath, 4.2);

function scalePath(path, scale) {
  let pathArray = path.split(' ');
  pathArray.forEach((e, i) => {
    if (!isNaN(e)) {
      pathArray[i] = e * scale;
    }
  });
  pathArray.shift(); // for some reason was an element 0 added
  const newPath = pathArray.join(' ');
  document.documentElement.style.setProperty('--d', newPath);
}

// Create additional moving hearts

for (let i=0; i<200; i++) {
  setTimeout(()=>createHeart(i), i*500);
}


function createHeart(id) {
  const image = document.createElement('img');
  image.src = 'img/heart.svg';
  image.id = 'heart' + id;
  image.classList.add('moving-heart');
  heartContainer.appendChild(image);
  setTimeout(()=> image.remove(), 10000);
}
