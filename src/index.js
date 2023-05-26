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
    const { name, capital, population, flags, languages } = country;
    console.log(languages);
    const listItem = document.createElement('li');
    const flagImage = document.createElement('img');
    const countryName = document.createElement('h2');
    const countryDetails = document.createElement('p');

    flagImage.src = flags.svg;
    flagImage.alt = `${name} Flag`;
    countryName.textContent = name.official;

    console.log(languages.map(lang => lang.name).join(', '));
    countryDetails.innerHTML = `
      <strong>Capital:</strong> ${capital}<br>
      <strong>Population:</strong> ${population}<br>
      <strong>Languages:</strong> ${Object.values(languages)}
    `;

    listItem.appendChild(flagImage);
    listItem.appendChild(countryName);
    listItem.appendChild(countryDetails);

    countryList.appendChild(listItem);
  });
}

function showCountryNotFoundError() {
  Notify.failure('Oops, there is no country with that name.');
}

const handleSearch = debounce(() => {
  const searchTerm = countryInput.value.trim();

  if (searchTerm !== '') {
    fetchCountriesData(searchTerm)
      .then(countries => {
        displayCountries(countries);
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
