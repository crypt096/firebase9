import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

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
const auth = getAuth();

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

// Get single document
const docRef = doc(db, 'books', 'wJeNvSsqTsv3FfaciREn');
onSnapshot(docRef, (snapshot) => {
  console.log(snapshot.data(), snapshot.id);
});

// Updating a document
const updateBookForm = document.querySelector('.update');
updateBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const docRef = doc(db, 'books', updateBookForm.id.value);

  updateDoc(docRef, {
    title: 'Updated title',
  }).then(() => {
    updateBookForm.reset()
  })
});

// Signing users up
const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
  .then((cred) => {
    // console.log('user created', cred.user);
    signupForm.reset();
  })
  .catch((err) => {
    console.log(err.message)
  });
});

// Logging in and out
const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', (e) => {
  signOut(auth)
  .then(() => {
    // console.log('User signed out');
  })
  .catch((err) => {
    console.log(err.message);
  });
});

const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
  .then((cred) => {
    // console.log('user logged in', cred.user);
    loginForm.reset();
  })
  .catch((err) => {
    console.log(err.message);
  });
});

// Subscribe to auth state changes
onAuthStateChanged(auth, (user) => {
  console.log('user state changed', user);
});