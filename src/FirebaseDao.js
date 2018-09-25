import firebase from "firebase";

class FirebaseDao {
  constructor(config) {
    firebase.initializeApp(config);
  }

  insert(postData) {
    return firebase
      .database()
      .ref()
      .child("posts")
      .push(postData);
  }

  update(key, postData) {
    var updates = {};
    updates["/posts/" + key] = postData;
    updates["/user-posts/genji/" + key] = postData;
    return firebase
      .database()
      .ref()
      .update(updates);
  }

  remove(key) {
    firebase
      .database()
      .ref("/posts/")
      .child(key)
      .remove();
    return firebase
      .database()
      .ref("/user-posts/genji/")
      .child(key)
      .remove();
  }

  //파이어베이스-데이터베이스 이벤트 종료
  off() {
    return firebase
      .database()
      .ref()
      .off();
  }

  //새로 빈 데이터를 만들고 key 리턴
  newKey() {
    return firebase
      .database()
      .ref()
      .child("posts")
      .push().key;
  }

  getArticle(key) {
    return firebase.database().ref("/posts/" + key);
  }
}

export default FirebaseDao;
