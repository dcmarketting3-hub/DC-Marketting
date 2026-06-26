const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const year = document.querySelector('#year');
const contactForm = document.querySelector('#contactForm');

year.textContent = new Date().getFullYear();

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + 130;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-menu a[href="#${id}"]`);

    if (scrollPosition >= top && scrollPosition < top + height) {
      navLinks.forEach((link) => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
});

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealElements.forEach((element) => revealObserver.observe(element));

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get('name').trim();
  const phone = formData.get('phone').trim();
  const service = formData.get('service');
  const message = formData.get('message').trim();

  const whatsappMessage = `Hi DC Marketting,%0A%0AI want to discuss digital marketing services.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService Required: ${encodeURIComponent(service)}%0AMessage: ${encodeURIComponent(message || 'Please contact me.')}`;

  window.open(`https://wa.me/918796795701?text=${whatsappMessage}`, '_blank', 'noopener');
});
