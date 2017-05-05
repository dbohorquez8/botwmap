import firebase from 'firebase';

export function getUserMaps(uid) {
  const userMapsRef = firebase.database().ref('users/' + uid + '/maps');
  return new Promise(function (resolve, reject) {
    userMapsRef.on('value', snapshot => {
      if(snapshot) {
        resolve(snapshot.val());
      }else{
        reject(Error('Something went wrong'));
      }
    });
  });
}

export function deleteMap(map) {
  firebase.database().ref('maps/' + map.id).remove();
  firebase.database().ref('users/' + map.author + '/maps/' + map.id).remove();
}

export function saveMap(newMap, id) {
  var newMapId = id;

  if(id === false){
    newMapId = firebase.database().ref().child('maps').push().key;  
  }

  firebase.database().ref('maps/' + newMapId).set(newMap);
  firebase.database().ref('users/' + newMap.author + '/maps/' + newMapId).set(newMap);
}