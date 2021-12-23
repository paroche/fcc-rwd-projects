/** @format */

// One animation w/ single click, a different animation w/ doubleclick
// Manually defined timing difference between click & double click (only listening to clicks)
// Using event listener abort controller
// v2 of this (v1.2, I guess). Disables event listeners until animation done so won't have hybrid events.
// Made cursor revert to auto during animations, then back to pointer when eventListener restored.

const body = document.querySelector('body');
const linksImageEl = document.getElementById('more-info-image');
const clickDelay = 300; // ms. Apparently 500ms is standard for a double click, but leads to more delay on singleclick function than I would like.
let rotateClassIndex = 0;
let rotateClasses;

// Don't show screen until all images loaded. Otherwise sometimes awkward transition
Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => activateDOM()); 

// Fade in transform if coming from portfolio
function activateDOM() {
  let fromPortfolio = false;
  if (sessionStorage.getItem('portfolio') == 'true') fromPortfolio = true;
  // body.style.setProperty('--transform-time', '0s')
  if (fromPortfolio) {
    // body.style.setProperty('--transform-time', '1s')
    body.classList.add('invisible');
    setTimeout(()=> {
      body.classList.remove('invisible'); 
    } , 1); // wout some delay doesn't do transform
  }
  body.hidden=false; // seemed to be necessary to have hidden=true in html, otherwise displayed before opacity from .invisible took effect (since script is loaded after body, I guess)
}

linksImageEl.addEventListener('click', handleFirstClick);

function handleFirstClick(e) {
  const controller = new AbortController();
  linksImageEl.removeEventListener('click', handleFirstClick);
  linksImageEl.addEventListener('click', handleSecondClick, {
    signal: controller.signal,
  });
  const clickTimer = setTimeout(() => clickTimedOut(), clickDelay);

  function clickTimedOut() {
    controller.abort(); // disable double click path
    clearPointer();
    linksImageSingleClick(e); // just do single click function
  }

  function handleSecondClick() {
    clearTimeout(clickTimer); // or would go ahead and do 1st click handling anyway
    clearPointer();
    linksImageDoubleClick(e);
  }
  
  function linksImageSingleClick(e) {
    rotateClasses = ['rotateY', 'rotateY', 'rotate3d','rotate3dOut'];
    const rotateTimes = [1300, 1300, 1300, 2000];
    const rotateClass = rotateClasses[rotateClassIndex];
    const restoreTime = rotateTimes[rotateClassIndex];
    rotateClassIndex = ++rotateClassIndex%rotateClasses.length;
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
    const rotateCursors = ['pointer','pointer','url(./img/cursors/hand-pointer-32-gray.png), pointer','url(./img/cursors/hand-pointer-32-darkgray.png), pointer']; // works w/ or w/out quotes around urls
    const nextCursor = rotateClassIndex%rotateClasses.length;
    const newCursor = rotateCursors[nextCursor]; 
    linksImageEl.style.cursor = newCursor; // url in html, but not working
  }

  function restoreClick() {
    linksImageEl.removeEventListener('click', handleSecondClick);
    linksImageEl.addEventListener('click', handleFirstClick);
    setPointer();
  }
}
