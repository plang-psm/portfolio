const textHTML = document.getElementById('text');
const fades = document.querySelectorAll('.fade-in');
const slides = document.querySelectorAll('.slide-in');

const words = [
    'I create things...',
    'Front End Developer.',
    'Computer Science 2023.',
    'Addicted to coffee.'
]

let wordPosition = 0;
let timer;

function typeNow() {
    // Split words into letters.
        let wordChar = words[wordPosition].split('');
        // Loop through and type the letters until no char left.
        let typeLoop =  function(){
            if(wordChar.length > 0){
                textHTML.innerHTML += wordChar.shift()
            } else {
                // Trigger delete effect.
                deleteNow();
                return false;
            }
            timer = setTimeout(typeLoop, 350)
        }
        typeLoop();
    }

    // Delete effect
function deleteNow() {
        let wordChar = words[wordPosition].split('');
        // loop through and delete char.
        let deleteLoop = function () {
            if (wordChar.length > 0) {
                wordChar.pop();
                textHTML.innerHTML = wordChar.join('');
            } else {
                // Next postion in the array or start over.
                words.length > wordPosition + 1 ? wordPosition++ : wordPosition = 0;
                // Trigger type effect.
                typeNow();
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
    rootMargin: "0px 0px -250px 0px"
};
// When entry target is scroll, add appear to trigger animation
const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
    entries.forEach(entry => {
        if(!entry.isIntersecting) {
            return
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target)
        }
    })
}, appearOptions);

// For each ovbservation, observe for fade
fades.forEach(fade => {
    appearOnScroll.observe(fade)
});
// For each ovbservation, observe for slide
slides.forEach(slide => {
    appearOnScroll.observe(slide);
});

typeNow();
