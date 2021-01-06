import './styles.css';
import refs from './js/refs.js';
import api from './js/apiService.js';
import template from './templates/temp.hbs';

const { gallery, form, btn, input } = refs;
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';

// import { debounce } from 'debounce';
// import { alert, Stack } from '@pnotify/core';

// const myStack = new Stack({
//   dir1: 'down',
//   dir2: 'left',
//   firstpos1: 25,
//   firstpos2: 25,
//   spacing1: 36,
//   spacing2: 36,
//   push: 'bottom',
//   context: notify,
// });

form.addEventListener('submit', e => {
  e.preventDefault();
  // ЧИСТИМ ПОЛЕ ОТРИСОВКИ ДАННЫХ ПЕРЕД НОВЫМ ЗАПРОСОМ
  gallery.innerHTML = '';
  // СБРАСЫВАЕМ ЗНАЧЕНИЕ СТРАНИЦ
  //   api.resetPage();
  api.queryValue;
  console.log(e.target.elements.query.value);
  // сохраняем полученное от пользователя значение из инпута
  const inputValue = e.target.elements.query.value;
  // вызываем метод запроса и передаем значение из инпута и
  // ссылку на элемент html, куда нужно встраивать результат запроса
  // fetchObject.getFetch(inputValue, gallery);
  api.getFetch(inputValue, gallery);
  btn.classList.remove('isHidden');

  // ЧИСТИМ ИНПУТ
  input.value = '';
});

btn.addEventListener('click', () => {
  console.log(`ok`);
  // вызываем метод добавления страницы
  // fetchObject.setPage();
  api.setPage();
  // // вызываем метод запроса и отрисовки
  // fetchObject.getFetch(undefined, gallery);
  api.getFetch(undefined, gallery);
});
