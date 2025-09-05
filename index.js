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
    <button onClick="loadWard(${lesson.level_no})" class="btn btn-outline btn-primary btn-sm flex items-center gap-1 ">
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
    console.log(lesson.level_no);
  });
};

const loadWard = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => UiShowingWord(data.data));
};

const UiShowingWord = (words) => {
  //get Level-word-container div
  const levelWordDiv = document.getElementById("Level-word-container");
  levelWordDiv.innerHTML = "";
  words.map((word) => {
    const createDiv = document.createElement("div");
    createDiv.innerHTML = `
<div class="card bg-white shadow-md rounded-xl p-6 text-center">
<h2 class="font-bold text-xl">${word.word}</h2>
<p class="text-gray-500 text-sm mt-1">Meaning / Pronunciation</p>
<p class="mt-3 text-lg font-medium bangla-font">${word.pronunciation}/${word.meaning}</p>
<div class="flex justify-between mt-6">
<!-- Info Button -->
<button class="btn btn-sm bg-blue-100 text-blue-600 border-none">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-info-icon lucide-badge-info"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
</button>

<!-- Volume Button -->
<button class="btn btn-sm bg-blue-100 text-blue-600 border-none">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume2-icon lucide-volume-2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg>
</button>
  </div>
</div>
    `;
    levelWordDiv.append(createDiv);
  });
};
loadLesson();
