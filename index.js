const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => lessonVocabulary(data.data));
};

const lessonVocabulary = (lessons) => {
  const levelVocabulary = document.getElementById("vocabulary-container");
  lessons.forEach((lesson) => {
    // create element
    const createDiv = document.createElement("div");
    createDiv.innerHTML = `
  <button id="lesson-btn-${lesson.level_no}"  onClick="loadWord(${lesson.level_no})" class=" lesson-btn btn btn-outline btn-primary btn-sm flex items-center gap-1 ">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
stroke-linejoin="round" class="lucide lucide-book-open-icon lucide-book-open w-4">
<path d="M12 7v14" />
<path
d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
</svg>
<span>Lesson-
${lesson.level_no}

                                </span>
                            </button>
    `;
    levelVocabulary.append(createDiv);
  });
};

//remove active btn
const removeBtn = () => {
  const removeButton = document.querySelectorAll(".lesson-btn");
  removeButton.forEach((btn) => btn.classList.remove("active"));
};

// Show/Hide Spinner
const showSpinner = (status) => {
  const spinner = document.getElementById("spinner");
  const levelContainer = document.getElementById("Level-word-container");

  if (status) {
    spinner.classList.remove("hidden"); // spinner দেখাও
    levelContainer.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    levelContainer.classList.remove("hidden");
  }
};

// Load Words by Lesson ID
const loadWord = (id) => {
  showSpinner(true);

  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeBtn();
      const activeBtn = document.getElementById(`lesson-btn-${id}`);
      if (activeBtn) activeBtn.classList.add("active");

      UiShowingWord(data.data);
      showSpinner(false);
    });
};

const UiShowingWord = (words) => {
  //get Level-word-container div
  const levelWordDiv = document.getElementById("Level-word-container");

  levelWordDiv.innerHTML = "";
  if (words.length === 0) {
    levelWordDiv.innerHTML = `
             <div
                class="flex flex-col items-center justify-center col-span-full  bg-gray-200 rounded-lg text-center p-6 mx-auto ">

                <div class="mb-4">
                    <img src="./assets/alert-error.png" alt="">
                </div>

                <!-- Small Text -->
                <p class="text-gray-500 text-sm mb-2 bangla-font">
                    এই Lesson এ এখনো কোনো Vocabulary যুক্ত করা হয়নি।
                </p>

                <!-- Bold Text -->
                <h2 class="text-2xl font-bold text-gray-700 bangla-font">
                    নেক্সট Lesson এ যান
                </h2>
            </div>
  `;
    return;
  }
  words.map((word) => {
    const createDiv = document.createElement("div");
    createDiv.innerHTML = `
<div class="card bg-white shadow-md rounded-xl p-6 text-center">
<h2 class="font-bold text-xl">${word.word}</h2>
<p class="text-gray-500 text-sm mt-1">Meaning / Pronunciation</p>
<p class="mt-3 text-lg font-medium bangla-font">${
      word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
    }/${word.pronunciation}</p>
<div class="flex justify-between mt-6">
<!-- Info Button -->
<button onclick="modalWordShow(${
      word.id
    })"  class="btn btn-sm bg-blue-100 text-blue-600 border-none">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-info-icon lucide-badge-info"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
</button>

<!-- Volume Button -->
<button onclick="speakWord('${word.word}')"
 class="btn btn-sm bg-blue-100 text-blue-600 border-none">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume2-icon lucide-volume-2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg>
</button>
  </div>
</div>
    `;
    levelWordDiv.append(createDiv);
  });
};

// Function for Text-to-Speech
// ✅ এখন এই ফাংশনটা UiShowingWord এর বাইরে রাখো
const speakWord = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // English voice
    speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support speech synthesis.");
  }
};

const modalWordShow = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/word/${id}`
  );
  const data = await res.json();
  showWordDetails(data.data);
};
const showWordDetails = (details) => {
  console.log(details);
  const my_modal = document.getElementById("modal-container");
  my_modal.innerHTML = "";
  const createDiv = document.createElement("div");
  createDiv.innerHTML = `
    <!-- Title -->
    <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
     ${details.word} <span class="text-gray-500 text-base sm:text-lg">${details.pronunciation}</span>
    </h2>

    <!-- Meaning -->
    <div class="mb-4">
      <h3 class="font-semibold text-gray-700">Meaning</h3>
      <p class="text-gray-600 text-base sm:text-lg">${details.meaning}</p>
    </div>

    <!-- Example -->
    <div class="mb-4">
      <h3 class="font-semibold text-gray-700">Example</h3>
      <p class="text-gray-600 text-base sm:text-lg">
        ${details.sentence}
      </p>
    </div>

    <!-- Synonyms -->
    <div class="mb-4">
      <h3 class="font-semibold text-gray-700 mb-2 bangla-font">সমার্থক শব্দ গুলো</h3>
      <div class="flex flex-wrap gap-2">
        <span
          class="badge badge-outline px-3 py-2 text-sm sm:text-base"
          >${details.synonyms}</span
        >
       
      </div>
    </div>

    <!-- Complete Button -->
    <form method="dialog">
      <button
        class="btn w-full sm:w-auto bg-indigo-600 text-white hover:bg-indigo-700 mt-3"
      >
        Complete Learning
      </button>
    </form>
  </div>
  
  `;
  my_modal.append(createDiv);
  console.log(details);
  document.getElementById("my_modal").showModal();
  showSpinner(false);
};
loadLesson();
