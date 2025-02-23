import styles from "../styles/Spinner.module.css";

function Spinner({ style }) {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner} style={style}></div>
    </div>
  );
}

export default Spinner;
