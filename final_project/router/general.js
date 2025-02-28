const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

//Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json(books);
});

const getAllBook = () => {
    axios.get('https://hoaiminhb12-5000.theiadocker-2-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/')
  .then(function (response) {
    // Handle the response data
    console.log(response.data);
  })
  .catch(function (error) {
    // Handle any errors that occurred during the request
    console.error(error);
  });
}

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.status(300).json(books[isbn]);
 });
 
 const getBookByISBN = (isbn) => {
    axios.get('https://hoaiminhb12-5000.theiadocker-2-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/isbn/' + String.toString(isbn))
  .then(function (response) {
    // Handle the response data
    console.log(response.data);
  })
  .catch(function (error) {
    // Handle any errors that occurred during the request
    console.error(error);
  });
}



// Get book details based on author

public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let book = {};
  for (let i =1; i<11;i++) {
      if (books[i]["author"].toLowerCase() == author.toLowerCase()) {
          book[i] = books[i];
      }
  }
  return res.status(300).json(book);
});
const getBookByAuthor = (author) => {
    axios.get('https://hoaiminhb12-5000.theiadocker-2-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/author/' + String.toString(author))
  .then(function (response) {
    // Handle the response data
    console.log(response.data);
  })
  .catch(function (error) {
    // Handle any errors that occurred during the request
    console.error(error);
  });
}


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let book = {};
  for (let i =1; i<11;i++) {
    if (books[i]["title"].toLowerCase() == title.toLowerCase()) {
        book[i] = books[i];
    }
  }
  return res.status(300).json(book);
});
const getBookByTitle = (title) => {
    axios.get('https://hoaiminhb12-5000.theiadocker-2-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/title/' + String.toString(title))
  .then(function (response) {
    // Handle the response data
    console.log(response.data);
  })
  .catch(function (error) {
    // Handle any errors that occurred during the request
    console.error(error);
  });
}


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.status(300).json(books[isbn]);
});

module.exports.general = public_users;
