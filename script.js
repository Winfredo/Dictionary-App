let searchInput = document.getElementById("search-input");
let resultsDisplay = document.querySelector(".results-display");
const clearBtn = document.getElementById("clear-btn");

searchInput.addEventListener("input", () => {
  const trimmedValue = searchInput.value.trim();
  clearBtn.style.display = trimmedValue ? "block" : "none";

  if (trimmedValue === "") {
    resultsDisplay.innerHTML = `
     <p class="explanation-text">
            Type a word and press enter to get meaning,example,synonyms and
            antonyms of that typed word.
          </p>
    `;
  }
});

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    fetchData();
  }
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  clearBtn.style.display = "none";
  resultsDisplay.innerHTML = `
     <p class="explanation-text">
            Type a word and press enter to get meaning,example,synonyms and
            antonyms of that typed word.
          </p>
    `;
  searchInput.focus();
});

let fetchData = async () => {
  try {
    let searchValue = searchInput.value.toLowerCase();
    resultsDisplay.innerHTML = `<p class="loading-message">Searching the meaning of "${searchValue}"</p>`;

    let res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`
    );
    let data = await res.json();
    console.log(data);
    if (data.title === "No Definitions Found") {
      resultsDisplay.innerHTML = `<p class="error-message">No results found for "${searchInput.value}". Please try another word.</p>`;
      return;
    }
    resultsDisplay.innerHTML = `
      <div class="results-content fade-in">

 <div class="word-details">
            <h3>${data[0].word}</h3>
            <p>${data[0].meanings[0].partOfSpeech} ${
      data[0].phonetics[0].text || ""
    }</p>
          </div>
          <div class="divider"></div>

          <div class="word-meaning">
            <h4>Meaning</h4>
            <p class="definition">
              ${data[0].meanings[0].definitions[0].definition}
            </p>
          </div>
          <div class="divider"></div>

          <div class="word-example">
            <h4>Example</h4>
            <p class="example">${
              data[0].meanings[0].definitions[0].example ||
              "No example available"
            }</p>
          </div>
          <div class="divider"></div>

          <div class="word-synonyms">
            <h4>Synonyms</h4>
            <p class="synonym">${
              data[0].meanings[0].synonyms[0] || "No synonyms available"
            }</p>
          </div>
          <div class="divider"></div>

          <div class="word-antonyms">
            <h4>Antonyms</h4>
            <p class="antonym">${
              data[0].meanings[0].antonyms[0] || "No antonyms available"
            }</p>
          </div>
          <div class="divider"></div>
            </div>
`;
  } catch (error) {
    console.error("Error fetching the data", error);
    resultsDisplay.innerHTML = `<p class="error-message">Something went wrong. Please try again later.</p>`;
  }
};
