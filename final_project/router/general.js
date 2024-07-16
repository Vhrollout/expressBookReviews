const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json(books, null, 4);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const filtered_book = books[isbn];

  if (filtered_book) {
    res.send(JSON.stringify(filtered_book))
  } else {
    res.status(300).send({message : "book not found"})
  }
 });

// Get book details based on author
public_users.get('/author/:author', (req, res) => {
  const requestedAuthor = req.params.author;

  // Filter books by author
  const booksByAuthor = Object.values(books).filter(book => book.author === requestedAuthor);

  if (booksByAuthor.length > 0) {
    res.json(booksByAuthor);
  } else {
    res.status(404).json({ message: "No books found for this author" });
  }
});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const requestedTitle = req.params.title;
  console.log("Requested author:", requestedTitle);

  // Filter books by author
  const booksByTitle = Object.values(books).filter(book => book.title === requestedTitle);
  console.log(booksByTitle);

  if (booksByTitle.length > 0) {
    res.json(booksByTitle);
  } else {
    res.status(404).json({ message: "No books found for this author" });
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  console.log(isbn)
  let book = books[isbn];
  console.log(book);

  if (book) {
    let reviews = book.reviews;
    res.send(JSON.stringify(reviews))
  } else {
    res.status(300).send({ message: "book not found" })
  }
});

module.exports.general = public_users;
