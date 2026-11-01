const form = document.getElementById('rsvp-form');
const status = document.getElementById('status');
const button = document.getElementById('submit-button');
const submitLabel = document.getElementById('submit-label');
const nameInput = document.getElementById('guest-name');
const success = document.getElementById('success');

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (button.disabled) return;

  const endpoint = window.RSVP_ENDPOINT;
  if (!endpoint) {
    status.textContent = 'RSVP collection is not configured yet. Please contact the hosts.';
    return;
  }

  const name = nameInput.value.trim();
  const meal = form.querySelector('input[name="meal"]:checked')?.value;
  if (!name || !meal) {
    status.textContent = 'Please enter your name and select a meal.';
    if (!name) nameInput.focus();
    return;
  }

  button.disabled = true;
  submitLabel.textContent = 'Sending...';
  form.setAttribute('aria-busy', 'true');
  status.textContent = '';
  try {
    // Apps Script returns an opaque response, so a send cannot confirm a Sheet write.
    await fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ name, meal, source: 'github-pages' })
    });
    form.hidden = true;
    success.hidden = false;
    document.getElementById('success-heading').focus();
  } catch (error) {
    console.error('RSVP request failed:', error);
    status.textContent = 'Could not send your RSVP. Please check your connection and try again.';
  } finally {
    button.disabled = false;
    submitLabel.textContent = 'RSVP';
    form.removeAttribute('aria-busy');
  }
});

document.getElementById('another').addEventListener('click', () => {
  form.reset();
  form.hidden = false;
  success.hidden = true;
  status.textContent = '';
  nameInput.focus();
});
