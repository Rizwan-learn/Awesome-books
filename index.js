import Book from './index2.js';

const d = new Date();
document.getElementById('time').innerHTML = d.toUTCString();
document.getElementById('firstBlock').style.display = 'block';
document.getElementById('secondBlock').style.display = 'none';
document.getElementById('contact').style.display = 'none';

document.getElementById('first').addEventListener('click', () => {
  document.getElementById('firstBlock').style.display = 'block';
  document.getElementById('secondBlock').style.display = 'none';
  document.getElementById('contact').style.display = 'none';
  document.getElementById('first').style.color = 'blue';
  document.getElementById('third').style.color = 'black';
  document.getElementById('second').style.color = 'black';
}, false);

document.getElementById('second').addEventListener('click', () => {
  document.getElementById('firstBlock').style.display = 'none';
  document.getElementById('secondBlock').style.display = 'block';
  document.getElementById('contact').style.display = 'none';
  document.getElementById('second').style.color = 'blue';
  document.getElementById('third').style.color = 'black';
  document.getElementById('first').style.color = 'black';
}, false);
document.getElementById('third').addEventListener('click', () => {
  document.getElementById('firstBlock').style.display = 'none';
  document.getElementById('secondBlock').style.display = 'none';
  document.getElementById('contact').style.display = 'block';
  document.getElementById('third').style.color = 'blue';
  document.getElementById('second').style.color = 'black';
  document.getElementById('first').style.color = 'black';
}, false);

class Books {
  constructor() {
    this.books = [];
  }

  initialize() {
    const dataString = localStorage.getItem('bookData');
    if (dataString) {
      this.books = JSON.parse(dataString).map((book) => new Book(book.title, book.author));
      this.setHtml();
    }
    this.setupRemove();
  }

  setupRemove() {
    const remove = document.querySelectorAll('.remove');
    const book = document.querySelectorAll('.book');

    remove.forEach((button, i) => {
      button.addEventListener('click', () => {
        book[i].remove();
        this.books.splice(i, 1);
        localStorage.setItem('bookData', JSON.stringify(this.books));
      });
    });
  }

  newBook(title, author) {
    const book = new Book(title, author);
    this.books.push(book);
    localStorage.setItem('bookData', JSON.stringify(this.books));
    this.setHtml();
    return book;
  }

  getBookList() {
    let containerHtml = '';
    this.books.forEach((book) => {
      containerHtml += book.getHtml();
    });
    return containerHtml;
  }

  setHtml() {
    const container = document.querySelector('.container');
    container.innerHTML = this.getBookList();
    this.setupRemove();
  }
}

const bookRepo = new Books();

bookRepo.initialize();

const addBook = function () {
  const form = document.getElementById('book-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { title, author } = form.elements;
    bookRepo.newBook(title.value, author.value);

    title.value = '';
    author.value = '';
  });
};

addBook();