// Disable scrolling on the body and any other scrollable elements
function disableScroll() {
    document.body.style.overflow = 'hidden';
    // Add similar lines for other scrollable elements if necessary
    // document.querySelector('.scrollable-element').style.overflow = 'hidden';
}

// Enable scrolling on the body and any other scrollable elements
function enableScroll() {
    document.documentElement.style.overflow = 'auto'; // for the html element
    document.body.style.overflow = 'auto';
}

// Call disableScroll as soon as possible
disableScroll();

// Modify the gsap animation to call enableScroll when the animation is complete
gsap.fromTo('.loading-page', {opacity: 1}, {
    opacity: 0,
    duration: 1,
    delay: 1.5,
    onComplete: () => {
        document.querySelector('.loading-page').style.display = 'none';
        enableScroll(); // Re-enable scrolling
    }
});

const inputs = document.querySelectorAll('.contact-input');

inputs.forEach((input) => {
    input.addEventListener('focus', () => {
        input.parentNode.classList.add('focus');
        input.parentNode.classList.add('not-empty');
    });
    input.addEventListener('blur', () => {
        if (input.value === "") {
            input.parentNode.classList.remove('not-empty');
        }
        input.parentNode.classList.remove('focus');
    });
});

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

function animateText(target) {
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
        target.innerText = target.dataset.value
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return target.dataset.value[index];
                }
                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

        if (iteration >= target.dataset.value.length) {
            clearInterval(interval);
        }

        iteration += 1 / 3;
    }, 30);
}

const h1Element = document.querySelector("h1");

// Play animation on page load
animateText(h1Element);

// Play animation on hover
h1Element.onmouseover = () => {
    animateText(h1Element);
};

window.addEventListener('scroll', function() {
    var header = document.getElementById('main-header');
    var homeSection = document.getElementById('shooting-stars');
    var navLinks = document.querySelectorAll('nav ul li a');

    // Add 'fixed-header' or 'hidden-header' class to the header based on scroll position
    if (window.scrollY > homeSection.offsetHeight) {
        header.classList.add('fixed-header');
        header.classList.remove('hidden-header');
    } else {
        header.classList.remove('fixed-header');
        header.classList.add('hidden-header');
    }

    // Update active navigation link based on scroll position
    navLinks.forEach(function(link) {
        var section = document.querySelector(link.getAttribute('href'));
        var sectionTop = section.getBoundingClientRect().top + window.scrollY - header.offsetHeight;

        // Add an offset to the scroll position for the "About" section
        var offset = section.id === 'about' ? 100 : 0; // Adjust the offset value as needed

        if (window.scrollY + offset >= sectionTop && window.scrollY < sectionTop + section.offsetHeight) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

document.querySelector('.show-more').addEventListener('click', function() {
    const hiddenIcons = document.querySelectorAll('.skill-icons i:nth-child(n+4)');
    const showMoreText = this;

    if (showMoreText.textContent === 'Show More') {
        // Show the hidden icons with fade-in animation
        hiddenIcons.forEach(icon => {
            icon.style.display = 'inline-block';
            icon.style.opacity = '0';
            setTimeout(() => {
                icon.style.transition = 'opacity 0.5s';
                icon.style.opacity = '1';
            }, 100);
        });
        showMoreText.textContent = 'Show Less'; // Update the text
    } else {
        // Hide the icons instantly
        hiddenIcons.forEach(icon => {
            icon.style.opacity = '0';
            icon.style.display = 'none'; // Hide icons immediately
        });
        showMoreText.textContent = 'Show More'; // Update the text instantly
    }
});

document.querySelectorAll('.portfolio-item').forEach(item => {
    let currentSlide = 0;
    const slides = item.querySelectorAll('.slide');
    const slidesContainer = item.querySelector('.slides-container');
    const totalSlides = slides.length;

    function nextSlide() {
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        currentSlide = (currentSlide + 1) % totalSlides;
    }

    setInterval(nextSlide, 3000);
});

function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');
    shootingStar.style.left = `${Math.random() * 100}%`;
    document.getElementById('shooting-stars').appendChild(shootingStar);

    setTimeout(() => {
        shootingStar.remove();
    }, 2000); // Match the duration of the CSS animation
}

setInterval(createShootingStar, 1000); // Create a new shooting star every second

const darkModeToggle = document.querySelector('.dark-mode-toggle');
const darkModeIcon = document.querySelector('#darkMode-icon');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        darkModeIcon.classList.remove('bx-moon');
        darkModeIcon.classList.add('bx-sun');
    } else {
        darkModeIcon.classList.remove('bx-sun');
        darkModeIcon.classList.add('bx-moon');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    });

    document.querySelectorAll('.dot').forEach(dot => {
        observer.observe(dot);
    });
});

var counter = 1;
setInterval(function() {
    document.getElementById('radio1' + counter).checked = true;
    counter++;
    if (counter > 4) {
        counter = 1;
    }
}, 5000);

let laptopList = document.querySelector('.slider .list');
let phoneList = document.querySelector('.phone-slider .list');
let laptopDots = document.querySelectorAll('.slider .dots li');
let phoneDots = document.querySelectorAll('.phone-slider .dots li');
let prevButton = document.getElementById('prev'); // Controls laptop slider
let nextButton = document.getElementById('next'); // Controls laptop slider

let activeIndex = 0;
let lengthItems = laptopList.children.length - 1; // Assuming both sliders have the same number of items
let refreshSlider;

function updateSliders(index) {
    let laptopOffsetTop = laptopList.children[index].offsetTop;
    let phoneOffsetTop = phoneList.children[index].offsetTop;

    laptopList.style.top = -laptopOffsetTop + 'px';
    phoneList.style.top = -phoneOffsetTop + 'px';

    // Update active class for dots
    [...laptopDots, ...phoneDots].forEach(dot => dot.classList.remove('active'));
    if (laptopDots[index]) laptopDots[index].classList.add('active');
    if (phoneDots[index]) phoneDots[index].classList.add('active');

    activeIndex = index;
    restartSliderInterval();
}

function navigateSlider(direction) {
    if (direction === 'next') {
        activeIndex = activeIndex + 1 > lengthItems ? 0 : activeIndex + 1;
    } else {
        activeIndex = activeIndex - 1 < 0 ? lengthItems : activeIndex - 1;
    }
    updateSliders(activeIndex);
}

// Restart the interval timer
function restartSliderInterval() {
    clearInterval(refreshSlider);
    refreshSlider = setInterval(() => navigateSlider('next'), 7000);
}

// Attach click events to the navigation buttons
prevButton.onclick = () => navigateSlider('prev');
nextButton.onclick = () => navigateSlider('next');

// Setup interval for automatic navigation
restartSliderInterval();

// Dots navigation
laptopDots.forEach((dot, index) => {
    dot.addEventListener('click', () => updateSliders(index));
});
phoneDots.forEach((dot, index) => {
    dot.addEventListener('click', () => updateSliders(index));
});

let toggle = document.querySelector(".toggle");
let menu = document.querySelector(".menu");

toggle.onclick = () => {
    menu.classList.toggle("active");
};
