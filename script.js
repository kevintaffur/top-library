const myLibrary = [];
myLibrary[0] = new Book("Kevin", "This is an awesome book!", 321, true);
myLibrary[1] = new Book("Gus", "Also a great book!", 200, false);

const content = document.querySelector(".container .content");
const bookForm = document.querySelector(".content .book-form");
const newBookButton = document.querySelector("#new-button");

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

function printBooks() {
  for (const book of myLibrary) {
    console.log(book);
  }
}

newBookButton.addEventListener("click", (e) => {
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
