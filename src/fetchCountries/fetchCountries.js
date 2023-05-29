const URL_API = 'https://restcountries.com/#api-endpoints-v3-name';

function fetchCountriesData(name) {
  return fetch(
    `${URL_API}/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error('Country not found');
    }

    return response.json();
  });
}

export { fetchCountriesData };
