const admin = require("firebase-admin");
const serviceAccount = require("../key/library-manager-7e6a9-firebase-adminsdk-70bre-dc9981d279.json");
const config = require("./config");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://neural-engine-182808.firebaseio.com",
  storageBucket: config.storageBucket
});
const db = admin.firestore();

module.exports = { admin, db };
