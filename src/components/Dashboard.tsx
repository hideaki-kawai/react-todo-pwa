import React, { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../providers/AuthProvider";
//@ts-ignore
import dig from "object-dig";
import { signInWithGoogle } from "../service/firebase";
import * as Api from "../service/api";
import { TodoList } from "./TodoList";
import { Button, TextField } from "@mui/material";

export const Dashboard = () => {
  const currentUser = useContext(AuthContext);
  const [inputName, setInputName] = useState("");

  /**
   * テキストボックスに入力された値をonChangeイベントで取得する
   *
   * @param e テキストボックスのイベントを取得
   */
  const onChangeInputName = useCallback(
    (e: any) => {
      setInputName(e.target.value);
    },
    [setInputName]
  );

  const [todos, setTodos] = useState([]);
  console.log(todos);

  /**
   * Todo一覧を非同期で取得する処理
   */
  const fetchTodos = useCallback(async () => {
    if (dig(currentUser, "currentUser", "uid")) {
      const data: any = await Api.initGet(currentUser.currentUser.uid);
      await setTodos(data);
    }
  }, [currentUser]);

  // currentUserの値が変更したらfetchTodosが走る
  useEffect(() => {
    fetchTodos();
  }, [currentUser]);

  /**
   * 投稿する処理
   *
   * @param e イベント情報
   */
  const post = async (e: any) => {
    e.preventDefault();
    await Api.addTodo(inputName, currentUser.currentUser.uid);
    await setInputName("");
    fetchTodos();
  };

  return (
    <div className="dashboard">
      {dig(currentUser, "currentUser", "uid") ? (
        <>
          <form className="form">
            <TextField
              id="standard-basic"
              className="input"
              label="TodoName"
              variant="standard"
              value={inputName}
              onChange={onChangeInputName}
            />
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={post}
              disabled={inputName.length > 0 ? false : true}
            >
              追加
            </Button>
          </form>
          <TodoList todos={todos} fetchTodos={fetchTodos} />
        </>
      ) : (
        <button onClick={signInWithGoogle}>ログイン</button>
      )}
    </div>
  );
};
