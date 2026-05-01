/* ============================================
   CONTACT FORM JS — contact.js
   Uses Formspree AJAX API
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const form      = document.getElementById('contactForm');
  const success   = document.getElementById('formSuccess');
  const btnText   = document.getElementById('btnText');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  /* ---- REAL-TIME VALIDATION ---- */
  const validateField = (field) => {
    const val = field.value.trim();
    let valid = true;

    const oldErr = field.parentElement.querySelector('.field-error');
    if (oldErr) oldErr.remove();
    field.classList.remove('error', 'success');

    if (field.required && !val) {
      showError(field, 'This field is required.');
      valid = false;
    } else if (field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      showError(field, 'Please enter a valid email address.');
      valid = false;
    } else if (field.type === 'tel' && val && !/^[0-9+\-\s()]{7,15}$/.test(val)) {
      showError(field, 'Please enter a valid phone number.');
      valid = false;
    } else if (val) {
      field.classList.add('success');
    }

    if (!valid) field.classList.add('error');
    return valid;
  };

  const showError = (field, msg) => {
    const err = document.createElement('span');
    err.className = 'field-error';
    err.textContent = msg;
    field.parentElement.appendChild(err);
  };

  form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validateField(field);
    });
  });

  /* ---- FORMSPREE AJAX SUBMIT ---- */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Client-side validation first
    let isValid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!validateField(field)) isValid = false;
    });
    if (!isValid) return;

    // Show loading state
    submitBtn.disabled  = true;
    btnText.textContent = 'Sending…';
    submitBtn.style.opacity = '0.7';

    try {
      const data     = new FormData(form);
      const response = await fetch('https://formspree.io/f/xnjwqkne', {
        method:  'POST',
        body:    data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        // Show success message
        form.style.display    = 'none';
        success.classList.add('show');
      } else {
        // Show error from Formspree
        const result = await response.json();
        const errMsg = result.errors
          ? result.errors.map(e => e.message).join(', ')
          : 'Something went wrong. Please email us directly.';
        alert('Error: ' + errMsg);
        resetBtn();
      }
    } catch (err) {
      alert('Network error. Please try again or email us at mahakalienterprise222@gmail.com');
      resetBtn();
    }
  });

  function resetBtn() {
    submitBtn.disabled      = false;
    btnText.textContent     = 'Send Message';
    submitBtn.style.opacity = '1';
  }
});
