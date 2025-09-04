// function for loading lessons
const loadLessons = () => {
    const levelUrl = "https://openapi.programming-hero.com/api/levels/all";
    fetch(levelUrl)
        .then(response => response.json())
        .then(lessons => displayLessons(lessons.data))
};

// function for displaying lessons
const displayLessons = (lessons) => {
    // step: 1  get the level container and empty it
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";
    // step: 2  get into every lessons through a loop
    for (let lesson of lessons) {

        // step: 3  create element 
        const btnContainer = document.createElement('div');

        btnContainer.innerHTML = `
                  <button onclick="loadWordLevel(${lesson.level_no})" class="btn btn-outline btn-primary"> <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
                  </button>
        `
        // step: 4 append child to parents
        levelContainer.appendChild(btnContainer)
    }
}

// function for loading word
const loadWordLevel = (id) => {

    const wordUrl = `https://openapi.programming-hero.com/api/level/${id}`

    fetch(wordUrl)
        .then(response => response.json())
        .then(wordLevel => displayWords(wordLevel.data))
}

// function for displaying words
const displayWords = (words) => {

    // step: 1 get the word container  and empty it
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";
    // step: 2 get into every word 
    words.forEach(word => {
        // step : 3 create element
        const wordCard = document.createElement('div');
        wordCard.innerHTML = `
         
             <div class="bg-white text-center space-y-5 p-6 rounded-xl">
                <h2 class="text-4xl font-bold">${word.word}</h2>
                <p class="font-semibold ">Meaning / Pronunciation</p>
                <p class= "font-bangla font-bold text-lg">${word.meaning} / ${word.pronunciation}</p>
                <div class="flex justify-between">
                    <button class="btn hover:bg-[#1A91FF80] bg-[#1A91FF10]"><i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button class="btn hover:bg-[#1A91FF80] bg-[#1A91FF10]"><i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
            </div>

         `

         // step : 4 append to the parent
        wordContainer.appendChild(wordCard)
    });

}
loadLessons()