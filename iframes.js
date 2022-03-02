/** @format */

const iframes = document.getElementById('iframes');
const toasts = document.getElementById('toasts');
const iframeList = document.querySelectorAll('iframe');
const anchors = document.querySelectorAll('a');

iframes.addEventListener('click', (e) => showLinkToast(e));

iframeList.forEach((frame) => frame.addEventListener('hover', (e) => showLinkToast(e))); // not working
anchors.forEach((anchor) => anchor.addEventListener('hover', (e) => showLinkToast(e))); // not working



function showLinkToast(e) {
  // if (e.target != e.currentTarget) return;
  const message = 'Click on frame border to link to page, or Doubleclick on Portfolio entries to enter full screen';
  createNotification(message, 'info');
}

function createNotification(message, type) {
  const notif = document.createElement('div');
  notif.classList.add('toast');
  notif.classList.add(type);
  notif.innerText = message;
  toasts.appendChild(notif);
  setTimeout(() => notif.remove(), 5000);
}
