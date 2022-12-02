/** @format */

// *** TO DO: Not always changing formats on doubleclick **

const root = document.documentElement;
const body = document.body;
const container = document.getElementById('container');
const main = document.getElementById('main');
const navHeader = document.getElementById('nav-header');
const welcomeContainer = document.getElementById('welcome-container');
const welcomeSection = document.getElementById('welcome-section');
const tiles = document.querySelectorAll('.project-tile');
const animationDefault = 'F'; // default to fade
let animationType = animationDefault;

let projectBack = -1;
// Import background colors from CSS
let projectsBackground = getComputedStyle(root).getPropertyValue('--projects-background');
let sectionHeaderBackground = getComputedStyle(root).getPropertyValue('--section__header--background');
let sectionSubheaderBackground = getComputedStyle(root).getPropertyValue('--section__subheader-background');
let sectionFooterBackground = getComputedStyle(root).getPropertyValue('--section__footer-background');
let projectContainerDescTileBackground = getComputedStyle(root).getPropertyValue('--project-container-desc-tile-background');
let contactBackground = getComputedStyle(root).getPropertyValue('--contact-background');

setBackgroundsWhite();

// Put flag in session storage that progs are being run from portfolio
sessionStorage.setItem('portfolio', 'true');

const elem = document.documentElement;

// Switch to full screen in iframe
root.addEventListener('dblclick', () => {
  root.requestFullscreen();
}); 

navHeader.addEventListener('dblclick', () => {
  body.classList.toggle('rice');
  // navHeader.classList.toggle('rice');
  // welcomeContainer.classList.toggle('rice');
});

welcomeSection.addEventListener('dblclick', () => {
  // welcomeSection.classList.toggle('poly');
  container.classList.toggle('back-image');
});

body.addEventListener('dblclick', () => {
  // body.classList.toggle('san-serif');
  projectBacks = [
    // 'var(--projects-background-standard)',
    'var(--projects-background-transparent)', // good
    'var(--projects-background-white)', // good
    // 'var(--projects-background-standard)',
    'var(--projects-background-translucent)', // good
    'var(--projects-background-white)', // good
  ];
  projectBack = ++projectBack % 4;
  console.log(projectBack);
  const newBackground = projectBacks[projectBack];
  root.style.setProperty('--projects-background', newBackground);
  if (projectBack <= 2)
  container.classList.add('back-image');
  else container.classList.remove('back-image');
  if (projectBack == 3) body.classList.add('rice');
  else body.classList.remove('rice');
  
  // container.classList.toggle('border');
  if (newBackground == projectsBackgroundWhite) setBackgroundsWhite(); else resetBackgrounds();
});

function setBackgroundsWhite() {
  // Set all backgrounds to white
    let backgroundWhite = '#FFFFFF';
    root.style.setProperty('--projects-background', backgroundWhite);
    root.style.setProperty('--section__header--background', backgroundWhite);
    root.style.setProperty('--section__subheader-background', backgroundWhite);
    root.style.setProperty('--section__footer-background', backgroundWhite);
    root.style.setProperty('--project-container-desc-tile-background', backgroundWhite);
    root.style.setProperty('--projects-background', backgroundWhite);
    root.style.setProperty('--contact-background', backgroundWhite);
}

function resetBackgrounds() {
  root.style.setProperty('--projects-background', projectsBackground);
  root.style.setProperty('--section__header--background', sectionHeaderBackground);
  root.style.setProperty('--section__subheader-background', sectionSubheaderBackground);
  root.style.setProperty('--section__footer-background', sectionFooterBackground);
  root.style.setProperty('--project-container-desc-tile-background', projectContainerDescTileBackground);
  root.style.setProperty('--contact-background', contactBackground);
}


// See if will work when come back from link. This doesn't seem to work
window.addEventListener('load', ()=> {
  sessionStorage.removeItem('load-all-first'); 
  sessionStorage.removeItem('greeting');
})

// Functions for active link animation and delayed linking

tiles.forEach((tile) => tile.addEventListener('click', (e) => activeTile(e)));

function activeTile(e) {
  const tile = e.target.closest('.project-tile');
  animationType = tile.dataset.animationtype;
  console.log('tile.dataset.animationType ', tile.dataset.animationtype);

  if (!animationType) animationType = animationDefault;
  console.log('activeTile, tile: ', tile);
  console.log('animation type: ', animationType);
  tile.classList.add('active' + animationType);

  setTimeout(() => tile.classList.remove('active'), 5000);
}

function delayURL(URL, delay) {
  // console.log('delayURL by ',delay," ms");
  setTimeout(() => (window.location = URL), delay);
}

document.addEventListener('scroll', (e) => {
  if (window.scrollY == 0) {
    navHeader.classList.remove('scrolled');
  } else {
    navHeader.classList.add('scrolled');
  }
});

let popupDiv;

document.onmouseover = function (event) {
  let targetDiv = event.target.closest('.project-tile');
  let targetA = event.target.closest('.udemy-link');
  if (!targetDiv && !targetA) return;
  targetElem = targetDiv || targetA;
  // ...create the popup element
  popupDiv = document.createElement('div');
  popupDiv.id = 'popup';
  popupDiv.className = 'popup-before';
  let popupHtml;
  let popupUnder = false;
  let popupWidthClass = 'W50';
  let waitTime;
  if (targetA) {
    // for Udemy links
    popupHtml =
      'If you want to know more about what this course teaches, click here to see the tutorial site on Udemy.';
    // , then scroll down and click on: <span class="underline bold">+ Show More</span>
    popupUnder = true;
    waitTime = 200;
  } else {
    // For tile descriptions
    let tileDescContent = targetDiv.dataset.tiledesc;
    if (!tileDescContent) return;
    switch (tileDescContent) {
      case 'natours':
        popupHtml =
          'Caveats: Not all features have yet been implemented in the front end (even if they are in the API). Currently Heroku back end is not up, working on a solution...';
        popupWidthClass = 'w40';
        break;
      case 'fictional-university':
        popupHtml =
          'Currently my version of this Wordpress site is not hosted online.';
        popupWidthClass = 'w40';
        break;
      case 'tribute':
        popupHtml =
          'We were given the assignment of creating a "Tribute Page". I chose Eratosthenes because I was always impressed with his calculation of the circumference of the Earth.';
        popupWidthClass = 'w50';
        break;
      case 'survey':
        popupHtml =
          'A survey page, to practice forms and the like. If you vist the page (just click on the image!), be sure to hover over the submit button for 10 seconds or so.';
        popupWidthClass = 'w50';
        break;
      case 'landing':
        popupHtml =
          'My solution for the "Product Landing Page" project. Familiarity with the lyrics to Simon and Garfunkle\'s "The Big Bright Green Pleasure Machine" is helpful for appreciating the subtle inside references.';
        popupWidthClass = 'w50';
        break;
      case 'techdoc':
        popupHtml =
          'We were asked to create a page of technical documentation. I chose to describe the various ways to center text and images, horizontally and vertically, in HTML and CSS (pre-grid). A useful reference.';
        popupWidthClass = 'w50';
        break;
      case 'portfolio':
        popupHtml =
          'This page, or at least its primitive prototype, was originally an FCC Responsive Design project.';
        popupWidthClass = 'w50';
        break;
    }
    waitTime = 1000;
  }

  popupDiv.innerHTML = popupHtml;
  popupDiv.classList.remove('w40', 'w50');
  popupDiv.classList.add(popupWidthClass);
  document.body.append(popupDiv);

  setTimeout(() => {
    let tileDesc = document.getElementById('popup');
    // console.log(tileDesc);
    if (tileDesc) tileDesc.classList.add('popup-after');
  }, waitTime);

  let coords = targetElem.getBoundingClientRect();
  let left = coords.left + (targetElem.offsetWidth - popupDiv.offsetWidth) / 2;

  left = Math.max(left, 15); //
  let top = coords.top - popupDiv.offsetHeight - 5;
  if (top < 0 || popupUnder) {
    // if crossing the top window edge, show below instead
    top = coords.top + targetElem.offsetHeight + 5;
  }

  popupDiv.style.left = left + 'px';
  popupDiv.style.top = top + 'px';
};

document.onmouseout = function (e) {
  if (popupDiv) {
    popupDiv.remove();
    popupDiv = null;
  }
};
