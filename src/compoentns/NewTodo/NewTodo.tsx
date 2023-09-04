import { FC, useState } from "react";
import { addTodo } from "../../stores/todos.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import styles from "./newTodo.module.scss";
import { clsx } from "clsx";

const NewTodo: FC = () => {
  const [todo, setTodo] = useState("");
  const darkTheme = useSelector((state: RootState) => state.app.darkTheme);
  const dispatch = useDispatch();

  const addTodoHandler = () => {
    setTodo("");
    todo.trim().length && dispatch(addTodo(todo.trim()));
  };

  return (
    <div
      className={
        darkTheme
          ? clsx({
              [styles.wrapper]: true,
              [styles["wrapper--dark"]]: darkTheme,
            })
          : styles.wrapper
      }
    >
      <div className={styles.circle} />
      <input
        type='text'
        className={clsx({
          [styles.todo]: true,
          [styles["todo--dark"]]: darkTheme,
        })}
        placeholder='Create a new todo…'
        value={todo}
        maxLength={30}
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTodoHandler()}
      />
    </div>
  );
};

export default NewTodo;
