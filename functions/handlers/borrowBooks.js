const { db } = require("../util/admin");

exports.getAllBorrowBooks = (req, res) => {
  db.collection("borrowBooks")
    .get()
    .then((data) => {
      let borrowBooks = [];
      console.log(getBorrowerById("kIXYDVXVFLySrH2wzKox"));
      data.forEach((doc) => {
        borrowBooks.push({
          borrowBookId: doc.id,
          borrower: getBorrowerById(doc.data().borrowerId),
          book: getBookById(doc.data().bookId),
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

function getBorrowerById(id) {
  let borrowerData = {};
  console.log('borrower');
  db.doc(`/borrowers/${id}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log("error")
      }
      borrowerData = doc.data();
      borrowerData.borrowerId = doc.id;
      return borrowerData;
    })
    .catch(err => {
      console.error(err);
    });
}

function getBookById(id) {
  let bookData = {};
  db.doc(`/books/${id}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log("error")
      }
      bookData = doc.data();
      bookData.bookId = doc.id;
      return bookData;
    })
    .catch(err => {
      console.error(err);
    });
}