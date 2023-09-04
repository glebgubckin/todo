import clsx from "clsx";
import { FC, MouseEvent } from "react";
import { filterStatus } from "./Todos";
import styles from "./todos.module.scss";

interface ControlsProps {
  todoListParametr: filterStatus;
  changeFilter: (e: MouseEvent<HTMLButtonElement>, param: filterStatus) => void;
}

const Controls: FC<ControlsProps> = ({ todoListParametr, changeFilter }) => {
  return (
    <div className={styles.footer__controls}>
      <button
        className={clsx({
          [styles.footer__control]: true,
          [styles["footer__control--active"]]: todoListParametr === "all",
        })}
        onClick={(e) => changeFilter(e, "all")}
      >
        All
      </button>
      <button
        className={clsx({
          [styles.footer__control]: true,
          [styles["footer__control--active"]]: todoListParametr === "active",
        })}
        onClick={(e) => changeFilter(e, "active")}
      >
        Active
      </button>
      <button
        className={clsx({
          [styles.footer__control]: true,
          [styles["footer__control--active"]]: todoListParametr === "completed",
        })}
        onClick={(e) => changeFilter(e, "completed")}
      >
        Completed
      </button>
    </div>
  );
};

export default Controls;
