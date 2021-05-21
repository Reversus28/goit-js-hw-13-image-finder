import { BASE_URL, API_KEY } from './constants';

export default class NewFetchApiImage {
  constructor() {
    this.url = BASE_URL;
    this.key = API_KEY;
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchApiImage() {
    const response = await fetch(
      `${this.url}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${this.key}`,
    );

    return response.json();
  }

  incrementPage() {
    this.page += 1;
    console.log(this.page);
  }

  resetPageNum() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
