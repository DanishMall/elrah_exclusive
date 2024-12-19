// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Close mobile menu when clicking a link
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

