/** @format */

const song = document.getElementById('song')
const svgHeartContainer = document.getElementById('svg-heart-container')
const backgroundContainer = document.getElementById('background-container')
const toasts = document.getElementById('toasts')
const clickMessage = document.getElementById('click-me')
const heartContainer = document.getElementById('heart-container')
/* From CHATs */
const pathEl = document.getElementById('motionPath')
const rawPath = pathEl.getAttribute('d')
const scaleFactor = 5.1
/* End CHATs */
const heartInG = document.getElementById('heartInG')
const heartOutG = document.getElementById('heartOutG')
const svgCard = document.getElementById('svg-card')
const gems = document.getElementById('gems')
const cornerGems = document.querySelectorAll('.corner-gem')
const curvedMessage = document.getElementById('curved-message')
const curvedMessageTextpath = document.getElementById('curved-message-textpath')
const lowerRText = document.getElementById('lowerRText')
const valHeart = document.getElementById('val-heart')
const heartPath = window
  .getComputedStyle(document.documentElement)
  .getPropertyValue('--d')
const origPath = heartPath
// Create Heart Path for little hearts going around and inside big heart
scalePath(heartPath, '--d', 5.1)
scalePath(heartPath, '--d2', 2)

//   'rgb(50,250,150)', // former green

const colors = [
  'red',
  'rgb(255,50,50)',
  'rgb(255,50,200)',
  'red',
  'rgb(255,100,100)',
  'rgb(75,75,255)',
  'red',
  'rgb(255,50,150)',
  'rgb(50,200,100)',
  'red',
  'rgb(255,50,200)',
]
const classNames = ['moving-heart', 'moving-heart-2']
// let printed = false; // t

const startTime = Date.now()
let prevInterval = 0
const hearts = 300
const heartBeat = 1200

// ******** Set up loading events ******** //
window.addEventListener('load', () => {
  let greeting = sessionStorage.getItem('greeting')
  if (!greeting) greeting = 'For You'
  // sessionStorage.removeItem('greeting'); // Would like this to happen only on exit, but not on refresh, but don't know if can

  heartContainer.hidden = false // gives cleaner load
  setTimeout(scrollTop, 1)
  setTimeout(unhideCurvedMessage, 2500)
  setTimeout(unhideGems, 4000)
  setTimeout(unhideCard, 5000)
  setTimeout(unhideLowerRText, 7500)
  curvedMessageTextpath.textContent = greeting
})

// ******** Create moving hearts ******** //

for (let i = 0; i < hearts; i++) {
  setTimeout(() => createHeart(i), createInterval(i))
}

// ******** Heartpath functions ******** //

/* CHATs code */
// === 1. Recreate scalePath logic ===
function scalePathData(d, factor) {
  return d
    .split(' ')
    .map((part) => {
      const num = parseFloat(part)
      return isNaN(num) ? part : num * factor
    })
    .join(' ')
}
const scaledD = scalePathData(rawPath, scaleFactor)
pathEl.setAttribute('d', scaledD)
const pathLength = pathEl.getTotalLength()

// === 2. Dynamic Interval Logic ===
//
prevInterval = 0 // Took out "let"
function createInterval(i) {
  const p1 = 15,
    t1 = 100,
    p2 = 45,
    t2 = 300
  let interval = prevInterval
  if (i <= p1) interval += t1
  else if (i < p2) interval += t1 + t2 * (1 - (p2 - i) / (p2 - p1))
  else interval += t2
  prevInterval = interval
  return interval
}

// === 3. SVG Heart Generator ===
function svgHeart(color, id) {
  return `
    <svg id="heart-${id}" class="moving-heart" xmlns="http://www.w3.org/2000/svg"
         width="24" height="24" viewBox="0 0 100 100">
      <path fill="${color}" d="M 60 4.346 C 71 4.346 80 13.973 80 25.738 
        C 80 58.45 40 74.762 40 75.653 
        C 40 74.763 0 58.54 0 25.738 
        C 0 13.884 9 4.346 20 4.346 
        C 31.1 4.346 40 10.835 40 22.689 
        C 40 10.835 48.9 4.346 60 4.346 z" />
    </svg>`
}
/* End CHATs Code */

function scalePath(path, pathVar, scale) {
  let pathArray = path.split(' ')
  pathArray.forEach((e, i) => {
    if (!isNaN(e)) {
      pathArray[i] = e * scale
    }
  })
  pathArray.shift() // for some reason was an element 0 added
  const newPath = pathArray.join(' ')
  document.documentElement.style.setProperty(pathVar, newPath)
}

function createInterval(i) {
  // total time before next element creation
  const p1 = 15,
    t1 = 100,
    p2 = 45,
    t2 = 300
  let interval = prevInterval
  if (i <= p1) {
    interval += t1
  } else if (i < p2) {
    interval += t1 + t2 * (1 - (p2 - i) / (p2 - p1)) // gradual transition
  } else {
    interval += t2
  }
  // console.log("(interval - prevInterval): ", (interval - prevInterval));
  prevInterval = interval
  return interval
}

/* My Original before CHATs */
/* function createHeart(id) {
  const color = colors[id % colors.length]
  const className = classNames[id % classNames.length]
  const tagString = svgHeart(color, className, id)
  const frag = document.createRange().createContextualFragment(tagString)
  //frag.classList.add('moving-heart') // apparently this doesn't work
  heartContainer.appendChild(frag)
  const newHeart = document.getElementById(id)
  newHeart.classList.add('b') // I no longer know why this is here. There does not seem to be a class 'b'
  setTimeout(() => document.getElementById(id).remove(), 20000)
  if (id == Math.floor(hearts / 2)) setHeartInOutBeats() // After half of little hearts created, set side hearts beating
  if (id == hearts - 1) fadeOutIn() // When last heart made, set times to fade out, then fade back in
}
 */

/* CHATs version */
// === 4. Animate a Heart Along the Path ===
function createHeart(id) {
  const color = colors[id % colors.length]
  const frag = document
    .createRange()
    .createContextualFragment(svgHeart(color, id))
  heartContainer.appendChild(frag)
  const heart = document.getElementById(`heart-${id}`)

  const tx = 85 // horizontal offset to align with big heart
  const ty = 85 // vertical offset

  const duration = 20000 + Math.random() * 5000
  const start = performance.now()

  function animate(now) {
    const elapsed = now - start
    const progress = (elapsed % duration) / duration
    const point = pathEl.getPointAtLength(pathLength * progress)
    heart.style.left = `${point.x}px`
    heart.style.top = `${point.y}px`
    heart.style.left = `${point.x + tx}px` // ⬅ PATCHED
    heart.style.top = `${point.y + ty}px` // ⬅ PATCHED
    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)

  setTimeout(() => heart.remove(), duration)

  /* Added back in */
  if (id == Math.floor(hearts / 2)) setHeartInOutBeats() // After half of little hearts created, set side hearts beating
  if (id == hearts - 1) fadeOutIn() // When last heart made, set times to fade out, then fade back in
  // End added back in
}
/* End CHATs version */

/* My Original Version, replaced by CHATs version below
/* function svgHeart(color, className, id) {
  return `
<svg id=${id} class=${className} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="500" height="500" viewBox="0 0 500 500" xml:space="preserve">
<desc>Created with Fabric.js 4.6.0</desc>
<defs>
</defs>
<g transform="matrix(4.38 0 0 4.46 268.31 276.15)" id="MssjSHtxtHLVm4WHNMBiQ"  >
<path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: ${color}; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(-44, -46)" d="M 60 4.346 C 71 4.346 80 13.973 80 25.738 C 80 58.45 40 74.762 40 75.65299999999999 L 40 75.65299999999999 C 40 74.763 0 58.54 0 25.738 C 0 13.884 9 4.346 20 4.346 C 31.1 4.346 40 10.835 40 22.689 C 40 10.835 48.9 4.346 60 4.346 z" stroke-linecap="round" />
</g>
</svg> */
/* `
} */

/* CHATs Version */
// === SVG Heart Builder ===
function svgHeart(color, id) {
  return `
    <svg id="heart-${id}" class="moving-heart" xmlns="http://www.w3.org/2000/svg"
         width="24" height="24" viewBox="0 0 100 100">
      <path fill="${color}" d="M 60 4.346 C 71 4.346 80 13.973 80 25.738 
        C 80 58.45 40 74.762 40 75.653 
        C 40 74.763 0 58.54 0 25.738 
        C 0 13.884 9 4.346 20 4.346 
        C 31.1 4.346 40 10.835 40 22.689 
        C 40 10.835 48.9 4.346 60 4.346 z" />
    </svg>`
}

// **** Fade-in Functions for startup ******** //

function unhideCard() {
  svgCard.classList.remove('hidden')
}

function unhideGems() {
  gems.classList.remove('hidden')
  cornerGems.forEach((gem, i) => {
    const base = 100
    let interval =
      i == 1 ? base * 3 : i == 0 ? base * 2 : i == 2 ? base : base * 4 // klugy, but gets order I want
    setTimeout(() => gem.classList.add('beat'), 10000 + interval)
  })
}

function unhideCurvedMessage() {
  curvedMessage.classList.remove('hidden')
}

function unhideLowerRText() {
  lowerRText.classList.remove('hidden')
}

// ******** Event Listeners ******** //

backgroundContainer.addEventListener('dblclick', toggleSong)
svgHeartContainer.addEventListener('click', (e) => showWidth(e))
heartContainer.addEventListener('click', toggleSong)
heartContainer.addEventListener('click', toggleBeatInPlace)
heartContainer.addEventListener('click', hideClickMessage)

// ******** Heartbeat Functions ******** //

function setHeartInOutBeats() {
  const heartInGInterval = setInterval(
    () => toggleBeat(heartInG, heartBeat * 2.5, 1000),
    heartBeat
  )
  const heartOutGInterval = setInterval(
    () => toggleBeat(heartOutG, heartBeat * 2, 1000),
    heartBeat
  )
}

function toggleBeatInPlace() {
  valHeart.className.baseVal =
    valHeart.className.baseVal == 'beatInPlace' ? '' : 'beatInPlace'
}

// Old version
function toggleBeat(el, delay, duration) {
  setTimeout(() => {
    el.className.baseVal = el.className.baseVal == 'beat' ? '' : 'beat'
  }, delay)
}
// CHATs version
/* function toggleBeat(el, delay, duration) {
  setTimeout(() => {
    const current = el.className.baseVal || '';
    if (current.includes('beat')) {
      el.className.baseVal = current.replace('beat', '').trim();
    } else {
      el.className.baseVal += ' beat';
    }
  }, delay); */

// ******** Fade Out/In Functions for End ******** //

function fadeOutIn() {
  setTimeout(fadeOut, 30000)
  setTimeout(fadeIn, 50000)
}

function fadeOut() {
  heartContainer.classList.add('faded')
}

function fadeIn() {
  heartContainer.classList.remove('faded')
  heartContainer.addEventListener('click', () => location.reload())
}

// ******** Song/Click Message/Scroll Top ******** //

function toggleSong() {
  song.muted = false
  if (song.paused) song.play()
  else song.pause()
}
function hideClickMessage() {
  clickMessage.classList.add('hidden')
}

function showWidth(e) {
  // console.log(e.target);
  // console.log(e.currentTarget);
  if (e.target != e.currentTarget) return // apparently I still don't know how to stop bubbling on the listener itself
  // would it work to add an event handler to the heart card on click sto .stopPropagation? Seems like there should be an easy way to say you want the event to only occur directly on the element..
  const message = 'width: ' + document.documentElement.clientWidth
  createNotification(message, 'info')
}

function createNotification(message, type) {
  const notif = document.createElement('div')
  notif.classList.add('toast')
  notif.classList.add(type)
  notif.innerText = message
  toasts.appendChild(notif)
  setTimeout(() => notif.remove(), 3000)
}

function scrollTop() {
  // document.body.scrollTop = 5;
  // document.documentElement.scrollTop = 5;
}
