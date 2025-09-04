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
    <button class="btn btn-outline btn-primary btn-sm flex items-center gap-1">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
stroke-linejoin="round" class="lucide lucide-book-open-icon lucide-book-open w-4">
<path d="M12 7v14" />
<path
d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
</svg>
<span>Lesson
${lesson.level_no}

                                </span>
                            </button>
    `;
    levelVocabulary.append(createDiv);
    console.log(lesson.level_no);
  });
};

loadLesson();
