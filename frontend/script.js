const baseUrl = 'http://localhost:5000'; // Replace with your backend URL

// Search for books by name or term
function searchBooks() {
    const searchTerm = document.getElementById('searchTerm').value;

    fetch(`${baseUrl}/books?searchTerm=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            const booksList = document.getElementById('books-list');
            booksList.innerHTML = '';
            data.forEach(book => {
                const div = document.createElement('div');
                div.textContent = `${book.bookName} - ${book.category} - Rent: $${book.rentPerDay}/day`;
                booksList.appendChild(div);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Add a new user
function addUser() {
    const userId = document.getElementById('userId').value;
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;

    fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, name, email })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('user-response').textContent = 'User added successfully!';
        })
        .catch(error => console.error('Error:', error));
}

// Issue a book
function issueBook() {
    const bookId = document.getElementById('issueBookId').value;
    const userId = document.getElementById('issueUserId').value;
    const issueDate = document.getElementById('issueDate').value;

    fetch(`${baseUrl}/transcations/issue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId, userId, issueDate })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('issue-response').textContent = 'Book issued successfully!';
        })
        .catch(error => console.error('Error:', error));
}

// Return a book
function returnBook() {
    const bookId = document.getElementById('returnBookId').value;
    const userId = document.getElementById('returnUserId').value;
    const returnDate = document.getElementById('returnDate').value;

    fetch(`${baseUrl}/transcations/return`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId, userId, returnDate })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('return-response').textContent = `Book returned successfully! Total Rent: $${data.totalRent}`;
        })
        .catch(error => console.error('Error:', error));
}
