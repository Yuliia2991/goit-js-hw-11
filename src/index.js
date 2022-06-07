import PhotosApiService from './js/photos-api-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

const photosApiService = new PhotosApiService();
hideLoadMoreBtn();

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();
  clearPhotos();
  photosApiService.resetPage();

  photosApiService.searchQuery =
    e.currentTarget.elements.searchQuery.value.trim();

  if (photosApiService.searchQuery === '') {
    // hideLoadMoreBtn;
    return Notify.failure('Please fill in a search query.');
  }

  try {
    const data = await photosApiService.fetchPhotos();

    if (data.totalHits !== 0) {
      renderGalleryCards(data.hits);
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
    } else {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      hideLoadMoreBtn();
    }

    if (data.totalHits <= photosApiService.perPage && data.hits.length !== 0) {
      hideLoadMoreBtn();
      return Notify.info(
        "We're sorry, but you've reached the end of search results.",
        { timeout: 5000 }
      );
    }
  } catch (e) {
    console.log(e.message);
  }
}

async function onLoadMore() {
  try {
    const data = await photosApiService.fetchPhotos();
    renderGalleryCards(data.hits);
    if (data.hits.length < photosApiService.perPage) {
      hideLoadMoreBtn();
      Notify.info(
        "We're sorry, but you've reached the end of search results.",
        { timeout: 5000 }
      );
    }
  } catch (e) {
    console.log(e.message);
  }
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

  let gallery = new SimpleLightbox('.gallery a');
  gallery.refresh();
  refs.loadMoreBtn.classList.remove('is-hidden');
}
function clearPhotos() {
  refs.gallery.innerHTML = '';
}
function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}
function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}
