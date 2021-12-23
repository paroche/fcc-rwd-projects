/** @format */

const linksImageEl = document.getElementById('more-info-image');

// Hard to get it to totally separate click and doubleclick
// Possible solution: Maybe a manual doubleclick handler (based on click and timeout) but using an abort controller to cancel event listener for 2nd click if it's not w/int some ms of 1st click.
/* Example from MSN:
// Add an abortable event listener to table
const controller = new AbortController();
const el = document.getElementById("outside");
el.addEventListener("click", modifyText, { signal: controller.signal } );

// Function to change the content of t2
function modifyText() {
  const t2 = document.getElementById("t2");
  if (t2.firstChild.nodeValue == "three") {
    t2.firstChild.nodeValue = "two";
  } else {
    t2.firstChild.nodeValue = "three";
    controller.abort(); // remove listener after value reaches "three"
  }
}
*/

// let lastClickTime = 0;
// let doubleClick = false;

linksImageEl.addEventListener('click', (e) => linksImageSingleClick(e));
linksImageEl.addEventListener('dblclick', (e) => linksImageDoubleClick(e));

// after 1st time, on doubleclick does both!
// function handleLinksImageClicks() {
//   let thisClickTime = Date.now();
//   if (lastClickTime !== 0) {
//     if ((thisClickTime - lastClickTime) <= 600) {
//       linksImageDoubleClick();
//       lastClickTime = 0;
//     } else {
//       linksImageSingleClick();
//       lastClickTime = thisClickTime;
//     }
//   } else {
//     linksImageSingleClick();
//     lastClickTime = thisClickTime;
//   }
// }

function linksImageSingleClick(e) {
  setTimeout(()=> {
      // console.log('in singleclick, e.detail = ', e.detail);
      if (e.detail === 1) {
        linksImageEl.classList.add('rotateY');
        setTimeout(() => linksImageEl.classList.remove('rotateY'), 2000);
      }
    }, 300);
  
  // setTimeout( ()=> {
  //   if (!doubleClick)
  //   {
  //     linksImageEl.classList.add('rotateY');
  //     setTimeout(() => linksImageEl.classList.remove('rotateY'), 2000);
  //   }}, 100)
}

// For some reason, if doubleclick twice in a row (w/out single click between), will execute single click on doubleclick. Problem in both Chrome and FireFox
function linksImageDoubleClick(e) {
  // console.log('in doubleclick, e.detail = ', e.detail);
  if (e.detail === 2) {
    linksImageEl.classList.add('wiggleZ');
    setTimeout(() => {
      linksImageEl.classList.remove('wiggleZ');
    }, 500);
  }

  // doubleClick = true;
  // linksImageEl.classList.add('wiggleZ');
  // setTimeout(() => {
  //   doubleClick = false;
  //   linksImageEl.classList.remove('wiggleZ');
  // }, 500);
}
