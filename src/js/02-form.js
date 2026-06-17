import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.feedback-form');
  const STORAGE_KEY = 'feedback-form-state';

  populateFormFields();

  form.addEventListener('input', event => {
    if (event.target.name !== 'email' && event.target.name !== 'message') {
      return;
    }

    const formData = {
      email: form.elements.email.value.trim(),
      message: form.elements.message.value.trim(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  });

  form.addEventListener('submit', event => {
    event.preventDefault();

    const emailValue = form.elements.email.value.trim();
    const messageValue = form.elements.message.value.trim();

    if (emailValue === '' || messageValue === '') {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }

    console.log({
      email: emailValue,
      message: messageValue,
    });

    localStorage.removeItem(STORAGE_KEY);
    form.reset();
  });

  function populateFormFields() {
    const savedState = localStorage.getItem(STORAGE_KEY);

    if (savedState) {
      try {
        const { email, message } = JSON.parse(savedState);

        form.elements.email.value = email || '';
        form.elements.message.value = message || '';
      } catch (error) {
        console.error('Yerel depolama verisi okunurken hata oluştu:', error);
      }
    }
  }
});
