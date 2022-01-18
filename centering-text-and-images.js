const elem = document.documentElement;
const body = document.body;

// Switch to full screen in iframe
// for some reason the nav block was blacked out in both Chrome and Firefox until I added an explicit background: white in css (only need in iframe)
elem.addEventListener('dblclick', () => {
  if (window.frameElement != null) elem.requestFullscreen();
}); 

// body.addEventListener('click', showWidth);

function showWidth() {
  console.log(window.innerWidth);
}
