import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

// Google プロバイダ オブジェクトのインスタンスを作成
const googleProvider = new firebase.auth.GoogleAuthProvider();

// ログインに関する情報を取得
export const auth = firebase.auth();

// DB（Firestore）に関する情報を取得
export const db = firebase.firestore();

// firestoreの初期化のタイミングで永続化（オフライン対応）を有効化する
db.enablePersistence();

/**
 * Google プロバイダ オブジェクトを使用して Firebase での認証を行う
 * ポップアップ ウィンドウでログインを行う場合は、signInWithPopup を呼び出す
 */
export const signInWithGoogle = () => {
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => console.log(res.user))
    .catch((error) => console.log(error.message));
};

/**
 * ログアウト処理
 */
export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("logged out");
    })
    .catch((error) => {
      console.error(error.message);
    });
};
