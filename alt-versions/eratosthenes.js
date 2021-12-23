/** @format */

// One animation w/ single click, a different animation w/ doubleclick
// Manually defined timing difference between click & double click (only listening to clicks)
// Using event listener abort controller
// Still not perfect if you click repeately w/ no interval

const linksImageEl = document.getElementById('more-info-image');
const clickDelay = 250; // ms

linksImageEl.addEventListener('click', handleFirstClick);

function handleFirstClick(e) {
  const controller = new AbortController();
  linksImageEl.removeEventListener('click', handleFirstClick);
  linksImageEl.addEventListener('click', handleSecondClick, {signal: controller.signal,});
  const clickTimer = setTimeout(() => clickTimedOut(), clickDelay);

  function clickTimedOut() {
    controller.abort(); // disable double click path
    linksImageSingleClick(e); // just do single click
    restoreClick();
  }

  function handleSecondClick() {
    clearTimeout(clickTimer); // or would go ahead and do 1st click handling anyway
    linksImageDoubleClick(e);
    restoreClick();
  }

  function restoreClick() {
    linksImageEl.removeEventListener('click', handleSecondClick);
    linksImageEl.addEventListener('click', handleFirstClick);
  }
}

function linksImageSingleClick(e) {
  linksImageEl.classList.add('rotateY');
  setTimeout(() => linksImageEl.classList.remove('rotateY'), 2000);
}

function linksImageDoubleClick(e) {
  linksImageEl.classList.add('wiggleZ');
  setTimeout(() => linksImageEl.classList.remove('wiggleZ'), 500);
}
