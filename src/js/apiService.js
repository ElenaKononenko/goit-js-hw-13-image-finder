import template from '../templates/temp.hbs';

export default {
  query: 'moon',
  page: 1,
  perPage: 3,
  baseUrl: `https://pixabay.com/api/`,

  get queryValue() {
    return this.query;
  },
  set queryValue(val) {
    return (this.query = val);
  },

  getFetch(val = this.query, gallery) {
    let key = `19779483-2216087af4667397a75e88e7b`;
    // полученное через параметры, значение из инпута сохраняет в свойство query через сеттер
    this.queryValue = val;

    // прописываем параметры запроса, согласно доков API
    // ДОБАВЛЯЕМ ПАРАМЕТР ДЛЯ СТРАНИЦ
    let params = `?key=${key}&q=${this.query}&image_type=photo&per_page=${this.perPage}&page=${this.page}`;

    // сливаем встроку запроса перед отправкой
    let url = this.baseUrl + params;
    console.log(url);
    // создаем объект опций для запроса, по докам API, для передачи ключа

    // собственно запрос и обработка ответа на него
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data.hits);
        return data.hits;
      })
      .then(result => {
        const items = template(result);
        gallery.insertAdjacentHTML('beforeend', items);
        setTimeout(() => {
          window.scrollTo({
            top: gallery.scrollHeight,
            behavior: 'smooth',
          });
        }, 0);
        return gallery;
      });
  },

  // метод добавления страницы
  setPage() {
    this.page += 1;
    console.log('page: ', this.page);
    return this.page;
  },
  // метод сброса страниц
  resetPage() {
    this.page = 1;
    console.log('reset page', this.page);
    return this.page;
  },
};
