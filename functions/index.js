const functions = require('firebase-functions');
const express = require("express");
// const firebase = require("firebase");
const app = express();
const { db } = require("./util/admin");

const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("./handlers/books");

const {
  getAllBorrowers,
  getBorrower,
  createBorrower,
  updateBorrower,
  deleteBorrower
} = require("./handlers/borrowers");

const {
  getAllBorrowBooks,
  getBorrowBook,
  createBorrowBook,
  updateBorrowBook,
  deleteBorrowBook
} = require("./handlers/borrowBooks");

// Books
app.get("/books", getAllBooks);
app.get("/books/:bookId", getBook);
app.post("/books", createBook);
app.post("/books/:bookId", updateBook);
app.delete("/books/:bookId", deleteBook);

// Borrowers
app.get("/borrowers", getAllBorrowers);
app.get("/borrowers/:borrowerId", getBorrower);
app.post("/borrowers", createBorrower);
app.post("/borrowers/:borrowerId", updateBorrower);
app.delete("/borrowers/:borrowerId", deleteBorrower);

// Borrow Books
app.get("/borrowBooks", getAllBorrowBooks);
app.get("/borrowBooks/:borrowBookId", getBorrowBook);
app.post("/borrowBooks", createBorrowBook);
app.post("/borrowBooks/:borrowBookId", updateBorrowBook);
app.delete("/borrowBooks/:borrowBookId", deleteBorrowBook);

exports.api = functions.region("us-central1").https.onRequest(app);
