// dark mode
const darkModeBtn = document.getElementById("darkMode");
const body = document.querySelector("body");
const searchInput = document.getElementById("searchInput");

darkModeBtn.onclick = function () {
  const theme = document.documentElement.dataset.theme;

  if (theme === "light") {
    document.documentElement.dataset.theme = "dark";
  } else {
    document.documentElement.dataset.theme = "light";
  }
};

const regions=document.getElementById("regions");
const allCountriesContainer = document.getElementById('allCountriesContainer');
async function getData() {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const countries = await response.json(); // Extracting data as a JSON Object from the response
  let filteredCountries = [];
// filtering countries over the regions
  let filtredByRegions = [];
  regions.addEventListener('change', ()=>{
    let selectedValue= regions.value;
    filtredByRegions = countries.filter((country)=>{
      country.region === selectedValue;

    });

    console.log(filtredByRegions)
    let eachCountry = '';
    for (let country of filtredByRegions) {
      eachCountry += getCountryDetails(country);
    }
  
    allCountriesContainer.innerHTML = eachCountry;
  });
  // -----------------------------------------
  searchInput.addEventListener('input', (event) => {
    let value = event.target.value;
    value = value.toLowerCase();
    filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value)
    );

    let eachCountry = '';
    for (let country of filteredCountries) {
      eachCountry += getCountryDetails(country);
    }
    console.log('filteredCountries', filteredCountries);
    allCountriesContainer.innerHTML = eachCountry;
  });

  let eachCountry = '';
  for (let country of countries) {
    eachCountry += getCountryDetails(country);
  }
  allCountriesContainer.innerHTML = eachCountry;
}

getData();

function getCountryDetails({ flags, population, region, capital, name }) {
  return ` <div class="country">
    <img src="${flags.png || flags.svg}" />
    <div class="details_about-country">
        <h4>${name.common}</h4>
        <p>Population: <span>${population}</span></p>
        <p>Region: <span>${region}</span></p>
        <p>Capital: <span>${capital}</span></p>
    </div>

</div>`;
}

