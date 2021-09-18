import styles from "./style.module.css";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading_dot}></div>
      <div className={styles.loading_dot}></div>
      <div className={styles.loading_dot}></div>
      <div className={styles.loading_dot}></div>
    </div>
  );
};

export default Loading;
