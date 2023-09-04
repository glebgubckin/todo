import { configureStore } from "@reduxjs/toolkit";
import todosReduces from "./todos.slice";
import appReduces from "./app.slice";

export const store = configureStore({
  reducer: {
    todos: todosReduces,
    app: appReduces,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
