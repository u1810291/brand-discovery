// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'
import 'firebase/compat/auth'
import { useSetCategory } from './init'
// import FireSQL from 'firesql'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const firebaseConfig = {
  apiKey: 'AIzaSyAVcxZF5D_PEV3ea-UhJl7lYnFs7CLduPw',
  authDomain: 'brand-discovery-2a140.firebaseapp.com',
  projectId: 'brand-discovery-2a140',
  storageBucket: 'brand-discovery-2a140.appspot.com',
  messagingSenderId: '222991896408',
  appId: '1:222991896408:web:0538ed529a3d09588c1f2d',
  measurementId: 'G-QPMT89B9EV',
}

let singleton = null,
  database = null

// Initialize Firebase
export default function initFirebase(): FirebaseApp {
  if (!singleton) {
    singleton = initializeApp(firebaseConfig)
  }
  return singleton
}

export function db(): Firestore {
  if (!database) {
    database = getFirestore(initFirebase())
  }
  return database
}

const [categoriesSet] = useSetCategory()
categoriesSet()
