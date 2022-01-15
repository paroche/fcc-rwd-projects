const elem = document.documentElement;

// Switch to full screen in iframe
elem.addEventListener('dblclick', () => {
  if (window.frameElement != null) elem.requestFullscreen();
}); 
