const myLibrary = [];
myLibrary[0] = new Book("Kevin", "This is an awesome book!", 321, true);
myLibrary[1] = new Book("Gus", "Also a great book!", 200, false);

const content = document.querySelector(".container .content");
const bookForm = document.querySelector(".content .book-form");
const newBookButton = document.querySelector("#new-button");
const addBookButton = document.querySelector("#add-button");
const cards = document.querySelector(".content .cards");

// form data
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const numberOfPages = document.querySelector("#numberofpages");
const wasRead = document.querySelector("#wasread");

let checkRadioButton = false;

function Book(author, title, numberOfPages, wasRead) {
  this.author = author;
  this.title = title;
  this.numberOfPages = numberOfPages;
  this.wasRead = wasRead;
}

Book.prototype.toggleRead = function() {
  this.wasRead = !this.wasRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function validateFields(titleField, authorField, pagesField, wasReadField) {
  const title = titleField.trim();
  const author = authorField.trim();
  const pages = parseInt(pagesField);
  const wasRead = wasReadField;

  if (title === "" || author === "" || (isNaN(pages) || pages === 0)) {
    return null;
  }
  return new Book(title, author, pages, wasRead);
}

function clearFields() {
  title.value = "";
  author.value = "";
  numberOfPages.value = "";
  wasRead.checked = false;
}

function printBooks() {
  for (const book of myLibrary) {
    console.log(book);
  }
}

function renderLastBook(book) {
  const card = document.createElement("div");
  const title = document.createElement("div");
  const author = document.createElement("div");
  const pages = document.createElement("div");
  const read = document.createElement("div");
  const message = document.createElement("div");
  const toggleRead = document.createElement("button");
  const deleteButton = document.createElement("button");

  // add classes
  card.setAttribute("class", "card");
  title.setAttribute("class", "title");
  author.setAttribute("class", "author");
  pages.setAttribute("class", "pages")
  read.setAttribute("class", "read");
  message.setAttribute("class", "message");
  toggleRead.setAttribute("class", "toggleread");
  deleteButton.setAttribute("class", "delete");
  
  // card children
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);
  card.appendChild(deleteButton);

  // read children
  read.appendChild(message);
  read.appendChild(toggleRead);

  // text
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.numberOfPages;
  toggleRead.textContent = "Update";
  deleteButton.textContent = "Delete";

  if (book.wasRead) {
    message.textContent = "Read book";
  } else {
    message.textContent = "Unread book";
  }

  toggleRead.addEventListener("click", () => {
    book.wasRead = !book.wasRead;
    removeBooksFromScreen();
    renderBooks();
  });
  deleteButton.addEventListener("click", () => {
    
  });
  
  // append to cards
  cards.appendChild(card);
}

function removeBooksFromScreen() {
  const allCards = document.querySelectorAll(".card");
  for (const card of allCards) {
    cards.removeChild(card);
  }
}

function renderBooks() {
  for (const book of myLibrary) {
    renderLastBook(book);
  }
}

newBookButton.addEventListener("click", () => {
  const mode = getComputedStyle(bookForm).getPropertyValue("display");
  if (mode === "grid") {
    bookForm.style.display = "none";
    content.style.gridTemplateColumns = "1fr";
    newBookButton.textContent = "NEW BOOK";
  } else if (mode === "none") {
    bookForm.style.display = "grid";
    content.style.gridTemplateColumns = "2fr 1fr";
    newBookButton.textContent = "CLOSE";
  }
});

addBookButton.addEventListener("click", (e) => {
  e.preventDefault();
  const book = validateFields(title.value, author.value, numberOfPages.value, wasRead.checked);

  if (book) {
    addBookToLibrary(book);
    clearFields();
    renderLastBook(book);
  }
  console.log(myLibrary);
});

wasRead.addEventListener("click", () => {
  if (checkRadioButton) {
    wasRead.checked = false;
  }
  checkRadioButton = !checkRadioButton;
});

renderBooks();
