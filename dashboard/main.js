const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');

mobileNavToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
});

// Add animation to the navigation links
const navLinks = document.querySelectorAll('.navbar a, .mobile-nav a');

navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.transform = 'translateY(-5px)';
        link.style.transition = 'transform 0.2s ease-in-out';
    });

    link.addEventListener('mouseout', () => {
        link.style.transform = 'translateY(0)';
        link.style.transition = 'transform 0.2s ease-in-out';
    });
});

// Add animation to the buttons in the home section
const homeButtons = document.querySelectorAll('.home-content .btn-box a');

homeButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.2)';
        button.style.transition = 'box-shadow 0.2s ease-in-out';
    });

    button.addEventListener('mouseout', () => {
        button.style.boxShadow = 'none';
        button.style.transition = 'box-shadow 0.2s ease-in-out';
    });
});

// Add animation to social icons
const socialIcons = document.querySelectorAll('.home-sci a');

socialIcons.forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.style.transform = 'scale(1.1)';
        icon.style.transition = 'transform 0.2s ease-in-out';
    });

    icon.addEventListener('mouseout', () => {
        icon.style.transform = 'scale(1)';
        icon.style.transition = 'transform 0.2s ease-in-out';
    });
});
