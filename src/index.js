import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCbKXXyKVffYXnuXgBNStsax87dWxSK0kc",
  authDomain: "fir-9-cc.firebaseapp.com",
  projectId: "fir-9-cc",
  storageBucket: "fir-9-cc.appspot.com",
  messagingSenderId: "1063614345406",
  appId: "1:1063614345406:web:ecfeb9f85667794c8eaeef"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore();

// Collection references
const colRef = collection(db, 'books');

// Get collection data
getDocs(colRef)
  .then(snaphshot => {
    let books = [];
    snaphshot.docs.forEach(doc => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch(err => {
    console.error(err.meesage);
  });