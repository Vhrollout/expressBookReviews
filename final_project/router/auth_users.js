const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  // Filter the users array for any user with the same username
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  // Return true if any user with the same username is found, otherwise false
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }

}

const authenticatedUser = (username, password) => {
  // Filter the users array for any user with the same username and password
  let validusers = users.filter((user) => {
    return (user.username === username && user.password === password);
  });
  // Return true if any valid user is found, otherwise false
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
}


regd_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password)

  // Check if both username and password are provided
  if (username && password) {
    // Check if the user does not already exist
    if (!isValid(username)) {
      // Add the new user to the users array
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  // Return error if username or password is missing
  return res.status(404).json({ message: "Unable to register user." });
});

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username; // Use req.body instead of req.params
  const password = req.body.password;

  let filterUser = users.filter((user) => user.username === username && user.password === password);


  if (filterUser.length > 0) {
    res.send("You're successfully logged in!");
  } else {
    res.status(401).json({ message: "Invalid credentials. Try again!" });
  }
});


// Add a book review
regd_users.put("/review/:isbn", (req, res) => {
  //Write your code here
  let isbn = req.params.isbn;
  let book = books[isbn];
  let review = book.reviews;


  if (review) {
    book.reviews = "my first revievw";
    res.json(`the ${book.title} is reviewd`);
  } else {
    return res.status(300).json({ message: "review is not added" });
  }
  
});

regd_users.delete("/review/:isbn", (req, res) => {
  let isbn = req.params.isbn;
  let book = books[isbn];
  let review = book.reviews;

  if (review) {
    delete review;
    res.json(`the ${book.title} is review is deleted`);
  } else {
    return res.status(300).json({ message: "review is not added" });
  }

})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
