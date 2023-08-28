const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  if (req.body.users){
    books[req.body.isbn] = {
        "username":req.body.username,
        "password":req.body.password,
        }
}
res.send("Customer sucessfully registered. Now you are logged In");
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
 return res.send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const ISBN = req.params.isbn;
  return res.send(books[ISBN]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const getBooksByAuthor = req.params.author;
  return res.send(books[getBooksByAuthor]);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const getBooksByTitle = req.params.title;
  return res.send(books[getBooksByTitle]);
});

//  Get book review
public_users.put('/review/:isbn',function (req, res) {
  //Write your code here
  const ISBN = req.params.isbn;
  let book = books[ISBN]
  if (book) { //Check is friend exists
      let review = req.body.review;
      res.send(`The review for the book with the Isbn  ${ISBN} has been added/updated.`);
} else
{
    res.send("Unable to find the Book!");
}

});

public_users.delete('/review/:isbn',function (req, res) {
    //Write your code here
    const ISBN = req.params.isbn;
    let book = books[ISBN]
    if (book){
        delete book;
    }
    res.send(`The review for the book with the Isbn  ${ISBN} has been deleted.`);
  });

module.exports.general = public_users;
