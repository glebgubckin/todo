import { FC, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, removeTodo } from "../../stores/todos.slice";
import { TodoProps } from "../../types/types";
import checked from "../../assets/checked.svg";
import clsx from "clsx";
import { ReactComponent as DeleteSVG } from "../../assets/delete.svg";
import { RootState } from "../../stores/store";
import styles from "./todo.module.scss";

const Todo: FC<TodoProps> = ({ id, status, value }) => {
  const dispatch = useDispatch();
  const darkTheme = useSelector((state: RootState) => state.app.darkTheme);

  const changeHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(changeStatus(id));
  };

  const deleteHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(removeTodo(id));
  };

  return (
    <div
      className={clsx({
        [styles.todo]: true,
        [styles["todo--dark"]]: darkTheme,
      })}
    >
      <button className={styles.btn} onClick={(e) => changeHandler(e)}>
        {status ? (
          <img className={styles.checked} src={checked} alt='completed' />
        ) : (
          <div className={styles.circle} />
        )}
      </button>
      <span
        className={clsx({
          [styles.todo__title]: true,
          [styles["todo__title--dark"]]: !status && darkTheme,
          [styles["todo__title--completed"]]: status && !darkTheme,
          [styles["todo__title--dark-completed"]]: status && darkTheme,
        })}
      >
        {value}
      </span>
      <button className={styles.delete} onClick={(e) => deleteHandler(e)}>
        <DeleteSVG fill={darkTheme ? "#ffffff" : "#171823"} />
      </button>
    </div>
  );
};

export default Todo;
