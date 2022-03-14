const stored = localStorage.getItem('arr');
let arr = stored ? JSON.parse(stored) : [];

document.getElementById('book').innerHTML = arr.map(e => `<li>${e.Title}</br> ${e.Author}</li><button id="btn">${e.Button}</button><hr>`).join(' ')

function toStore() {
    let books = {
        Title: '',
        Author: '',
        Button: 'remove'
    };
    books.Title = document.getElementById('title').value;
    books.Author = document.getElementById('author').value;
    arr.push(books);
    let node = document.createTextNode(books.Title);
    document.getElementById('book').appendChild(node);
    localStorage.setItem('arr', JSON.stringify(arr));
}
document.getElementById('button').addEventListener('click', toStore);