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

// Highlight active section in navbar
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
