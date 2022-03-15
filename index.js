class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
    getHtml() {
        return `<div class="book">
      <p>${this.title}</p>
      <p>${this.author}</p>
      <button class="remove">Remove</button>
      <hr />
      </div>`;
    }
}

class Books {
    constructor() {
        this.books = []
    }
    initialize() {
        const dataString = localStorage.getItem('bookData');
        if (dataString) {
            this.books = JSON.parse(dataString).map(book => new Book(book.title, book.author));
            this.setHtml()
        }
        this.setupRemove()

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
        let book = new Book(title, author);
        this.books.push(book)
        localStorage.setItem('bookData', JSON.stringify(this.books));
        this.setHtml();
        return book
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
        this.setupRemove()
    }

}

const bookRepo = new Books();

bookRepo.initialize();

const addBook = function() {
    let form = document.getElementById('book-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const { title, author } = form.elements;
        bookRepo.newBook(title.value, author.value);

        title.value = ''
        author.value = ''
    });
};

addBook();