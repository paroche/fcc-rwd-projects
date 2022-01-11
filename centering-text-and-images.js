const elem = document.documentElement;
const body = document.body;

// Switch to full screen in iframe
// for some reason the nav block is blacked out in both Chrome and Firefox
elem.addEventListener('dblclick', () => {
  elem.requestFullscreen();
}); 
