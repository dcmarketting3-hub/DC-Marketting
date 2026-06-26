const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const year = document.querySelector('#year');
const contactForm = document.querySelector('#contactForm');
const revealElements = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('section[id]');

if (year) {
  year.textContent = new Date().getFullYear();
}

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
  const scrollPosition = window.scrollY + 130;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const matchingLink = document.querySelector(`.nav-menu a[href="#${id}"]`);

    if (scrollPosition >= top && scrollPosition < top + height) {
      navLinks.forEach((link) => link.classList.remove('active'));
      if (matchingLink) matchingLink.classList.add('active');
    }
  });
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = (formData.get('name') || '').trim();
    const phone = (formData.get('phone') || '').trim();
    const service = formData.get('service') || 'General enquiry';
    const message = (formData.get('message') || '').trim();

    const text = [
      'Hi DC Marketting,',
      '',
      'I want to discuss digital marketing services.',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service Required: ${service}`,
      `Message: ${message || 'Please contact me.'}`
    ].join('\n');

    window.open(`https://wa.me/918796795701?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });
}
