import React, { memo } from "react";

import { AuthContext } from "../providers/AuthProvider";
//@ts-ignore
import dig from "object-dig";

import * as Api from "../service/api";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";

import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";

export const TodoList = memo((props: any) => {
  const { todos, fetchTodos } = props;

  /**
   * todoを削除する処理
   *
   * @param id 削除対象id
   */
  const deleteHandle = async (id: number) => {
    await Api.deleteTodo(id);
    fetchTodos();
  };

  /**
   * todoを完了する処理
   *
   * @param id 完了対象id
   */
  const checkHandle = async (id: number) => {
    // Api経由でisCompleteの値を更新
    await Api.toggleComplete(id);
    fetchTodos();
  };

  return (
    <div className="todoList">
      <h2>あなたのToDo</h2>
      <ul>
        {todos.map((todo: any) => {
          return (
            <ListItem key={todo.id}>
              <ListItemIcon>
                <Checkbox
                  checked={todo.isComplete}
                  onChange={() => checkHandle(todo.id)}
                />
              </ListItemIcon>
              <ListItemText primary={todo.content} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteHandle(todo.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </ul>
    </div>
  );
});
