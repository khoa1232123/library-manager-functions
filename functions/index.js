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

app.get("/books", getAllBooks);
app.get("/books/:bookId", getBook);
app.post("/books", createBook);
app.post("/books/:bookId", updateBook);
app.delete("/books/:bookId", deleteBook);

exports.api = functions.region("us-central1").https.onRequest(app);
