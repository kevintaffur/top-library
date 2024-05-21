const myLibrary = [];
myLibrary[0] = new Book("Kevin", "This is an awesome book!", 321, true);
myLibrary[1] = new Book("Gus", "Also a great book!", 200, false);

const content = document.querySelector(".container .content");
const bookForm = document.querySelector(".content .book-form");
const newBookButton = document.querySelector("#new-button");
const addBookButton = document.querySelector("#add-button");

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
  }
  console.log(myLibrary);
});

wasRead.addEventListener("click", () => {
  if (checkRadioButton) {
    wasRead.checked = false;
  }
  checkRadioButton = !checkRadioButton;
});
