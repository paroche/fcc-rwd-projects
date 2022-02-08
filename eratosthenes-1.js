/** @format */

// One animation w/ single click, a different animation w/ doubleclick
// Manually defined timing difference between click & double click (only listening to clicks)
// Using event listener abort controller
// v2 of this (v1.2, I guess). Disables event listeners until animation done so won't have hybrid events.
// Made cursor revert to auto during animations, then back to pointer when eventListener restored.


// Initialize
const elem = document.documentElement;
const container = document.getElementById('container');
const containerBackground = document.getElementById('container-background');
// const containerAfter = document.querySelector('#container::after');
const bannerAndArticle = document.getElementById('banner-and-article');
const linksImageEl = document.getElementById('more-info-image');
const clickDelay = 300; // ms. Apparently 500ms is standard for a double click, but leads to more delay on singleclick function than I would like.
let rotateClassIndex = 0;
let rotateClasses;
let fromPortfolio = false;
if (sessionStorage.getItem('portfolio') == 'true') fromPortfolio = true;

if (fromPortfolio) containerBackgroundFadeIn();
else containerBackground.hidden = false;

function containerBackgroundFadeIn() {
  containerBackground.classList.add('invisible');
  containerBackground.hidden = false;
  setTimeout(() => {
    containerBackground.classList.remove('invisible');
  }, 1);
}

// Don't show main screen until all images loaded. Otherwise sometimes awkward transition
window.addEventListener('load', showMain); // I would think this would do as much or more than the below
// Promise.all(
//   Array.from(document.images)
//     .filter((img) => !img.complete)
//     .map(
//       (img) =>
//         new Promise((resolve) => {
//           img.addEventListener('load', resolve);
//           img.addEventListener('error', resolve);
//         })
//     )
// ).then(() => showMain());


// Fade in transform if coming from portfolio
function showMain() {
  if (fromPortfolio) {
    // body.style.setProperty('--transform-time', '1s')
    bannerAndArticle.classList.add('invisible');
    setTimeout(() => {
      bannerAndArticle.classList.remove('invisible');
    }, 1); // wout some delay doesn't do transform
  }
  bannerAndArticle.hidden = false; // For clean transition, seemed to be necessary to have hidden=true in html, otherwise page displays before opacity from .invisible takes effect (since script is loaded after body, I guess)
}

// Switch to full screen in iframe
elem.addEventListener('dblclick', () => {
  if (window.frameElement != null) elem.requestFullscreen();
}); 

linksImageEl.addEventListener('click', handleFirstClick);

function handleFirstClick(e) {
  const controller = new AbortController();
  linksImageEl.removeEventListener('click', handleFirstClick); // Until timeout, are just going to listen for 2nd click
  linksImageEl.addEventListener('click', handleSecondClick, {
    signal: controller.signal,
  }); // But if 2nd click doesn't come in time, will abort listener and do single click function
  const clickTimer = setTimeout(() => doubleClickTimedOut(), clickDelay);

  function doubleClickTimedOut() {
    // So it is a single click
    controller.abort(); // disable 2nd (double) click listener
    clearPointer();
    linksImageSingleClick(e); // just do single click function
  }

  function handleSecondClick() {
    // Functional double-click
    clearTimeout(clickTimer); // or would go ahead and do 1st click handling anyway
    clearPointer();
    linksImageDoubleClick(e);
  }

  function linksImageSingleClick(e) {
    rotateClasses = ['rotateY', 'rotateY', 'rotate3d', 'rotate3dOut'];
    const rotateTimes = [1300, 1300, 1300, 2000];
    const rotateClass = rotateClasses[rotateClassIndex];
    const restoreTime = rotateTimes[rotateClassIndex];
    rotateClassIndex = ++rotateClassIndex % rotateClasses.length;
    linksImageEl.classList.add(rotateClass);
    setTimeout(() => {
      linksImageEl.classList.remove(rotateClass);
      restoreClick();
    }, restoreTime); // set to same time as CSS animation
  }

  function linksImageDoubleClick(e) {
    linksImageEl.classList.add('wiggleZ');
    setTimeout(() => {
      linksImageEl.classList.remove('wiggleZ');
      restoreClick();
    }, 500);
  }

  function clearPointer() {
    linksImageEl.style.cursor = 'auto';
  }

  function setPointer() {
    const rotateCursors = [
      'pointer',
      'pointer',
      'url(./img/cursors/hand-pointer-32-gray.png), pointer',
      'url(./img/cursors/hand-pointer-32-darkgray.png), pointer',
    ]; // works w/ or w/out quotes around urls
    const nextCursor = rotateClassIndex % rotateClasses.length;
    const newCursor = rotateCursors[nextCursor];
    linksImageEl.style.cursor = newCursor; // url in html, but not working
  }

  function restoreClick() {
    linksImageEl.removeEventListener('click', handleSecondClick);
    linksImageEl.addEventListener('click', handleFirstClick);
    setPointer();
  }
}
