import template from '../templates/temp.hbs';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import refs from '../js/refs.js';

const { gallery, form, btn, input, notify } = refs;
import { alert, Stack } from '@pnotify/core';

const myStack = new Stack({
  dir1: 'down',
  dir2: 'left',
  firstpos1: 25,
  firstpos2: 25,
  spacing1: 36,
  spacing2: 36,
  push: 'bottom',
  context: notify,
});

export default {
  query: '',
  page: 1,
  perPage: 12,
  baseUrl: `https://pixabay.com/api/`,

  get queryValue() {
    return this.query;
  },
  set queryValue(val) {
    return (this.query = val);
  },

  getFetch(val = this.query, gallery) {
    let key = `19779483-2216087af4667397a75e88e7b`;
    this.queryValue = val;
    let params = `?key=${key}&q=${this.query}&per_page=${this.perPage}&page=${this.page}`;
    let url = this.baseUrl + params;
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data.hits;
      })
      .then(result => {
        if (!result.length) {
          return message();
        }
        const items = template(result);
        gallery.insertAdjacentHTML('beforeend', items);

        autoLoader(this);
        // ///////////////////////////////////
        //загрузка через кнопку та скроллТу))
        // manualLoader(result, this);
      });
  },
  setPage() {
    this.page += 1;
    return this.page;
  },
  resetPage() {
    this.page = 1;
    return this.page;
  },
};

function message() {
  return alert({
    text: 'Нет совпадений',
    type: 'error',
    sticker: false,
    closer: false,
    delay: 1500,
    animation: 'fade',
    stack: myStack,
  });
}

function autoLoader(context) {
  const item = gallery.lastElementChild;
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        context.setPage();
        context.getFetch(context.query, gallery);

        observer.disconnect();
      }
    });
  });
  observer.observe(item);
}
function manualLoader(result, context) {
  setTimeout(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, 0);
  if (result.length < context.perPage) {
    btn.classList.add('isHidden');
  } else {
    btn.classList.remove('isHidden');
  }
}
