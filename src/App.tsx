import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./stores/store";
import Todos from "./modules/Todos/Todos";
import clsx from "clsx";
import styles from "./styles/app.module.scss";

const App: FC = () => {
  const darkTheme = useSelector((state: RootState) => state.app.darkTheme);

  return (
    <div
      className={clsx({
        [styles.wrapper]: true,
        [styles["wrapper--dark"]]: darkTheme,
      })}
    >
      <div className={styles.inner}>
        <div className={styles.bg} />
        <Todos />
      </div>
    </div>
  );
};

export default App;
