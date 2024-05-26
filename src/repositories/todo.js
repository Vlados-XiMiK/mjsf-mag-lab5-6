import firebase from "../_firebase-init"
import {taskConverter} from "../models/task";

export class ITodoRepository {
  save() {
    throw new Error("Not implemented");
  }

  find() {
    throw new Error("Not implemented");
  }

  fetch() {
    throw new Error("Not implemented");
  }

}

export class TodoFirebaseRepository extends ITodoRepository {

  constructor() {
    super();
    this.db = firebase.firestore();
  }

  save(model) {
    return new Promise((resolve, reject) => {
      this.db.collection("todo")
        .doc(model.id).withConverter(taskConverter)
        .set(model).then(() => {
        resolve(model);
      }).catch(err => {
        reject(err);
      });
    })
  }

  find(id) {
    return new Promise((resolve) => {
      let items = this.__getItems();
      const res = items.filter((item) => {
        return item.id === id
      });
      if (res.length > 0) {
        return resolve(res[0]);
      }
      return resolve(null);
    })
  }

  fetch() {
    return new Promise((resolve, reject) => {
      let response = [];
      this.db.collection("todo").withConverter()
        .get()
        .then((items) => {
          items.forEach((doc) => {
            response.push(taskConverter.fromFirestore(doc, {}));
          })
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }
}

export class TodoLocalStorageRepository extends ITodoRepository {
  __getItems() {
    return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem("todos")) : [];
  }

  save(model) {
    return new Promise((resolve) => {
      let items = this.__getItems();
      items.push(model);
      localStorage.setItem("todos", JSON.stringify(items));
      resolve(model);
    })
  }

  find(id) {
    return new Promise((resolve) => {
      let items = this.__getItems();
      const res = items.filter((item) => {
        return item.id === id
      });
      if (res.length > 0) {
        return resolve(res[0]);
      }
      return resolve(null);
    })
  }

  fetch() {
    return new Promise((resolve) => {
      resolve(this.__getItems());
    })
  }
}
