const body = document.body;
const header = document.getElementById('header');
const elem = document.documentElement;

// Adjust for actual header height
updateHeaderHeight(); // initial
window.addEventListener('resize', updateHeaderHeight);

// Switch to full screen in iframe
elem.addEventListener('dblclick', () => {
  if (window.frameElement != null) elem.requestFullscreen();
}); 

function updateHeaderHeight() {
  let height = header.offsetHeight;
  body.style.setProperty("--header-height", height+"px");
  body.style.setProperty("--neg-header-height", -height+"px");
}