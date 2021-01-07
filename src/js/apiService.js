import template from '../templates/temp.hbs';
import modal from '../templates/modal.hbs';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import refs from '../js/refs.js';

const { gallery, form, btn, input, notify, mod } = refs;
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
        console.log(result);
        if (!result.length) {
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

        const items = template(result);
        gallery.insertAdjacentHTML('beforeend', items);
        setTimeout(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }, 0);

        // let picture = document.querySelector('.picture');
        // picture.addEventListener('click', e => {
        //   console.log(e.currentTarget);
        //   // const item = modal(result);
        //   // mod.insertAdjacentHTML('beforeend', item);
        //   //           const instance = basicLightbox.create(`
        //   //     <img src="${}" width="800" height="600">
        //   // `);

        //   // instance.show();
        // });

        if (result.length < this.perPage) {
          btn.classList.add('isHidden');
        } else {
          btn.classList.remove('isHidden');
        }

        return gallery;
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
