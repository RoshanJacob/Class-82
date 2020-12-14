import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
  apiKey: 'AIzaSyDcp_5CoplOmhgsx-YBXdVE2kxx_S5eT7I',
  authDomain: 'booksantaapp-1fac4.firebaseapp.com',
  databaseURL: 'https://booksantaapp-1fac4.firebaseio.com',
  projectId: 'booksantaapp-1fac4',
  storageBucket: 'booksantaapp-1fac4.appspot.com',
  messagingSenderId: '754788506532',
  appId: '1:754788506532:web:e1f00c212bf2163fedbf31',
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
