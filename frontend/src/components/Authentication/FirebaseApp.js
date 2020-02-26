import firebaseConfig from '../../firebaseConfig';
import * as firebase from 'firebase/app';
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;