// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // Navigation toggle for mobile
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('show');
    });

    // Close menu when clicking a nav link (mobile)
    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navList.classList.remove('show');
      });
    });
  }

  // Smooth scroll for homepage hero button
  const scrollToAboutBtn = document.getElementById('scrollToAbout');
  if (scrollToAboutBtn) {
    scrollToAboutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'about.html';
    });
  }

  // Contact form validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      clearErrors();
      let hasError = false;

      const nameInput = contactForm.name;
      const emailInput = contactForm.email;
      const messageInput = contactForm.message;

      // Name validation: required, min 2 chars
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showError('nameError', 'Please enter your name (at least 2 characters).');
        hasError = true;
      }

      // Email validation: required, valid format
      if (!emailInput.value.trim()) {
        showError('emailError', 'Please enter your email.');
        hasError = true;
      } else if (!validateEmail(emailInput.value.trim())) {
        showError('emailError', 'Please enter a valid email address.');
        hasError = true;
      }

      // Message validation: required, min 10 chars
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showError('messageError', 'Please enter a message (at least 10 characters).');
        hasError = true;
      }

      if (!hasError) {
        // Here you can add real submission logic (e.g., AJAX to server or email service)
        contactForm.reset();
        const successMsg = document.getElementById('formSuccess');
        if (successMsg) {
          successMsg.textContent = 'Thank you! Your message has been sent.';
        }
      }
    });
  }

  function showError(id, message) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = message;
    }
  }

  function clearErrors() {
    ['nameError', 'emailError', 'messageError'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
    const successMsg = document.getElementById('formSuccess');
    if (successMsg) successMsg.textContent = '';
  }

  function validateEmail(email) {
    // Simple regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }
});