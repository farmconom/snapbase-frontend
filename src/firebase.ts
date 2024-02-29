// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC7fLWa1h59r1dirTvNuv4e3yoI4dVeDx8',
  authDomain: 'snapbase-database.firebaseapp.com',
  projectId: 'snapbase-database',
  storageBucket: 'snapbase-database.appspot.com',
  messagingSenderId: '106626576993',
  appId: '1:106626576993:web:d52e65d156c9a098f8b020',
  measurementId: 'G-ZR28KPYRBR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
