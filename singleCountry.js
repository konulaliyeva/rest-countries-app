const darkModeBtn = document.getElementById("darkMode");
const body = document.querySelector("body");
const searchInput = document.getElementById("searchInput");

darkModeBtn.onclick = function () {
  const theme = document.documentElement.dataset.theme;

  if (theme === "light") {
    document.documentElement.dataset.theme = "dark";
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.dataset.theme = "light";
    localStorage.setItem("theme", "light");
  }
};

      const backBtn = document.getElementById("backBtn");
      const contentContainer = document.getElementById("content_container");
      const url = new URL(location.href);
      const countryName = url.searchParams.get("name");

      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        document.documentElement.dataset.theme = savedTheme;
      }

      if (url.searchParams.has("name")) {
        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
          .then((res) => res.json())
          .then((data) => {
            let countryHTML = getSingleCountry(data[0]);

            contentContainer.insertAdjacentHTML("afterbegin", countryHTML);
          });
      }

      function getSingleCountry({
        name,
        flags,
        region,
        subregion,
        languages,
        population,
        borders,
        capital,
        currencies,
      }) {
        return `<div class="left-section">
            <img src="${flags.svg || flags.png}" alt="" />
          </div>
          <div class="right_section">
            <h2>${name.common}</h2>
            <div class="right_section_text_columns">
              <div class="right_section_left_column">
                <p><span class="json_data_headers">Native Name: </span> ${
                  name.official
                }</p>
                <p><span class="json_data_headers">Population: </span> ${population}</p>
                <p><span class="json_data_headers">Region: </span> ${region}</p>
                <p><span class="json_data_headers">Sub-region: </span> ${subregion}</p>
                <p><span class="json_data_headers">Capital: </span> ${capital}</p>
              </div>
              <div class="right_section_right_column">
                <p> <span class="json_data_headers">Top Level Domain: </span> </p>
                <p><span class="json_data_headers">Languages: </span> ${Object.values(
                  languages
                )}</p>
              </div>
            </div>
            <div class="borders">
              <p><span class="json_data_headers">Borders: </span> ${
                borders && borders.length !== 0
                  ? borders
                      .map(
                        (border) => `<p class="borderCountries">${border}</p>`
                      )
                      .join("")
                  : " Not found"
              }</p>
            </div>
          </div>`;
      }

      backBtn.onclick = function () {
        window.location.href = "index.html";
      };
