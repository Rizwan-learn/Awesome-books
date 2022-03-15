// ARRAY OF OBJECTS TO STORE A LIST OF BOOKS

const bookCollection = [];

// Add book function
const form = document.getElementById('book-form');
const { title, author } = form.elements;

const addBook = function () {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      title: title.value,
      author: author.value,
    };

    bookCollection.push(formData);
    localStorage.setItem('bookData', JSON.stringify(bookCollection));
    window.location.reload();
  });
};

// PRESERVE DATA IN THE BROWSER (LOCAL STORAGE)

const fillForm = localStorage.getItem('bookData');

if (fillForm) {
  const data = JSON.parse(localStorage.getItem('bookData'));

  bookCollection.push(...data);
}

// CREATING BOOKS FROM ARRAY DATA AND POPULATING DYNAMICALLY

const container = document.querySelector('.container');

bookCollection.forEach((book) => {
  const content = `<div class="book">
<p>${book.title}</p>
<p>${book.author}</p>
<button class="remove">Remove</button>
<hr />
</div>`;

  container.innerHTML += content;
});

// Remove book function

const removeBook = function () {
  const remove = document.querySelectorAll('.remove');
  const book = document.querySelectorAll('.book');

  remove.forEach((button, i) => {
    button.addEventListener('click', () => {
      book[i].remove();
      bookCollection.splice(i, 1);
      localStorage.setItem('bookData', JSON.stringify(bookCollection));
    });
  });
};

addBook();
removeBook();