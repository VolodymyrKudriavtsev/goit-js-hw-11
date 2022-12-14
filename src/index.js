import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './references';
import { searchParams } from './fetch-photo';
import { fetchPhoto } from './fetch-photo';

let photoCards = [];
let page = Number(searchParams.get('page'));
const perPage = Number(searchParams.get('per_page'));

const getCardsMarkup = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `
  <div class="photo-card">
    <a  href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
    </a>    
    <div class="info">
      <p class="info-item"><b>Likes</b>${likes}</p>
      <p class="info-item"><b>Views</b>${views}</p>
      <p class="info-item"><b>Comments</b>${comments}</p>
      <p class="info-item"><b>Downloads</b>${downloads}</p>
    </div>
  </div>`;
};

const searchBtnDisableToggle = () => {
  refs.submitButton.toggleAttribute('disabled');
  refs.submitButton.classList.toggle('disabled');
  refs.iconSpinner[0].classList.toggle('is-hidden');
  refs.iconSearch.classList.toggle('is-hidden');
};

const loadMoreButtonDisabled = () => {
  refs.loadMoreButton.lastElementChild.textContent = '';
  refs.loadMoreButton.setAttribute('disabled', true);
  refs.loadMoreButton.classList.add('disabled');
  refs.iconSpinner[1].classList.remove('is-hidden');
};
const loadMoreButtonEnabled = () => {
  refs.loadMoreButton.lastElementChild.textContent = 'Load more';
  refs.loadMoreButton.removeAttribute('disabled');
  refs.loadMoreButton.classList.remove('disabled');
  refs.iconSpinner[1].classList.add('is-hidden');
};

const render = () => {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    photoCards.map(getCardsMarkup).join('')
  );
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
};

const pageIncrement = () => {
  page += 1;
  searchParams.set('page', page);
};

const firstCardsQuantityCheck = totalHits => {
  if (totalHits === 0) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
      { position: 'center-center' }
    );
  } else if (totalHits < perPage) {
    refs.loadMoreButton.classList.add('is-hidden');
    return Notify.info(
      "We're sorry, but you've reached the end of search results.",
      { position: 'center-center' }
    );
  } else {
    refs.loadMoreButton.classList.remove('is-hidden');
    Notify.info(`Hooray! We found ${totalHits} images.`, {
      position: 'center-center',
    });
  }
};

const followingCardsQuantityCheck = totalHits => {
  if (page >= totalHits / perPage) {
    refs.loadMoreButton.classList.add('is-hidden');
    return Notify.info(
      "We're sorry, but you've reached the end of search results.",
      { position: 'center-center' }
    );
  }
};

const smoothCardsSroll = () => {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

const onSearchFormSubmit = e => {
  e.preventDefault();
  const searchQuery = e.target.elements.searchQuery.value.trim();
  if (searchQuery === '') return;

  searchBtnDisableToggle();

  refs.gallery.innerHTML = '';
  refs.loadMoreButton.classList.add('is-hidden');

  page = 0;
  pageIncrement();

  fetchPhoto(searchQuery)
    .then(({ data: { hits, totalHits } }) => {
      photoCards = hits;
      firstCardsQuantityCheck(totalHits);
      render();
    })
    .finally(() => {
      searchBtnDisableToggle();
    });
};

const onLoadMoreButtonClick = e => {
  const searchQuery = refs.searchForm.elements.searchQuery.value.trim();
  loadMoreButtonDisabled();

  pageIncrement();

  fetchPhoto(searchQuery).then(({ data: { hits, totalHits } }) => {
    photoCards = hits;
    render();
    smoothCardsSroll();
    followingCardsQuantityCheck(totalHits);
    loadMoreButtonEnabled();
  });
};

const onGalleryImgClick = e => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') return;
};

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
refs.gallery.addEventListener('click', onGalleryImgClick);
