class Book {

    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}

class UI {

    addBookToList(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="" id="del" class="delete">X</a></td>`

        list.appendChild(row);
    }

    showAlert(message, className) {
        const div = document.createElement('div');

        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2500);
    }

    clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}

document.querySelector('#submit').addEventListener('click', submitBtn);
document.querySelector('#book-list').addEventListener('click', deleteBook);

function submitBtn(e) {

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    const book = new Book(title, author, isbn);

    const ui = new UI();

    if (title === '' || author === '' || isbn === '') {

        ui.showAlert('please fill all the fields correctly!', 'error');
    } else {

        ui.addBookToList(book);
        ui.showAlert('You added the book!', 'success');
        ui.clearFields();
    }
    e.preventDefault();
};

function deleteBook(e) {

    const ui = new UI();

    if (e.target.tagName.toLowerCase() === 'a') {
        ui.deleteBook(e.target);
        ui.showAlert('Book is removed!', 'success');
    }

    e.preventDefault();
};