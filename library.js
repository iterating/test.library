class Book {
  constructor(name, author, status) {
    this.name = name;
    this.author = author;
    this.status = status;
  }
  //Book's status is a boolean
  toggleRead() {
    this.status = !this.status;
  }
}

const myLibrary = [
  { name: "Eloquent JavaScript", author: "Marjin Haverbeke", status: true },
  { name: "Fight Less Love More", author: "Laurie Puhn", status: false },
  { name: "The Book of Cocktail Ratios", author: "Michael Ruhlman", status: true },
  ];


//What we can do with a book
const $name = document.querySelector("#name");
const $author = document.querySelector("#author");
const $status = document.querySelector("#status");
const $tableBody = document.querySelector("#book-table-body");

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  displayBooks();
  clearForm();
});

//use `target` to return the element that is clicked
document.querySelector("table").addEventListener("click", (e) => {
  const selector = e.target.parentNode.parentNode.childNodes[1];
  if (e.target.innerHTML === "delete") { 
    if (confirm(`Delete ${selector.innerText} from your library?`)) 
      deleteBook(findBook(myLibrary, .innerText));
    }
  
  if (e.target.classList.contains("status-button")) {
    toggleRead(findBook(myLibrary, selector.innerText));
  }
  updateLocalStorage();
  displayBooks();

});


// use array.push to add new book to myLibrary array
function addBookToLibrary() {
  const newBook = new Book($name.value, $author.value, $status.value === "true");
  myLibrary.push(newBook);
  updateLocalStorage();
}

//save myLibrary as JSON to localStorage so app has persistence
function updateLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

//get myLibrary from localStorage 
function getLocalStorage() {
  const storedLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  if (storedLibrary) {
    myLibrary.length = 0; // Clear the array while keeping the reference
    myLibrary.push(...storedLibrary); // Add the stored books to the array
  }
}

//Get the index of the book in the library
function findBook(libraryArray, name) {
  if (libraryArray.length === 0 || libraryArray === null) {
    return;
  }
  for (const book of libraryArray) {
    if (book.name === name) {
      return libraryArray.indexOf(book);
    }
  }
}

function deleteBook(bookIndex) {
  if (bookIndex >= 0) {
    myLibrary.splice(bookIndex, 1); // Remove the book at the given index
    updateLocalStorage();
    displayBooks();
  }
}

function toggleRead(bookIndex) {
  if (bookIndex !== -1)
    myLibrary[bookIndex].status = !myLibrary[bookIndex].status;
  updateLocalStorage();
  displayBooks();
}

//display books as table rows in the tablebody
function displayBooks() {
  getLocalStorage();
  $tableBody.innerHTML = "";
  myLibrary.forEach((book) => {
    const showBook = `
      <tr>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td><button class="status-button">${book.status}</button></td>
        <td><button class="delete">delete</button></td>
      </tr>
    `;
    $tableBody.insertAdjacentHTML("beforeend", showBook);
  });
}

displayBooks();

function clearForm() {
  $name.value = "";
  $author.value = "";
  $status.value = "true"; // Reset the select
}
