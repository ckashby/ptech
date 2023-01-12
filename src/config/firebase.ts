import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {  } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCqES6eZTOJSKohslanYeJmkGNc6SfKPIY',
  authDomain: 'fb9rr6.firebaseapp.com',
  projectId: 'fb9rr6',
  storageBucket: 'fb9rr6.appspot.com',
  messagingSenderId: '14373219959',
  appId: '1:14373219959:web:6e78c53d3049d121a72072',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();