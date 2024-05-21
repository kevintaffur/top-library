const myLibrary = [];
myLibrary[0] = new Book("Kevin", "This is an awesome book!", 321, true);
myLibrary[1] = new Book("Gus", "Also a great book!", 200, false);


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
