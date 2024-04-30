// DOM Elements
const navbarLinks = document.querySelectorAll('.navbar a');
const homeSections = document.querySelectorAll('section');

// Smooth scrolling for navbar links
navbarLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Highlight active section in navbar with smooth scrolling
window.addEventListener('scroll', () => {
    let current = '';

    homeSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navbarLinks.forEach(link => {
        link.classList.remove('active');
        const targetId = link.getAttribute('href').substring(1);
        if (targetId === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling with animation effect
const smoothScrollTo = (targetSection, duration) => {
    const targetPosition = targetSection.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animation = currentTime => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);

    // Add animation effect here
    targetSection.style.opacity = '0'; // Initial opacity
    targetSection.style.transition = `opacity ${duration}ms ease`; // CSS transition
    setTimeout(() => {
        targetSection.style.opacity = '1'; // Final opacity
    }, 50); // Adjust delay as needed
};

// Smooth scrolling for internal links
navbarLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        smoothScrollTo(targetSection, 1000); // Adjust duration as needed
    });
});
