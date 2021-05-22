import cardImageTpl from '../templates/card-image.hbs';
import NewFetchApiImage from './apiService';
import notices from '../js/pnotify';

const refs = {
  searchInput: document.querySelector('.search-input'),
  searchButton: document.querySelector('.search-button'),
  loadMoreBtn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
  buttonUp: document.querySelector('.up'),
};

refs.searchButton.addEventListener('click', onInputSearchImage);
refs.loadMoreBtn.addEventListener('click', onButtonLoadImages);
refs.gallery.addEventListener('click', zoomImage);

const newFetchApiImage = new NewFetchApiImage();

async function onInputSearchImage(e) {
  e.preventDefault();
  try {
    if (refs.searchInput.value) {
      const newQuery = refs.searchInput.value;
      newFetchApiImage.query = newQuery;

      const images = await newFetchApiImage.fetchApiImage();
      newFetchApiImage.resetPageNum();

      resetOldQueryPage(images);
      makeCardImage(images.hits);
      addButtonLoadMore(images);
      scrollPageDown();
      addButtonUp();

      if (images.hits.length === 0) {
        notices.errorEmptyInput();
      }
    }
    if (!refs.searchInput.value) {
      notices.errorEmptyInput();
    }
  } catch (error) {
    console.log(error);
  }
}

function makeCardImage(images) {
  refs.gallery.insertAdjacentHTML('beforeend', cardImageTpl(images));
}

function addButtonLoadMore(images) {
  if (images.hits.length > 0) {
    refs.loadMoreBtn.classList.remove('hidden');
  } else {
    refs.loadMoreBtn.classList.add('hidden');
  }
}

function resetOldQueryPage() {
  refs.gallery.innerHTML = '';
}

async function onButtonLoadImages(e) {
  newFetchApiImage.incrementPage();

  const images = await newFetchApiImage.fetchApiImage();
  makeCardImage(images.hits);
  scrollPageDown();
}

function scrollPageDown() {
  if (newFetchApiImage.page === 1) {
    window.scrollTo({
      top: 150,
      behavior: 'smooth',
    });
  } else {
    window.scrollBy({
      top: 505,
      behavior: 'smooth',
    });
  }
}

function zoomImage(e) {
  if (e.target.hasAttribute('data-action')) {
    const basicLightbox = require('basiclightbox');
    const instance = basicLightbox.create(`
  <img src=${e.target.name} width="800" height="600">
`);

    instance.show();
  }
}

function addButtonUp() {
  refs.buttonUp.classList.remove('hidden');
  refs.buttonUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
