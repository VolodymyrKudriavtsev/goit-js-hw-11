import './css/styles.css';
// import debounce from 'lodash.debounce';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { fetchCountries } from './fetchCountries';

// const DEBOUNCE_DELAY = 300;
// let searchBoxValue = '';
// let countries = [];

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

// const refs = {
//   searchBox: document.querySelector('#search-box'),
//   counrtyList: document.querySelector('.country-list'),
//   counrtyInfo: document.querySelector('.country-info'),
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

// const render = () => {
//   refs.counrtyList.innerHTML = '';
//   refs.counrtyInfo.innerHTML = '';

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

// const onSearchBoxInput = e => {
//   searchBoxValue = e.target.value.trim();

//   if (searchBoxValue === '') {
//     refs.counrtyList.innerHTML = '';
//     refs.counrtyInfo.innerHTML = '';
//     return;
//   }

//   fetchCountries(searchBoxValue)
//     .then(data => {
//       countries = data;

//       render();
//     })
//     .catch(() => {
//       return Notify.failure('Oops, there is no country with that name');
//     });
// };

// refs.searchBox.addEventListener(
//   'input',
//   debounce(onSearchBoxInput, DEBOUNCE_DELAY)
// );
