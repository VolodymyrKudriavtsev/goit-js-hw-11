import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './references';
import { fetchPhoto } from './fetch-photo';

let photoCards = [];

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

const loadMoreButtonDisableToggle = () => {
  refs.loadMoreButton.toggleAttribute('disabled');
  refs.loadMoreButton.classList.toggle('disabled');
  refs.iconSpinner[1].classList.toggle('is-hidden');
};

const render = () => {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    photoCards.map(getCardsMarkup).join('')
  );
};

const onSearchFormSubmit = e => {
  e.preventDefault();
  const searchQuery = e.target.elements.searchQuery.value.trim();
  if (searchQuery === '') return;

  searchBtnDisableToggle();
  refs.gallery.innerHTML = '';
  refs.loadMoreButton.classList.add('is-hidden');

  fetchPhoto(searchQuery)
    .then(({ data: { hits } }) => {
      if (hits.length === 0) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      photoCards = hits;
      render();

      // ? --- Перевірити, чи працюватиме lightbox на фото з іншими посиланнями (після 'Load More') --- ?
      const lightbox = new SimpleLightbox('.gallery a');

      refs.loadMoreButton.classList.remove('is-hidden');
    })
    .finally(() => {
      searchBtnDisableToggle();
    });
};

const onGalleryImgClick = e => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') return;
};

// ! ----- П А Г І Н А Ц І Я ----- !

const onLoadMoreButtonClick = e => {
  const searchQuery = refs.searchForm.elements.searchQuery.value.trim();
  refs.loadMoreButton.lastElementChild.textContent = '';
  loadMoreButtonDisableToggle();

  fetchPhoto(searchQuery).then(({ data: { hits } }) => {
    photoCards = hits;
    render();
    refs.loadMoreButton.lastElementChild.textContent = 'Load more';
    loadMoreButtonDisableToggle();
  });
};

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
refs.gallery.addEventListener('click', onGalleryImgClick);

// const getCounrtyListMarkup = ({ flags, name }) => {
//   return `
//   <li class="country-element">
//     <img src="${flags.svg}" alt="Country flag" width="25" />
//     <h class="country-title">${name.common}</h>
//   </li>
// `;
// };
// const getCounrtyInfoMarkup = ({
//   flags,
//   name,
//   capital,
//   population,
//   languages,
// }) => {
//   const lang = Object.values(languages).join(', ');
//   return `
//   <div class="card-title">
//     <img src="${flags.svg}" alt="Country flag" width="40" />
//     <h>${name.official}</h>
//   </div>
//   <ul class="card-list">
//     <li class="card-element"><span>Capital:</span>${capital}</li>
//     <li class="card-element"><span>Population:</span>${population}</li>
//     <li class="card-element"><span>Languages:</span>${lang}</li>
//   </ul>
//   `;
// };

// const renderList = () => {
//   refs.counrtyList.insertAdjacentHTML(
//     'beforeend',
//     countries.map(getCounrtyListMarkup).join('')
//   );
// };
// const renderInfo = () => {
//   refs.counrtyInfo.insertAdjacentHTML(
//     'beforeend',
//     countries.map(getCounrtyInfoMarkup)
//   );
// };

// const clearHTML = () => {
//   refs.counrtyList.innerHTML = '';
//   refs.counrtyInfo.innerHTML = '';
// };

// const render = () => {
//   clearHTML();

//   if (countries.length > 10) {
//     return Notify.info(
//       'Too many matches found. Please enter a more specific name.'
//     );
//   } else if (countries.length < 10 && countries.length >= 2) {
//     renderList();
//   } else {
//     renderInfo();
//   }
// };
