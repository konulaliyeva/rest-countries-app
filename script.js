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


const allCountriesContainer = document.getElementById('allCountriesContainer');
async function getData() {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const countries = await response.json(); // Extracting data as a JSON Object from the response
  let filteredCountries = [];

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


// const darkModeBtn = document.getElementById("darkMode");
// const body = document.querySelector("body");
// const searchInput = document.getElementById("searchInput");

// darkModeBtn.onclick = function () {
//   const theme = document.documentElement.dataset.theme;

//   if (theme === "light") {
//     document.documentElement.dataset.theme = "dark";
//   } else {
//     document.documentElement.dataset.theme = "light";
//   }
// };

// // fetching data with rest api
// const allCountriesContainer = document.getElementById("allCountriesContainer");
// async function getData() {
//   const response = await fetch("https://restcountries.com/v3.1/all");
//   const data = await response.json(); // Extracting data as a JSON Object from the response

//   let eachCountry = "";
//   for (let country of data) {
//     eachCountry += getCountryDetails(country);
//     //  console.log(eachCountry)
//   }
//   allCountriesContainer.innerHTML = eachCountry;
//   // console.log(allCountriesContainer);
// }
// console.log(getData());

// function getCountryDetails({
//   flags,
//   altSpellings,
//   population,
//   region,
//   capital,
// }) {
//   return ` <div class="country">
//     <img src="${flags.png || flags.svg}" />
//     <div class="details_about-country">
//         <h4>${altSpellings[1]}</h4>
//         <p>Population: <span>${population}</span></p>
//         <p>Region: <span>${region}</span></p>
//         <p>Capital: <span>${capital}</span></p>
//     </div>

// </div>`;
// }
// let countriesArr = [];

// async function getSearchData(){
//   const response = await fetch('https://restcountries.com/v3.1/all');
//   const jsonData = await response.json();
//   for(let country of jsonData){
//     countriesArr.push(country.name.common);
//     countriesArr.push(country.name.official);
//   }
//   return countriesArr;
// }
// getSearchData();

// // Input field
// let newArr = [];
// searchInput.addEventListener('input', (event)=>{
//   let value = event.target.value;

//   for(let i=0; i<countriesArr.length; i++){
//     if(countriesArr[i].includes(value)){
//      newArr.push(countriesArr[i])
//     }}

//     let eachCountry = "";
//      for (let country of newArr) {
//         let eachCountry = "";
//     eachCountry += getCountryDetails(country);
//     //  console.log(eachCountry)
//     }
//    allCountriesContainer.innerHTML = eachCountry;
     
    
    
//   });
//   // newArr.push(countriesArr.filter((arr)=>{
//   // arr.includes(value);
//   // }));


// // searchInput.addEventListener("input", (e)=>{
// //     let value = e.target.value;
// //     searchInputFunc(value, countriesArr);

// // });

// // function searchInputFunc(value, array){
// //     let filtredData = [];
// //     for(let i=0; i<array.length; i++){
// //         value = value.toLowercase();
// //         let name = array[i].toLowercase();
// //         if(name.includes(value)){
// //             filtredData.push(array[i]);
// //         }
// //     }
// //     return filtredData;

// // }
