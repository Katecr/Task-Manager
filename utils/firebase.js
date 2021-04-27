import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyD9kW1rKyDEzEe9Twi2WQFB4FBIMMcpdFU",
    authDomain: "admintasks-52736.firebaseapp.com",
    projectId: "admintasks-52736",
    storageBucket: "admintasks-52736.appspot.com",
    messagingSenderId: "517796748205",
    appId: "1:517796748205:web:deba9668a793c86113df24"
  }

export const firebaseApp = firebase.initializeApp(firebaseConfig)