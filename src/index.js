import PhotosApiService from './js/photos-api-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const photosApiService = new PhotosApiService();

const refs = {
  form: document.querySelector('#search-form'),
  submitBtn: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  clearPhotos();
  // gallery.refresh();

  photosApiService.searchQuery =
    e.currentTarget.elements.searchQuery.value.trim();
  photosApiService.resetPage();
  photosApiService.fetchPhotos().then(renderGalleryCards);
}

function onLoadMore() {
  photosApiService.fetchPhotos().then(renderGalleryCards);
}

function renderGalleryCards(photos) {
  const galleryCardMarkup = photos
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
            <a class="gallery-item" href="${largeImageURL}">
              <div class="gallery-thumb">
                <img class="gallery-photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
              </div>
            </a>
            <div class="info">
              <p class="info-item">
                <b>Likes</b> ${likes}
              </p>
              <p class="info-item">
                <b>Views</b> ${views}
              </p>
              <p class="info-item">
                <b>Comments</b> ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b> ${downloads}
              </p>
            </div>
          </div>`
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', galleryCardMarkup);
  new SimpleLightbox('.gallery a');
}
function clearPhotos() {
  refs.gallery.innerHTML = '';
}
