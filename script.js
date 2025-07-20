let searchInput = document.getElementById("search-input");
let wordDetails = document.querySelector(".word-details");
let wordMeaning = document.querySelector(".word-meaning");
let wordExample = document.querySelector(".example");
let wordSynonym = document.querySelector(".synonym");
let wordDefinition = document.querySelector(".definition");
let wordAntonym = document.querySelector(".antonym");
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
    wordDetails.innerHTML = `
   <h3>${data[0].word}</h3>
   <p>${data[0].meanings[0].partOfSpeech} ${data[0].phonetics[0].text || ''}</p>
  `
  wordDefinition.textContent = data[0].meanings[0].definitions[0].definition
    wordExample.textContent = data[0].meanings[0].definitions[0].example || "No example available";
    wordSynonym.textContent = data[0].meanings[0].synonyms[0] || "No synonyms available";
    wordAntonym.textContent = data[0].meanings[0].antonyms[0] || "No antonyms available";
  } catch (error) {
    console.error("Error fetching the data", error);
  }
  
};