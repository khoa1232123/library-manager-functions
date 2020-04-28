const { db } = require("../util/admin");

// get all borrowers
exports.getAllBorrowers = (req, res) => {
  db.collection("borrowers")
    .get()
    .then((data) => {
      let borrowers = [];
      data.forEach((doc) => {
        borrowers.push({
          borrowerId: doc.id,
          name: doc.data().name,
          image: doc.data().image,
          classRoom: doc.data().classRoom,
          position: doc.data().position,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(borrowers);
    })
    .catch((err) => console.error(err));
};


// get a Borrower
exports.getBorrower = (req, res) => {
  let borrowerData = {};
  db.doc(`/borrowers/${req.params.borrowerId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Borrower not found" });
      }
      borrowerData = doc.data();
      borrowerData.borrowerId = doc.id;
      return res.json(borrowerData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};


// create a borrower
exports.createBorrower = (req, res) => {
  const newBorrower = {
    name: req.body.name,
    classRoom: req.body.classRoom,
    position: req.body.position,
    createdAt: new Date().toISOString(),
  };
  db.collection("borrowers")
    .add(newBorrower)
    .then(doc => {
      const resBorrower = newBorrower;
      resBorrower.borrowerId = doc.id;
      res.json({ resBorrower });
    })
    .catch(err => {
      res.status(500).json({ error: `Something went wrong!` });
      console.error(err);
    });
};


// update a borrower
exports.updateBorrower = (req, res) => {
  const newBorrower = {
    name: req.body.name,
    image: req.body.image,
    classRoom: req.body.classRoom,
    position: req.body.position,
    createdAt: new Date().toISOString(),
  };

  let borrowerDoc = db.doc(`/borrowers/${req.params.borrowerId}`);

  borrowerDoc
    .get()
    .then(doc => {
      console.log(req.params.borrowerId);
      if (!doc.exists) {
        return res.status(404).json({ error: "Borrower not found" });
      }
      return doc.ref.update(newBorrower);
    })
    .then(() => {
      res.json(newBorrower);
    })
    .catch(err => {
      res.status(500).json({ error: "Update fail" });
      console.error(err);
    });
};

//delete a Borrower
exports.deleteBorrower = (req, res) => {
  const document = db.doc(`/borrowers/${req.params.borrowerId}`);
  document
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Borrower not found" });
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
