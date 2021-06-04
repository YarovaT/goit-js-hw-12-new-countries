import './sass/main.scss';
import countryCardTpl from './templates/country-card.hbs';
import API from './api-service.js';
import getRefs from './get-refs.js';

var debounce = require('lodash.debounce');

const refs = getRefs();

// refs.searchForm.addEventListener('submit', onSearch);

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.target.value;

  API.fetchCountries(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError)
    .finally(() => {
      refs.searchForm.reset();
    });
}

function renderCountryCard(country) {
  const markup = countryCardTpl(...country);
  refs.cardContainer.innerHTML = markup;
}

function onFetchError(error) {
  alert('It is not find. Let`s try again');
}

function cleanInput() {
  refs.input.value === '';
}
