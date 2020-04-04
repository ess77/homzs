// import firebase from '@react-native-firebase/app';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC5WZh2lxdzMrrM9nw1Obd0lMvDRtfF0C4",
    authDomain: "react-firebase17.firebaseapp.com",
    databaseURL: "https://react-firebase17.firebaseio.com",
    projectId: "react-firebase17",
    storageBucket: "react-firebase17.appspot.com",
    messagingSenderId: "670044219976",
    appId: "1:670044219976:web:b896843889048fef88867d",
    measurementId: "G-JPGVK0WMG5"
  };

firebase.initializeApp(firebaseConfig);
export const authLocal = firebase.auth();
export const firestoreLocal = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  authLocal.signInWithPopup(provider);
}
export const generateUserDocument = async(userAuth, token) => {
console.log('firebase : generateUserDocument 1 : ' );
const login = new Date().toUTCString();
  if(!userAuth) return;
  let tokenAuth = await userAuth.getIdToken();
  const userRef = firestoreLocal.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  if(!snapshot.exists) {
    console.log('firebase : generateUserDocument : initialise new user data.' );
    const { email } = userAuth;
    const connected = true;
    const lastLogin = login;
    const displayName = '';
    const photoURL = 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png';
    const loginHistory = ['login ! ' + tokenAuth + ' ! ' + login];
    try {
      await userRef.set({
        email: email,
        displayName: displayName,
        photoURL: photoURL,
        connected: connected,
        loginHistory: loginHistory,
        lastLogin: lastLogin
      });
    }
    catch(error) {
      console.error('Erreur lors de la création du document userAuth ', error);
    }
  } else {
    console.log('firebase : generateUserDocument : update user data.' );
    let tokenAuth = await userAuth.getIdToken();
    if(!sameSession(token, tokenAuth)) {
    const userRef = firestoreLocal.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    let {connected, loginHistory} = snapshot.data();
    console.log('Firebase : updateUserDocument : ');
    
    connected = true;
    //First time user connection
    if(loginHistory === undefined ) {
      console.log("Firebase : updateUserDocument : Login history initialised. ");
      loginHistory = [];
    }

    loginHistory.push('login ! ' + tokenAuth + ' ! ' + login);
    try {
      const userRef = firestoreLocal.doc(`users/${userAuth.uid}`);
      await userRef.update({
        connected: connected,
        loginHistory: loginHistory,
        lastLogin: login
        });
      }catch(error) {
        console.log('Erreur lors de la modification du document userAuth : ' + error);
      }
    } else {
      console.log('Firebase : updateUserDocument : Same session, no futher update.');
      
    }
  }
  return getUserDocument(userAuth.uid);
}

export const logoutUpdateUserDocument = async (userUid, tokenAuth) => {
  console.log('Firebase : logoutUpdateUserDocument 1: ');
  if(!userUid) return;
  console.log('Firebase : logoutUpdateUserDocument 2: ' + userUid);
  const userRef = firestoreLocal.doc(`users/${userUid}`);
    const snapshot = await userRef.get();
    let {connected, loginHistory} = snapshot.data();
    
    connected = false;
    //First time user connection
    if(loginHistory === undefined ) {
      console.log("Firebase : logoutUpdateUserDocument : Login history initialised. ");
      loginHistory = [];
    }

    loginHistory.push('logout ! ' + tokenAuth + ' ! ' + new Date().toUTCString());
    try {
        await userRef.update({
        connected: connected,
        loginHistory: loginHistory,
        });
      }catch(error) {
        console.log('Erreur lors de la modification du document userAuth : ' + error);
      }
}

const sameSession = (token1, token2) => {
  if(token1 === token2) return true;
  console.log('UserProvider : SameSession false');
  // console.log('UserProvider : SameSession false : token1 :   ' + token1);
  // console.log('UserProvider : SameSession false : token2 :   ' + token2);
  return false;
}


export const getUserDocument = async uid => {
  if(!uid) return null;
  try {
    const userDocument = await firestoreLocal.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch(error) {
    console.error('Erreur lors du fetch userAuth', error);
  }
}
