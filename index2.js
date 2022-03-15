export default class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  getHtml() {
    return `<div class="book">
      <p>"${this.title}" by 
      ${this.author}</p>
      <button class="remove">Remove</button>
      </div>`;
  }
}