import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountriesData } from './fetchCountries/fetchCountries';

const countryInput = document.getElementById('search-box');
const countryList = document.getElementById('country-list');

function displayCountries(countries) {
  countryList.innerHTML = '';

  if (countries.length === 0) {
    return;
  }

  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  countries.forEach(country => {
    const { name, flags } = country;
    const listItem = document.createElement('li');
    const flagImage = document.createElement('img');
    const countryName = document.createElement('h2');

    flagImage.src = flags.svg;
    flagImage.alt = `${name} Flag`;
    countryName.textContent = name.official;

    listItem.appendChild(flagImage);
    listItem.appendChild(countryName);

    countryList.appendChild(listItem);
  });
}

function displayCountryDetails(country) {
  countryList.innerHTML = '';

  const { name, capital, population, flags, languages } = country;
  const listItem = document.createElement('li');
  const flagImage = document.createElement('img');
  const countryName = document.createElement('h2');
  const countryDetails = document.createElement('p');

  flagImage.src = flags.svg;
  flagImage.alt = `${name} Flag`;
  countryName.textContent = name.official;

  countryDetails.innerHTML = `
    <strong>Capital:</strong> ${capital}<br>
    <strong>Population:</strong> ${population}<br>
    <strong>Languages:</strong> ${Object.values(languages)}
  `;

  listItem.appendChild(flagImage);
  listItem.appendChild(countryName);
  listItem.appendChild(countryDetails);

  countryList.appendChild(listItem);
}

function showCountryNotFoundError() {
  Notify.failure('Oops, there is no country with that name.');
}

const handleSearch = debounce(() => {
  const searchTerm = countryInput.value.trim();

  if (searchTerm !== '') {
    fetchCountriesData(searchTerm)
      .then(countries => {
        if (countries.length === 1) {
          displayCountryDetails(countries[0]);
        } else {
          displayCountries(countries);
        }
      })
      .catch(error => {
        if (error.message === 'Country not found') {
          showCountryNotFoundError();
        } else {
          console.log('An error occurred:', error);
        }
      });
  } else {
    countryList.innerHTML = '';
  }
});

const debounce_delay = 300;

countryInput.addEventListener('input', debounce(handleSearch, debounce_delay));
