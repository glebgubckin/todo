import { FC, MouseEvent, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../stores/store";
import { removeTodos } from "../../stores/todos.slice";
import NewTodo from "../../compoentns/NewTodo/NewTodo";
import Todo from "../../compoentns/Todo/Todo";
import dark from "../../assets/dark.svg";
import light from "../../assets/light.svg";
import clsx from "clsx";
import styles from "./todos.module.scss";
import { Todo as TodoType } from "../../types/types";
import { changeTheme } from "../../stores/app.slice";
import Controls from "./Controls";

export type filterStatus = "all" | "active" | "completed";

const Todos: FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const darkTheme = useSelector((state: RootState) => state.app.darkTheme);
  const [todoListParametr, setTodoListParametr] = useState<filterStatus>("all");
  const dispatch = useDispatch();

  const activeTodos = useMemo(() => {
    return todos.filter((todo) => !todo.status);
  }, [todos]);

  const completedTodos = useMemo(() => {
    return todos.filter((todo) => todo.status);
  }, [todos]);

  const changeFilter = (
    e: MouseEvent<HTMLButtonElement>,
    param: filterStatus
  ) => {
    e.preventDefault();
    setTodoListParametr(param);
  };

  const changeThemeHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(changeTheme());
  };

  const todoList: { [key: string]: TodoType[] } = {
    all: todos,
    active: activeTodos,
    completed: completedTodos,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>ToDo</h1>
        <button className={styles.btn} onClick={(e) => changeThemeHandler(e)}>
          <img src={darkTheme ? light : dark} alt='dark mode' />
        </button>
      </div>
      <NewTodo />
      <div className={styles.todos}>
        {todoList[todoListParametr].map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            status={todo.status}
            value={todo.value}
          />
        ))}
      </div>
      <div
        className={clsx({
          [styles.footer]: true,
          [styles["footer--dark"]]: darkTheme,
        })}
      >
        <span className={styles.footer__info}>
          {todos.filter((todo) => !todo.status).length} items left
        </span>
        <Controls
          todoListParametr={todoListParametr}
          changeFilter={changeFilter}
        />
        <button
          className={styles.footer__clear}
          onClick={(e) => {
            e.preventDefault();
            dispatch(removeTodos());
          }}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default Todos;
