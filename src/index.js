import './css/styles.css';
// import debounce from 'lodash.debounce';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from './references';
import { fetchPhoto } from './fetch-photo';

console.log(refs);

//? refs.search.addEventListener('click', e => {
//?   refs.iconSpinner.classList.toggle('is-hidden');
//?   refs.iconSearch.classList.toggle('is-hidden');
//? });

// const DEBOUNCE_DELAY = 300;
let searchQuery = '';
let items = [];
console.dir(refs.submitButton);

const onSearchFormSubmit = e => {
  e.preventDefault();
  refs.submitButton.disabled = true;
  refs.submitButton.classList.toggle('disabled');
  //!   refs.iconSpinner.classList.toggle('is-hidden');
  //!   refs.iconSearch.classList.toggle('is-hidden');

  searchQuery = e.target.elements.searchQuery.value.trim();
  // !Очистить HTML перед новым запросом
  // if (searchBoxValue === '') {
  //   clearHTML();
  //   return;
  // }

  fetchPhoto(searchQuery).then(({ hits }) => {
    items = hits;
    console.log(items);
  });
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
