const URL_API = 'https://restcountries.com/v3.1/name';

function fetchCountriesData(name) {
  return fetch(
    `${URL_API}/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('Country not found');
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        return data;
      } else {
        return [data];
      }
    });
}

export { fetchCountriesData };
