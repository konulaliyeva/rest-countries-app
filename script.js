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

// fetching data with rest api
const allCountriesContainer = document.getElementById("allCountriesContainer");
async function getData() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json(); // Extracting data as a JSON Object from the response

  let eachCountry = "";
  for (let country of data) {
    eachCountry += getCountryDetails(country);
    //  console.log(eachCountry)
  }
  allCountriesContainer.innerHTML = eachCountry;
  // console.log(allCountriesContainer);
}
console.log(getData());

function getCountryDetails({
  flags,
  altSpellings,
  population,
  region,
  capital,
}) {
  return ` <div class="country">
    <img src="${flags.png || flags.svg}" />
    <div class="details_about-country">
        <h4>${altSpellings[1]}</h4>
        <p>Population: <span>${population}</span></p>
        <p>Region: <span>${region}</span></p>
        <p>Capital: <span>${capital}</span></p>
    </div>

</div>`;
}
let countriesArr = [];

async function getSearchData(){
  const response = await fetch('https://restcountries.com/v3.1/all');
  const jsonData = await response.json();
  for(let country of jsonData){
    countriesArr.push(country.name.common);
    countriesArr.push(country.name.official);
  }
  return countriesArr;
}
getSearchData();

// Input field
let newArr = [];
searchInput.addEventListener('input', (event)=>{
  let value = event.target.value;

  for(let i=0; i<countriesArr.length; i++){
    if(countriesArr[i].includes(value)){
     newArr.push(countriesArr[i])
    }}

    let eachCountry = "";
     for (let country of newArr) {
        let eachCountry = "";
    eachCountry += getCountryDetails(country);
    //  console.log(eachCountry)
    }
   allCountriesContainer.innerHTML = eachCountry;
     
    
    
  });
  // newArr.push(countriesArr.filter((arr)=>{
  // arr.includes(value);
  // }));


// searchInput.addEventListener("input", (e)=>{
//     let value = e.target.value;
//     searchInputFunc(value, countriesArr);

// });

// function searchInputFunc(value, array){
//     let filtredData = [];
//     for(let i=0; i<array.length; i++){
//         value = value.toLowercase();
//         let name = array[i].toLowercase();
//         if(name.includes(value)){
//             filtredData.push(array[i]);
//         }
//     }
//     return filtredData;

// }
