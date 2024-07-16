const books = require('./booksdb.js');
const express = require('express');
const promise_router = express.Router();
const app = express();


function fetchedBook() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // If the operation succeeds, resolve with the books
            resolve(books);
             reject(new Error('Failed to fetch books'));
        }, 2000); // Simulating a 2-second delay
    });
}

// GET all books (using promises)
promise_router.get('/', async (req, res, next) => {
    try {
        console.log("Request received at /promise"); // Log the request
        // Assuming books is an array of data
        const fetchBooks = await fetchedBook();
        return res.status(200).json(fetchBooks);
    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
});

promise_router.get('/isbn/:isbn', async (req, res, next) => {
    try {
        console.log("Request received at /promise"); // Log the request
        // Assuming books is an array of data
        const fetchBooks = await fetchedBook();
        const filtered_book = fetchBooks[req.params.isbn];
        console.log(filtered_book)
        if (filtered_book) {
            res.send(JSON.stringify(filtered_book))
        } else {
            res.send("no book found with this isbn no.");
        }

    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
});

promise_router.get('/author/:author', async (req, res, next) => {
    try {
        console.log("Request received at /promise"); // Log the request
        // Assuming books is an array of data
        const fetchBooks = await fetchedBook();
        const requestedAuthor = req.params.author;
        const booksByAuthor = Object.values(fetchBooks).filter(book => book.author === requestedAuthor);
        console.log(booksByAuthor)
        if (!booksByAuthor || !Array.isArray(booksByAuthor)) {
            throw new Error('Failed to fetch books or invalid data format');
        } else {
            res.send(booksByAuthor);
        }

    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
});

promise_router.get('/title/:title', async (req, res, next) => {
    try {
        console.log("Request received at /promise"); // Log the request
        // Assuming books is an array of data
        const fetchBooks = await fetchedBook();
        const requestedTitle = req.params.title;
        console.log(requestedTitle)
        const booksByTitle = Object.values(fetchBooks).filter(book => book.title === requestedTitle);
        console.log(booksByTitle)

        if (!booksByTitle || !Array.isArray(booksByTitle)) {
            throw new Error('Failed to fetch books or invalid data format');
        } else {
            res.send(booksByTitle);
        }

    } catch (error) {
        next(error); // Pass the error to the error handler middleware
    }
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error("invalid request"); // Log the error (you can customize this)
    res.status(err.status || 500).json({ error: err.message });
});


module.exports.promiseBased = promise_router;
