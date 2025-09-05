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
                  <button id="lesson-btn-${lesson.level_no}" onclick="loadWordLevel(${lesson.level_no})" class="btn btn-outline btn-primary lesson-button"> <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
                  </button>
        `
        // step: 4 append child to parents
        levelContainer.appendChild(btnContainer)
    }
}

// function for loading word
const loadWordLevel = (id) => {
    const wordUrl = `https://openapi.programming-hero.com/api/level/${id}`
    console.log(wordUrl)
    fetch(wordUrl)
        .then(response => response.json())
        .then(wordLevel => {
            removeActive(); // remove active class 
            // select lesson button 
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active"); // added active btn color
            displayWords(wordLevel.data);
        })
}


// function for removing active button color
const removeActive = () => {
    // select all buttons
    const lessonButtons = document.querySelectorAll(".lesson-button");

    // get each lesson button and remove active class
    lessonButtons.forEach(button => button.classList.remove("active"))
}

// function for displaying words
const displayWords = (words) => {
    // step: 1 get the word container  and empty it
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";
    // checking words length 
    if (words.length == 0) {
        wordContainer.innerHTML = `
         <div class="flex flex-col items-center justify-between col-span-full space-y-3">
                <img src="./assets/alert-error.png" alt="">
                <p class="text-xl text-[#79716B] font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="text-4xl text-[#292524] font-bold font-bangla">নেক্সট Lesson এ যান</h2>               
            </div>        
         `;
        return
    }

    // step: 2 get into every word 
    words.forEach(word => {
        // step : 3 create element
        const wordCard = document.createElement('div');
        wordCard.innerHTML = `
         
             <div class="bg-white text-center space-y-5 p-6 rounded-xl">
                <h2 class="text-4xl font-bold">${word.word ? word.word : "Word Not Found"}</h2>
                <p class="font-semibold ">Meaning / Pronunciation</p>
                <p class= "font-bangla font-bold text-lg">${word.meaning ? word.meaning : "Meaning Not Found"} / ${word.pronunciation ? word.pronunciation : "Pronunciation Not Found"}</p>
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