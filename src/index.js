import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from './references';
import { fetchPhoto } from './fetch-photo';

let photoCards = [];

// !---Р А З М Е Т К А !!!

//!? webformatURL - посилання на маленьке зображення для списку карток.
//! largeImageURL - посилання на велике зображення.
//!? tags - рядок з описом зображення. Підійде для атрибуту alt.
//!? likes - кількість лайків.
//!? views - кількість переглядів.
//!? comments - кількість коментарів.
//!? downloads - кількість завантажень.

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
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
  refs.iconSpinner.classList.toggle('is-hidden');
  refs.iconSearch.classList.toggle('is-hidden');
};

const render = () => {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    photoCards.map(getCardsMarkup).join('')
  );
};

// !---Спрятать 'Load More'

const onSearchFormSubmit = e => {
  e.preventDefault();
  const searchQuery = e.target.elements.searchQuery.value.trim();

  if (searchQuery === '') return;
  // ?searchButtonDisabled();

  searchBtnDisableToggle();

  // !---Очистить HTML перед новым запросом
  // if (searchBoxValue === '') {
  //   clearHTML();
  //   return;
  // }

  fetchPhoto(searchQuery).then(({ data: { hits } }) => {
    if (hits.length === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    photoCards = hits;
    render();
    searchBtnDisableToggle();
  });

  //   items = hits;
  //   console.log(items);

  //   searchBtnDisableToggle();
  // });

  // !---Показать 'Load More' после первого рендера

  // fetchCountries(searchBoxValue)
  //   .then(data => {
  //     countries = data;
  //     render();
  //   })
  //   .catch(() => {
  //     return Notify.failure('Oops, there is no country with that name');
  //   });
};

refs.searchForm.addEventListener('submit', onSearchFormSubmit);

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
