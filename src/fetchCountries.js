import './sass/main.scss';
import countryCardTpl from './templates/country-card.hbs';
import countryCardList from './templates/country-cardList.hbs';
import API from './api-service.js';
import getRefs from './get-refs.js';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';

const refs = getRefs();

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();
  cleanCardContainer();

  const searchQuery = e.target.value;

  if (!searchQuery) {
    return;
  }

  API.fetchCountries(searchQuery).then(checkedCountryCard).catch(onFetchError);
}

function renderCountryCard(countryCard, template) {
  const markup = countryCard.map(count => template(count)).join();

  refs.cardContainer.innerHTML = markup;
}

function checkedCountryCard(countryCard) {
  const countriesQuantity = countryCard.length;

  if (countriesQuantity === 1) {
    renderCountryCard(countryCard, countryCardTpl);
  } else if (countriesQuantity > 1 && countriesQuantity <= 10) {
    renderCountryCard(countryCard, countryCardList);
  } else if (countriesQuantity > 10) {
    error({
      text: 'Too many matches found. Please enter a more specific query!',
    });
  }
}

function onFetchError() {
  alert('It is not find. Let`s try again');
}

function cleanCardContainer() {
  refs.cardContainer.innerHTML = '';
}
