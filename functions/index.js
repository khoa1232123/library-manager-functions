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

exports.api = functions.region("us-central1").https.onRequest(app);
