import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { Todo } from "../types/types";

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: JSON.parse(localStorage.getItem("todos") || "[]") as Todo[],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({ id: v4(), status: false, value: action.payload });
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      if (state.todos.length) {
        localStorage.setItem("todos", JSON.stringify(state.todos));
      } else {
        localStorage.removeItem("todos");
      }
    },
    removeTodos: (state) => {
      state.todos = state.todos.filter((todo) => !todo.status);
      if (state.todos.length) {
        localStorage.setItem("todos", JSON.stringify(state.todos));
      } else {
        localStorage.removeItem("todos");
      }
    },
    changeStatus: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload ? { ...todo, status: !todo.status } : todo
      );
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export const { addTodo, removeTodo, removeTodos, changeStatus } =
  todosSlice.actions;

export default todosSlice.reducer;
