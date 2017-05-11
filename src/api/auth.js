import firebase from 'firebase';

export function auth(){
  return firebase.auth().onAuthStateChanged(user => {
    if(!user) {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);

      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          var token = result.credential.accessToken;
        }
        var user = result.user;
      }).catch(function(error) {
        alert("An error occurred:" + error.message)
      });
    }
  });
}

export function getCurrentUser() {
  return new Promise(function (resolve, reject) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        resolve(user);
      }else{
        reject(Error('Something went wrong'));
      }
    });
  });
}