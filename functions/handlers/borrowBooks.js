const { db } = require("../util/admin");

exports.getAllBorrowBooks = (req, res) => {
  db.collection("borrowBooks")
    .get()
    .then((data) => {
      let borrowBooks = [];
      data.forEach((doc) => {
        borrowBooks.push({
          borrowBookId: doc.id,
          borrowerId: doc.data().borrowerId,
          bookId: doc.data().bookId,
          amount: doc.data().amount,
          returned: doc.data().returned,
          overdue: doc.data().overdue,
          createdAt: doc.data().createdAt,
          returnDay: doc.data().returnDay,
        });
      });
      return res.json(borrowBooks);
    })
    .catch((err) => console.error(err));
};

// Fetch one book
exports.getBorrowBook = (req, res) => {
  let borrowBookData = {};
  db.doc(`/borrowBooks/${req.params.borrowBookId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Book not found" });
      }
      borrowBookData = doc.data();
      borrowBookData.borrowBookId = doc.id;
      return res.json(borrowBookData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.createBorrowBook = (req, res) => {
  const newBorrowBook = {
    borrowerId: req.body.borrowerId,
    bookId: req.body.bookId,
    amount: req.body.amount,
    returned: req.body.returned,
    overdue: req.body.overdue,
    amount: req.body.amount,
    returnDay: req.body.returnDay,
    createdAt: new Date().toISOString(),
  };
  db.collection("borrowBooks")
    .add(newBorrowBook)
    .then(doc => {
      const resBorrowBook = newBorrowBook;
      resBorrowBook.BorrowBookId = doc.id;
      res.json({ resBorrowBook });
    })
    .catch(err => {
      res.status(500).json({ error: `Something went wrong!` });
      console.error(err);
    });
};

// update a borrower
exports.updateBorrowBook = (req, res) => {
  const newBorrowBook = {
    borrowerId: req.body.borrowerId,
    bookId: req.body.bookId,
    amount: req.body.amount,
    returned: req.body.returned,
    overdue: req.body.overdue,
    amount: req.body.amount,
    returnDay: req.body.returnDay,
    createdAt: new Date().toISOString(),
  };

  let borrowBookDoc = db.doc(`/borrowBooks/${req.params.borrowBookId}`);

  borrowBookDoc
    .get()
    .then(doc => {
      console.log(req.params.borrowBookId);
      if (!doc.exists) {
        return res.status(404).json({ error: "BorrowBook not found" });
      }
      return doc.ref.update(newBorrowBook);
    })
    .then(() => {
      res.json(newBorrowBook);
    })
    .catch(err => {
      res.status(500).json({ error: "Update fail" });
      console.error(err);
    });
};


//delete a Borrower
exports.deleteBorrowBook = (req, res) => {
  const document = db.doc(`/borrowers/${req.params.borrowBookId}`);
  document
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "BorrowBook not found" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Borrower deleted" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};