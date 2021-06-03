import './sass/main.scss';
import countryCardTpl from './templates/country-card.hbs';

const refs = {
  cardContainer: document.querySelector('.js-card-container'),
  searchForm: document.querySelector('.js-search-form'),
};

refs.searchForm.addEventListener('submit', onSearch);

fetchCountry()
  .then(renderCountryCard)
  .catch(error => {
    console.log(error);
  });

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const searchQuery = form.elements.query.value;
  fetchCountry(searchQuery)
    .then(renderCountryCard)
    .catch(error => {
      console.log(error);
    })
    .finally(() => form.reset());
}

function fetchCountry(countryName) {
  return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`).then(response => {
    return response.json();
  });
}

function renderCountryCard(country) {
  const markup = countryCardTpl(...country);
  refs.cardContainer.innerHTML = markup;
  // console.log(markup);
}
