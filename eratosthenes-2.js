/** @format */

// One animation w/ single click, a different animation w/ doubleclick
// Using single click and double click listeners
// Based on setTimeout/clearTimeout for single click
// Works (once I realized doubleclick did 2 single clicks so had to remove BOTH setTimeouts)
/* 
dblclick event order (except in IE, where is only 1 single click. Logic below may not work there):
  mousedown
  mouseup
  click
  mousedown
  mouseup
  click
  dblclick
*/
/* Also, good to know (from Wikipedia on Double-click):
The maximum delay required for two consecutive clicks to be interpreted as a double-click is not standardized. According to Microsoft's MSDN website, the default timing in Windows is 500 ms (half a second).
*/

const linksImageEl = document.getElementById('more-info-image');

const clickDelay = 300; // ms. Apparently 500ms is standard for Windows
let singleTimer;

linksImageEl.addEventListener('click', (e) => linksImageSingleClick(e));
linksImageEl.addEventListener('dblclick', (e) => linksImageDoubleClick(e));

function linksImageSingleClick(e) {
  clearTimeout(singleTimer); // Visits here twice on doubleclick, so on 2nd, clear out 1st
  singleTimer = setTimeout(() => {
    if (e.detail === 1) {
      linksImageEl.classList.add('rotateY');
      setTimeout(() => linksImageEl.classList.remove('rotateY'), 1300); // set to same time as CSS animation
    }
  }, clickDelay);
}

function linksImageDoubleClick(e) {
  clearTimeout(singleTimer);
  linksImageEl.classList.add('wiggleZ');
  setTimeout(() => {
    linksImageEl.classList.remove('wiggleZ');
  }, 500);
}
