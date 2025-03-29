const classes = [5, 6, 7, 8, 9, 10];
const subjects = {
  5: ["Maths", "Science", "English", "Social Studies"],
  6: ["Maths", "Science", "English", "History", "Geography"],
  7: ["Maths", "Science", "English", "Civics", "History"],
  8: ["Maths", "Science", "English", "Physics", "Chemistry"],
  9: ["Maths", "Science", "English", "Economics", "Biology"],
  10: ["Maths", "Science", "English", "History", "Political Science"],
};

// Sample NCERT Book URLs
const books = {
  Maths: ["NCERT Maths Part 1", "NCERT Maths Part 2"],
  Science: ["NCERT Science Book"],
  English: ["NCERT English Literature"],
  "Social Studies": ["NCERT Social Studies"],
  History: ["NCERT History"],
  Geography: ["NCERT Geography"],
  Civics: ["NCERT Civics"],
  Physics: ["NCERT Physics"],
  Chemistry: ["NCERT Chemistry"],
  Economics: ["NCERT Economics"],
  Biology: ["NCERT Biology"],
  "Political Science": ["NCERT Political Science"],
};

// HTML Elements
const classSelection = document.getElementById("class-selection");
const subjectSelection = document.getElementById("subject-selection");
const bookList = document.getElementById("book-list");
const classesDiv = document.getElementById("classes");
const subjectsDiv = document.getElementById("subjects");
const booksUl = document.getElementById("books");
const selectedSubjectSpan = document.getElementById("selected-subject");
const favoritesList = document.getElementById("favorites-list");
const favoritesSection = document.getElementById("favorites-section");

// Load Favorite Books from Local Storage
let favoriteBooks = JSON.parse(localStorage.getItem("favoriteBooks")) || [];

// Display Favorite Books
function displayFavorites() {
  favoritesList.innerHTML = "";
  if (favoriteBooks.length > 0) {
    favoritesSection.classList.remove("hidden");
    favoriteBooks.forEach((book) => {
      let li = document.createElement("li");
      li.textContent = book;
      favoritesList.appendChild(li);
    });
  } else {
    favoritesSection.classList.add("hidden");
  }
}

// Show class selection
classes.forEach((cls) => {
  let btn = document.createElement("button");
  btn.textContent = `Class ${cls}`;
  btn.classList = "bg-blue-500 text-white px-4 py-2 rounded w-full";
  btn.onclick = () => showSubjects(cls);
  classesDiv.appendChild(btn);
});

// Show subjects for selected class
function showSubjects(cls) {
  classSelection.classList.add("hidden");
  subjectSelection.classList.remove("hidden");
  subjectsDiv.innerHTML = "";
  subjects[cls].forEach((subject) => {
    let btn = document.createElement("button");
    btn.textContent = subject;
    btn.classList = "bg-green-500 text-white px-4 py-2 rounded w-full";
    btn.onclick = () => showBooks(subject);
    subjectsDiv.appendChild(btn);
  });
}

// Show books for selected subject
function showBooks(subject) {
  subjectSelection.classList.add("hidden");
  bookList.classList.remove("hidden");
  selectedSubjectSpan.textContent = subject;
  booksUl.innerHTML = "";
  (books[subject] || []).forEach((book) => {
    let li = document.createElement("li");
    li.innerHTML = `${book} <button onclick="addToFavorites('${book}')" class="bg-yellow-500 text-white px-2 py-1 rounded ml-2">⭐</button>`;
    booksUl.appendChild(li);
  });
}

// Add to favorites
function addToFavorites(book) {
  if (!favoriteBooks.includes(book)) {
    favoriteBooks.push(book);
    localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
    displayFavorites();
  }
}

// Search Books
function searchBooks() {
  let query = document.getElementById("searchInput").value.toLowerCase();
  let allBooks = Object.values(books).flat();
  let searchResults = allBooks.filter((book) =>
    book.toLowerCase().includes(query)
  );

  booksUl.innerHTML = "";
  searchResults.forEach((book) => {
    let li = document.createElement("li");
    li.textContent = book;
    booksUl.appendChild(li);
  });

  if (query === "") booksUl.innerHTML = ""; // Clear if empty search
}

// Go back functions
function goBackToClasses() {
  subjectSelection.classList.add("hidden");
  classSelection.classList.remove("hidden");
}

function goBackToSubjects() {
  bookList.classList.add("hidden");
  subjectSelection.classList.remove("hidden");
}

// Display favorites on page load
displayFavorites();
