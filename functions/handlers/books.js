const { db } = require("../util/admin");

exports.getAllBooks = (req, res) => {
  db.collection("books")
    .get()
    .then((data) => {
      let books = [];
      data.forEach((doc) => {
        books.push({
          bookId: doc.id,
          name: doc.data().name,
          image: doc.data().image,
          categories: doc.data().categories,
          description: doc.data().description,
          newPer: doc.data().newPer,
          author: doc.data().author,
          release: doc.data().release,
          amount: doc.data().amount,
          area: doc.data().area,
          status: doc.data().status,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(books);
    })
    .catch((err) => console.error(err));
};

// Fetch one book
exports.getBook = (req, res) => {
  let bookData = {};
  db.doc(`/books/${req.params.bookId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Book not found" });
      }
      bookData = doc.data();
      bookData.bookId = doc.id;
      return res.json(bookData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.createBook = (req, res) => {
  
  const newBook = {
    name: req.body.name,
    image: req.body.image,
    categories: req.body.categories,
    description: req.body.description,
    newPer: req.body.newPer,
    author: req.body.author,
    release: req.body.release,
    amount: req.body.amount,
    area: req.body.area,
    status: req.body.status,
    createdAt: new Date().toISOString(),
  };
  db.collection("books")
    .add(newBook)
    .then(doc => {
      const resBook = newBook;
      resBook.bookId = doc.id;
      res.json({ resBook });
    })
    .catch(err => {
      res.status(500).json({ error: `Something went wrong!` });
      console.error(err);
    });
};

exports.updateBook = (req, res) => {
  const newBook = {
    name: req.body.name,
    image: req.body.image,
    categories: req.body.categories,
    description: req.body.description,
    newPer: req.body.newPer,
    author: req.body.author,
    release: req.body.release,
    amount: req.body.amount,
    area: req.body.area,
    status: req.body.status
  };

  let bookDoc = db.doc(`/books/${req.params.bookId}`);

  bookDoc
    .get()
    .then(doc => {
      console.log(req.params.bookId);
      if (!doc.exists) {
        return res.status(404).json({ error: "book not found" });
      }
      return doc.ref.update(newBook);
    })
    .then(() => {
      res.json(newBook);
    })
    .catch(err => {
      res.status(500).json({ error: "Update fail" });
      console.error(err);
    });
};

//delete a book
exports.deleteBook = (req, res) => {
  const document = db.doc(`/books/${req.params.bookId}`);
  document
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "book not found" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "book deleted" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
