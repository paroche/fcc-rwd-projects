/** @format */

// To do:
/*
make so toast won't come up more than once at a time
see erathothenes-1.js
*/

const iframes = document.getElementById('iframes');
const toasts = document.getElementById('toasts');
const iframeList = document.querySelectorAll('iframe');
const anchors = document.querySelectorAll('a');
let toastingClick = false;

iframes.addEventListener('click', (e) => showLinkToast(e));

// iframeList.forEach((frame) => frame.addEventListener('mouseover', (e) => showLinkToast(e))); 
// anchors.forEach((anchor) => anchor.addEventListener('mouseover', (e) => createNotification('Click to Visit Page', 'info', 1000))); 
// anchors.forEach((anchor) => anchor.addEventListener('click', (e) => anchorClickToast(e))); // this works
anchors.forEach(anchor => anchor.addEventListener('mouseover', (e) => showClickVisitToast(e)) );


function showLinkToast(e) {
  // if (e.target != e.currentTarget) return;
  const message = 'Click on frame border to link to page, or Doubleclick on Portfolio entries to enter full screen';
  createNotification(message, 'info', 5000);
}

function anchorClickToast(e) {
  const message = 'Clicked on anchor!';
  createNotification(message, 'info', 1000);
}

function showClickVisitToast(e) {
  const message = "Click to Visit Page";
  const duration = 3000;
  if (!toastingClick) createNotification(message,'info', duration);
  toastingClick = true;
  setTimeout(()=> toastingClick=false, duration+1000);
}
function createNotification(message, type, duration) {
  const notif = document.createElement('div');
  notif.classList.add('toast');
  notif.classList.add(type);
  notif.innerText = message;
  toasts.appendChild(notif);
  setTimeout(() => notif.remove(), duration);
}
