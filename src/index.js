import './styles.css';

import refs from './js/refs.js';
import api from './js/apiService.js';

const { gallery, form, btn, input, notify } = refs;

form.addEventListener('submit', e => {
  e.preventDefault();
  gallery.innerHTML = '';
  api.queryValue;
  const inputValue = e.target.elements.query.value;
  api.getFetch(inputValue, gallery);

  input.value = '';
});

btn.addEventListener('click', () => {
  api.setPage();
  api.getFetch(undefined, gallery);
});
