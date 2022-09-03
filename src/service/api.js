import firebase from "firebase";
import { db } from "./firebase";

/**
 * Todoを追加する処理
 *
 * @param {*} content
 * @param {*} uid
 */
export const addTodo = (content, uid) => {
  db.collection("todo").add({
    content: content,
    uid: uid,
    isComplete: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

/**
 * ログインしているユーザーIDを基にTodo一覧を取得する処理
 *
 * @param {*} uid
 */
export const initGet = async (uid) => {
  const todo = await db
    .collection("todo")
    .orderBy("createdAt", "desc")
    .where("uid", "==", uid);

  return todo.get().then((snapshot) => {
    let todos = [];
    snapshot.forEach((doc) => {
      todos.push({
        id: doc.id,
        content: doc.data().content,
        inCompleted: doc.data().isComplete,
      });
    });
    return todos;
  });
};

/**
 * todoを削除する処理
 *
 * @param {*} id 削除するtodoのid
 */
export const deleteTodo = (id) => {
  db.collection("todo").doc(id).delete();
};

/**
 * todoを完了状態に変更する処理
 *
 * @param {*} id 完了状態に更新する対象のid
 */
export const toggleComplete = async (id) => {
  const todo = await db.collection("todo").doc(id).get();
  return db
    .collection("todo")
    .doc(id)
    .update({
      isComplete: todo.data().isComplete ? false : true,
      updateAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};
