const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('section[id]');
const revealElements = document.querySelectorAll('.reveal');
const contactForm = document.querySelector('#contactForm');
const year = document.querySelector('#year');

if (year) year.textContent = new Date().getFullYear();

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (navMenu) navMenu.classList.remove('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-menu a[href="#${id}"]`);

    if (scrollPosition >= top && scrollPosition < top + height) {
      navLinks.forEach((item) => item.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = (formData.get('name') || '').trim();
    const phone = (formData.get('phone') || '').trim();
    const service = formData.get('service') || 'General Enquiry';
    const message = (formData.get('message') || '').trim();

    const whatsappText = `Hi DC Marketting,%0A%0AI want to discuss digital marketing services.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService Required: ${encodeURIComponent(service)}%0AMessage: ${encodeURIComponent(message || 'Please contact me.')}`;
    window.open(`https://wa.me/918796795701?text=${whatsappText}`, '_blank', 'noopener');
  });
}
