export default class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  getHtml() {
    return `<ul class="book">
      <li>"${this.title}" by 
      ${this.author}</li>
      <button class="remove">Remove</button>
      </ul>`;
  }
}