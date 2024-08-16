// book properties and default values
class Book {
  constructor(
    name = 'Unknown',
    author = 'Unknown',
    status = false) {
    this.name = name;
    this.author = author;
    this.status = status;
  }
}


// Library class with methods managing books
class Library {
  constructor() {
    this.books = [
  { name: "Eloquent JavaScript", author: "Marjin Haverbeke", status: true },
  { name: "Fight Less Love More", author: "Laurie Puhn", status: false },
  { name: "The Book of Cocktail Ratios", author: "Michael Ruhlman", status: true },
    ]
  }

  addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook)
    }
  }

  removeBook(name) {
    this.books = this.books.filter((book) => book.name !== name)
  }

  getBook(name) {
    return this.books.find((book) => book.name === name)
  }

  isInLibrary(newBook) {
    return this.books.some((book) => book.name === newBook.name)
  }
}

// save myLibrary as JSON to localStorage so app has persistence
const saveLocal = () => {
  const bookObjects = myLibrary.books.map(book => ({
    name: book.name,
    author: book.author,
    status: book.status
  }));
  localStorage.setItem("myLibrary", JSON.stringify(bookObjects));
}

// get myLibrary from localStorage 
const getLocal = () => {
  const storedBooks = JSON.parse(localStorage.getItem("myLibrary"));
  if (storedBooks) {
    myLibrary.books = storedBooks.map(bookData => new Book(bookData.name, bookData.author, bookData.status));
  }
}

const myLibrary = new Library()

// actions
const getBookFromInput = () => {
  const name = document.getElementById('name').value;
  const author = document.getElementById('author').value;
  const status = document.getElementById('status').checked;
  return new Book(name, author, status)
}

// encapsulating this per prototype pattern
const addBook = (e) => {
  e.preventDefault()
  const newBook = getBookFromInput()
  myLibrary.addBook(newBook)
  saveLocal()
  displayBooks()
  clearForm()
  }

// display books as table rows in the tablebody
const displayBooks = () => {
  getLocal();
  const $tableBody = document.querySelector("#book-table-body");
  $tableBody.innerHTML = "";
  myLibrary.books.forEach((book) => {
    const showBook = `
      <tr>
        <td style="text-align: center;">${book.name}</td>
        <td style="text-align: center;">${book.author}</td>
        <td><button class="status-button">${book.status}</button></td>
        <td><button class="delete">delete</button></td>
      </tr>
    `;
    $tableBody.insertAdjacentHTML("beforeend", showBook);
  });
}


// Use `target` to return the element that is clicked
document.querySelector("form").addEventListener("submit", addBook);
document.querySelector("table").addEventListener("click", (e) => {
  const selector = e.target.parentNode.parentNode.childNodes[1];
  if (e.target.innerHTML === "delete") { 
    if (confirm(`Delete ${selector.innerText} from your library?`)) 
      myLibrary.removeBook(selector.innerText);
      saveLocal();
      displayBooks();

    }
  
  if (e.target.classList.contains("status-button")) {
    toggleRead(selector.innerText);
  }
  saveLocal();
  displayBooks();

});


function toggleRead(name) {
  const book = myLibrary.getBook(name)
  book.status = !book.status
  saveLocal();
  displayBooks();
}


displayBooks();


function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("author").value = "";
  document.getElementById("status").checked = false; // Reset the checkbox
}