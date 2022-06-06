const axios = require('axios');
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27845155-2bfc883cc65018053cc1f72dd';

export default class PhotosApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPhotos() {
    // console.log(this);
    const fetchPhotos = await axios(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    );
    this.page += 1;
    return fetchPhotos.data.hits;
  }

  resetPage() {
    this.page = 1;
  }
}
