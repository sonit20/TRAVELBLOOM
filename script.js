const searchBtn = document.querySelector(".search-btn");
const clearBtn = document.querySelector(".clear-btn");
const searchInput = document.querySelector("#searchInput");
const resultsContainer = document.querySelector("#results");

function search() {
  const searchValue = searchInput.value.trim().toLowerCase();

  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      resultsContainer.innerHTML = "";

      if (searchValue === "beach" || searchValue === "beaches") {
        displayResults(data.beaches);
      } else if (searchValue === "temple" || searchValue === "temples") {
        displayResults(data.temples);
      } else {
        // Check if the search term matches a country
        const country = data.countries.find(
          (c) => c.name.toLowerCase() === searchValue
        );

        if (country) {
          displayResults(country.cities);
        } else {
          resultsContainer.innerHTML = `<h2>No results found.</h2>`;
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function displayResults(items) {
  items.forEach((item) => {
    const card = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("h4");
    const description = document.createElement("p");
    const visitBtn = document.createElement("button");

    image.src = item.imageUrl;
    image.alt = item.name;
    title.textContent = item.name;
    description.textContent = item.description;
    visitBtn.textContent = "Visit";

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(visitBtn);
    resultsContainer.appendChild(card);
  });
}

function clear() {
  searchInput.value = "";
  resultsContainer.innerHTML = "";
}

searchBtn.addEventListener("click", search);
clearBtn.addEventListener("click", clear);
