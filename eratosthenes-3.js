/** @format */

// One animation w/ single click, a different animation w/ doubleclick
// Tracking times of clicks w/out using dblclick listener

const linksImageEl = document.getElementById('more-info-image');

const clickDelay = 300; // ms. 500ms is standard for double-click
let thisClickTime = 0;
let lastClickTime = 0;

linksImageEl.addEventListener('click', (e) => handleLinksImageClicks(e));

function handleLinksImageClicks(e) {
  let firstClicktimer;
  thisClickTime = Date.now();
  if (lastClickTime == 0) {
    // First click. Set timer for singleclick action. If completes, clear time
    lastClickTime = thisClickTime;
    firstClickTimer = setTimeout(() => {
      linksImageSingleClick(e);
      lastClickTime = 0; // reset
    }, clickDelay);
  } else {
    // Second click
    if (thisClickTime - lastClickTime <= clickDelay) {
      // doubleClick
      clearTimeout(firstClickTimer);
      linksImageDoubleClick(e);
      lastClickTime = 0;
    } else {
      // Second click after cutoff. Don't think we ever get here because of reset after cutoff from 1st click in setTimeout
      console.log("I don't think we ever get here");
    }
  }
}

function linksImageSingleClick(e) {
  linksImageEl.classList.add('rotateY');
  setTimeout(() => linksImageEl.classList.remove('rotateY'), 1300);
  lastClickTime = 0;
}

function linksImageDoubleClick(e) {
  linksImageEl.classList.add('wiggleZ');
  setTimeout(() => {
    linksImageEl.classList.remove('wiggleZ');
  }, 500);
  lastClickTime = 0;
}
