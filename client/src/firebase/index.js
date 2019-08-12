import Rebase from "re-base"
import firebase from "firebase"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDtjRnljJOno8OGsO_QSiVXVwIF657K6yw",
    authDomain: "vanity-80b98.firebaseapp.com",
    databaseURL: "https://vanity-80b98.firebaseio.com",
    projectId: "vanity-80b98",
    storageBucket: "vanity-80b98.appspot.com",
    messagingSenderId: "138438372564",
    appId: "1:138438372564:web:aa3a53ea81ea93d6"
  };

  firebase.initializeApp(firebaseConfig);

  export const storage = firebase.storage();

 
  export default firebase

