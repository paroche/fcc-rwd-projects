const elem = document.documentElement;
const body = document.querySelector('body');
const form = document.getElementById('survey-form');

// Fade in transform if coming from portfolio
let fromPortfolio = false;
if (sessionStorage.getItem('portfolio') == 'true') fromPortfolio = true;
if (fromPortfolio) {
  body.classList.add('invisible');
  setTimeout(()=> {
    body.classList.remove('invisible'); 
  } , 1); // w/out some delay doesn't do transform
}

body.hidden=false; // seemed to be necessary to have hidden=true in html, otherwise displayed before opacity from .invisible took effect (since script is loaded after body, I guess)

// Switch to full screen in iframe
elem.addEventListener('dblclick', () => {
  if (window.frameElement != null) elem.requestFullscreen();
}); 

form.addEventListener('submit', ()=> alert("You have submitted, and your submission has been noted. Await further instructions."));
