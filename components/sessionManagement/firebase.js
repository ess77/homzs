import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './ApiKeys';

let fireApp = undefined;
if (!firebase.apps.length) {
  console.log('Firebase : Initializing Firebase App.');
  fireApp = firebase.initializeApp(firebaseConfig);
}
export const authLocal = firebase.auth();
export const firestoreLocal = firebase.firestore(fireApp);
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  authLocal.signInWithPopup(provider);
}
export const generateUserDocument = async (userAuth, userInfo, token) => {
  console.log('firebase : generateUserDocument 1 : ');
  const login = new Date().toUTCString();
  if (!userAuth) return;
  let tokenAuth = userAuth.getIdToken();
  console.log('firebase : generateUserDocument 2 : auth : ' + userAuth.uid);
  const userRef = firestoreLocal.doc(`users/${userAuth.uid}`);
  // let snapshot = undefined;
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    console.log('firebase : generateUserDocument 6 : initializing new user data.');
    const [role, username, photoURL] = userInfo;
    const { email } = userAuth;
    const connected = true;
    const lastLogin = login;
    // const photoURL = 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png';
    const loginHistory = ['login ! ' + tokenAuth + ' ! ' + login];
    try {
      firestoreLocal.doc(`users/${userAuth.uid}`).set({
        role: role,
        email: email,
        displayName: username,
        photoURL: photoURL,
        connected: connected,
        loginHistory: loginHistory,
        lastLogin: lastLogin
      });
    } catch (error) {
      console.error('firebase : generateUserDocument 7 : Erreur lors de la création du document userAuth ', error);
    }
  } else {
    console.log('firebase : generateUserDocument 8 : updating user data.');
    let tokenAuth = userAuth.getIdToken();
    if (!sameSession(token, tokenAuth)) {
      // const userRef = firestoreLocal.doc(`users/${userAuth.uid}`);
      // snapshot = userRef.get();
      let { connected, loginHistory } = snapshot.data();
      console.log('Firebase : updateUserDocument : loginHistory = ' + loginHistory);

      connected = true;
      //First time user connection
      if (loginHistory === undefined) {
        console.log("Firebase : updateUserDocument : Login history initialised. ");
        loginHistory = [];
      }

      loginHistory.push('login ! ' + tokenAuth + ' ! ' + login);
      try {
        // const userRef = firestoreLocal.doc(`users/${userAuth.uid}`);
        userRef.update({
          connected: connected,
          loginHistory: loginHistory,
          lastLogin: login
        });
      } catch (error) {
        console.log('Erreur lors de la modification du document userAuth : ' + error);
      }
    } else {
      console.log('Firebase : updateUserDocument : Same session, no futher update.');

    }
  }
  return getUserDocument(userAuth.uid);
}

export const logoutUpdateUserDocument = async (userUid, tokenAuth) => {
  console.log('Firebase : logoutUpdateUserDocument 1.');
  if (!userUid) return;
  console.log('Firebase : logoutUpdateUserDocument 2: ' + userUid);
  const userRef = firestoreLocal.doc(`users/${userUid}`);
  const snapshot = await userRef.get();
  let {
    connected,
    loginHistory
  } = snapshot.data();

  connected = false;
  //First time user connection
  if (loginHistory === undefined) {
    console.log("Firebase : logoutUpdateUserDocument : Login history initialised. ");
    loginHistory = [];
  }

  loginHistory.push('logout ! ' + tokenAuth + ' ! ' + new Date().toUTCString());
  try {
    await userRef.update({
      connected: connected,
      loginHistory: loginHistory,
    });
  } catch (error) {
    console.log('Erreur lors de la modification du document userAuth : ' + error);
  }
}

const sameSession = (token1, token2) => {
  if (token1 === token2) return true;
  console.log('Firebase : SameSession false');
  // console.log('UserProvider : SameSession false : token1 :   ' + token1);
  // console.log('UserProvider : SameSession false : token2 :   ' + token2);
  return false;
}


export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestoreLocal.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error('Erreur lors du fetch userAuth', error);
  }
}
