let searchInput = document.getElementById("search-input");
let wordDetails = document.querySelector(".word-details");
let wordMeaning = document.querySelector(".word-meaning");
let wordExample = document.querySelector(".example");
let wordSynonym = document.querySelector(".synonym");
let wordDefinition = document.querySelector(".definition");
let wordAntonym = document.querySelector(".antonym");
let resultsDisplay = document.querySelector(".results-display");
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    fetchData();
  }
});

let fetchData = async () => {
  try {
    let searchValue = searchInput.value.toLowerCase();
    let res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`
    );
    let data = await res.json();
    console.log(data);
    resultsDisplay.innerHTML = `
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
`;
  } catch (error) {
    console.error("Error fetching the data", error);
  }
};
