import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './ApiKeys';

let fireApp = undefined;
if (!firebase.apps.length) {
  console.log('FirebaseUserProfile : Initializing Firebase App. on : ' + new Date().toUTCString());
  fireApp = firebase.initializeApp(firebaseConfig);
}
export const authLocalUP = firebase.auth();
export const firestoreLocalUP = firebase.firestore(fireApp);
const provider = new firebase.auth.GoogleAuthProvider();
let user;
let name, email, photoUrl, uid, emailVerified;
export const signInWithGoogleUP = () => {
  authLocal.signInWithPopup(provider);
}
// export const updateUserProfile = (userProfile) => {
export const updateUserProfile = () => {
  console.log('FirebaseUserProfile : updateUserProfile 1.');
  // const updateTime = new Date().toUTCString();
  if (!userAuth) return;
  console.log('FirebaseUserProfile : updateUserProfile 2 : auth : ' + userAuth.uid);


  user = authLocalUP.currentUser;

  user.updateProfile({
    displayName: "rete user",
    photoURL: "https://example.com/jane-q-user/profile.jpg"
  }).then(function() {
    console.log('FirebaseUserProfile : updateProfile 21 : user : ', user);
  }).catch(function(error) {
    console.log('FirebaseUserProfile : updateProfile 22 : Error : ', error);
  });
  user.updateEmail("rete@gmail.com").then(function() {
    console.log('FirebaseUserProfile : updateProfile : email 21 : user : ', user);
  }).catch(function(error) {
    console.log('FirebaseUserProfile : updateProfile : email 22 : Error : ', error);
  });

  // user.updateProfile({
  //   displayName: userProfile.displayName,
  //   photoURL: userProfile.photoURL,
  // }).then(function() {
  //   console.log('FirebaseUserProfile : updateProfile 21 : user : ', user);
  // }).catch(function(error) {
  //   console.log('FirebaseUserProfile : updateProfile 22 : Error : ', error);
  // });
  // user.updateEmail(userProfile.email).then(function() {
  //   console.log('FirebaseUserProfile : updateProfile : email 21 : user : ', user);
  // }).catch(function(error) {
  //   console.log('FirebaseUserProfile : updateProfile 22 : Error : ', error);
  // });

  return getUserDocument(userAuth.uid);
}

export const getUserProfile = () => {
  console.log('FirebaseUserProfile : getUserProfile 1: ', user);
  
  user = authLocalUP.auth().currentUser;
  
  console.log('FirebaseUserProfile : getUserProfile 2: ', user);
  if (user != null) {
    console.log('FirebaseUserProfile : getUserProfile 3: ', user);
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    console.log('FirebaseUserProfile : getUserProfile 4: ', user);
  }
  
  console.log('FirebaseUserProfile : getUserProfile 5 : ', user);

  return user;
}

export const getUserInfo = () => {
 
  user = authLocalUP.currentUser;

  if (user != null) {
    user.providerData.forEach(function (profile) {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
    });
  }
    console.log('FirebaseUserProfile : getUserInfo : ', user);
}
