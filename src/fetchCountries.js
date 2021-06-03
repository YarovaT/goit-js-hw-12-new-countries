import './sass/main.scss';
import countryCardTpl from './templates/country-card.hbs';
import API from './api-service.js';
import getRefs from './get-refs.js';

const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const searchQuery = form.elements.query.value;

  API.fetchCountries(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError)
    .finally(() => form.reset());
}

function renderCountryCard(country) {
  const markup = countryCardTpl(...country);
  refs.cardContainer.innerHTML = markup;
}

function onFetchError(error) {
  alert('It is not find. Let`s try again');
}
