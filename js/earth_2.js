// js/earth_2.js

// Select the hero section (where the Earth should go)
const hero = document.querySelector('.hero');

// Create an image element
const globeImg = document.createElement('img');
globeImg.src = 'assets/globe.jpg';   
globeImg.alt = 'Static Globe';
globeImg.style.width = '80%';
globeImg.style.height = '80%';
globeImg.style.objectFit = 'contain';
globeImg.style.display = 'block';
globeImg.style.margin = '0 auto';

// Clear existing canvas (if any from earth.js)
hero.innerHTML = '';
hero.appendChild(globeImg);
