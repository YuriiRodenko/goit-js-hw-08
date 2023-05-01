import throttle from 'lodash.throttle';

const formData = {};
const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const inputEmail = document.querySelector('.feedback-form input');
const inputMessage = document.querySelector('.feedback-form textarea');

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

populateTextarea();

function onFormInput() {
  formData.email = inputEmail.value;
  formData.message = inputMessage.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const savedSettings = localStorage.getItem(STORAGE_KEY);
  if (savedSettings) {
    const parsedSettings = JSON.parse(savedSettings);
    inputEmail.value = parsedSettings.email;
    inputMessage.value = parsedSettings.message;
  }
}

function onFormSubmit(e) {
  formData.email = inputEmail.value;
  formData.message = inputMessage.value;
    if (formData.email === '' || formData.message === '') {
      return alert('Будь ласка, заповніть усі поля форми!');
    }
      e.preventDefault();
      e.target.reset();
      localStorage.removeItem(STORAGE_KEY);
      console.log(formData);
}
