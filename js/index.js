// import projects from './data.js';

const textHTML = document.getElementById('text');
const headerHTML = document.querySelectorAll('.header');
const hideRightHTML = document.querySelectorAll('.hidden-right');
const hideLeftHTML = document.querySelectorAll('.hidden-left');

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach((n) =>
  n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  })
);

const words = [
  'I create things...',
  'Software Engineer',
  'Computer Science 2023',
  'Addicted to coffee',
];

let wordPosition = 0;
let timer;

function typeNow(arr, html) {
  // Split words into letters.
  let wordChar = arr[wordPosition].split('');
  // Loop through and type the letters until no char left.
  let typeLoop = function () {
    if (wordChar.length > 0) {
      //   textHTML.innerHTML += wordChar.shift();
      html.innerHTML += wordChar.shift();
    } else {
      // Trigger delete effect.
      deleteNow(arr, html);
      return false;
    }
    timer = setTimeout(typeLoop, 350);
  };
  typeLoop();
}

// Delete effect
function deleteNow(arr, html) {
  let wordChar = arr[wordPosition].split('');
  // loop through and delete char.
  let deleteLoop = function () {
    if (wordChar.length > 0) {
      wordChar.pop();
      //   textHTML.innerHTML = wordChar.join('');
      html.innerHTML = wordChar.join('');
    } else {
      // Next postion in the array or start over.
      arr.length > wordPosition + 1 ? wordPosition++ : (wordPosition = 0);
      // Trigger type effect.
      typeNow(arr, html);
      return false;
    }
    // Timer set quick.
    timer = setTimeout(deleteLoop, 100);
  };
  deleteLoop();
}

// Fade and Slide observer
// Set when animation will start
const appearOptions = {
  threshold: 0,
  rootMargin: '0px 0px -200px 0px',
};
// When entry target is scroll, add appear to trigger animation
const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('show');
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

const highlightOnScroll = new IntersectionObserver(function (
  entries,
  highlightOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('highlight');
      highlightOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

// For each ovbservation, observe for hidden-left and hidden-right
hideRightHTML.forEach((hide) => {
  appearOnScroll.observe(hide);
});

hideLeftHTML.forEach((hide) => {
  appearOnScroll.observe(hide);
});

headerHTML.forEach((header) => {
  highlightOnScroll.observe(header);
});

typeNow(words, textHTML);
