import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp
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

// Queries
const q = query(colRef, orderBy('createdAt'));

// Get real time collection data
onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach(doc => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
})

// Adding documents
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  })
});

// Deleting documents
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const docRef = doc(db, 'books', deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});
