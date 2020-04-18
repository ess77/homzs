import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './ApiKeys';

let fireApp = undefined;
if (!firebase.apps.length) {
  console.log('Firebase : Initializing Firebase App. at ' + new Date().toUTCString());
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
  const loginTime = new Date().toUTCString();
  if (!userAuth) return;
  const tokenAuth = await userAuth.getIdToken();
  console.log('firebase : generateUserDocument 2 : auth : ' + userAuth.uid);
  const userRef = firestoreLocal.doc(`users/${userAuth.uid}`);
  // let snapshot = undefined;
  const snapshot = await userRef.get();
  const { role, username, photoURL } = userInfo;
  console.log('firebase : generateUserDocument 3 : initializing new user data : ' + role + ' : ' + username + ' : ' + photoURL);
  const { email } = userAuth;
  const connected = true;
  const lastLoginTime = loginTime;
  // const photoURL = 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png';
  const loginHistory = ['login ! ' + tokenAuth + ' ! ' + loginTime];
  try {
    await firestoreLocal.doc(`users/${userAuth.uid}`).set({
      role: role,
      email: email,
      connected: connected,
      loginHistory: loginHistory,
      lastLoginTime: lastLoginTime,
      displayName: username,
      photoURL: photoURL
    });
  } catch (error) {
    console.error('firebase : generateUserDocument 4 : Erreur lors de la création du document userAuth ', error);
  }
  return getUserDocument(userAuth.uid);
}

export const updateUserDocument = async (userAuth, token) => {
  console.log('firebase : updateUserDocument 1.');
  const loginTime = new Date().toUTCString();
  if (!userAuth) return;
  const tokenAuth = await userAuth.getIdToken();
  console.log('firebase : updateUserDocument 2 : auth : ' + userAuth.uid);
  const userRef = firestoreLocal.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  if (!sameSession(token, tokenAuth)) {
    console.log('firebase : updateUserDocument 3 : updating user data.');
    let  snapshot, connected, loginHistory  = undefined;
    await userRef.get().then((result) => {
      if(result.data()) {
        snapshot = result.data();
        connected = snapshot.connected;
        loginHistory = snapshot.loginHistory;
      }
    }).catch((error) => {
      console.error("Firebase : updateUserDocument : Error getting snapshot. " + error);
    });

    const length = loginHistory.length;
    console.log('Firebase : updateUserDocument 4 : updateUserDocument : last loginHistory = ' + loginHistory[length - 1].substring(0,20));

    connected = true;
    //First time user connection
    if (loginHistory === undefined) {
      console.log("Firebase : updateUserDocument 5 : Login history initialised. ");
      loginHistory = [];
    }

    loginHistory.push('login ! ' + tokenAuth + ' ! ' + loginTime);
    try {
      userRef.update({
        connected: connected,
        loginHistory: loginHistory,
        lastLoginTime: loginTime
      });
    } catch (error) {
      console.error('Firebase : updateUserDocument : Erreur lors de la modification du document userAuth : ' + error);
    }
  } else {
    console.log('Firebase : updateUserDocument : Same session, no futher update.');
  }
  return getUserDocument(userAuth.uid);;
}

export const logoutUpdateUserDocument = async (userUid, tokenAuth) => {
  console.log('Firebase : logoutUpdateUserDocument 1.');
  if (!userUid) return;
  console.log('Firebase : logoutUpdateUserDocument 2: ' + userUid);
  const userRef = firestoreLocal.doc(`users/${userUid}`);
  let  snapshot, connected, loginHistory  = undefined;
  await userRef.get().then((result) => {
    if(result.data()) {
      snapshot = result.data();
      connected = snapshot.connected;
      loginHistory = snapshot.loginHistory;
    }
  }).catch((error) => {
    console.error("Firebase : logoutUpdateUserDocument : Error getting snapshot. " + error);
  });
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


export const getUserDocument = async (uid) => {
  if (!uid) return null;
  let user = undefined;
  let userData = undefined;
  try {
    const userDocument = firestoreLocal.doc(`users/${uid}`);

    //form 1
    // const doc = await userDocument.get();
    //  if (doc.exists){
    //    userData = doc.data()
    //    user = { uid, ...userData };
    //    console.log('Firebase : getUserDocument 1: ' + user);
    //   } else {
    //     console.log('Firebase : getUserDocument 2: No document.');
    //     return null;
    //   }

    //form 2
    await userDocument.get().then((doc) => {
     if (doc.exists){
       userData = doc.data()
       user = { uid, ...userData };
       console.log('Firebase : getUserDocument 1: ' + user.displayName);
      } else {
        console.log('Firebase : getUserDocument 2: No document.');
        return null;
      }
    });
    
  } catch (error) {
    console.error('Firebase : getUserDocument : Erreur lors du fetch userAuth', error);
  }
  return user;
}
