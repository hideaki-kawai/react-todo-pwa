import React, { useContext } from "react";
import { signInWithGoogle, logout } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
//@ts-ignore
import dig from "object-dig";

export const Header = () => {
  const currentUser = useContext(AuthContext);
  return (
    <header>
      {dig(currentUser, "currentUser") ? (
        <button onClick={logout}>ログアウト</button>
      ) : (
        <button onClick={signInWithGoogle}>ログイン</button>
      )}
    </header>
  );
};
