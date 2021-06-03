import './sass/main.scss';
import countryCardTpl from './templates/country-card.hbs';

const refs = {
  cardContainer: document.querySelector('.js-card-container'),
};

fetchCountry();

function fetchCountry() {
  fetch('https://restcountries.eu/rest/v2/name/colombia')
    .then(response => {
      return response.json();
    })
    .then(renderCountryCard)
    .catch(error => {
      console.log(error);
    });
}

function renderCountryCard(country) {
  const markup = countryCardTpl(country);
  refs.cardContainer.innerHTML = markup;
}
