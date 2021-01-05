import firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4p9ETWhWYzi7fbZrfRDAlVherA1W8l2E",
  authDomain: "danjones-fcc-tutorial.firebaseapp.com",
  databaseURL: "https://danjones-fcc-tutorial-default-rtdb.firebaseio.com",
  projectId: "danjones-fcc-tutorial",
  storageBucket: "danjones-fcc-tutorial.appspot.com",
  messagingSenderId: "150278363909",
  appId: "1:150278363909:ios:556b2dd7543d12d719b56c",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
