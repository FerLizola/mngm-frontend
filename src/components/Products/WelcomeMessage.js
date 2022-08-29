import styles from "./WelcomeMessage.module.css";

const WelcomeMessage = () => {
  return (
    <section className={styles.summary}>
      <h2>Ready to back to School!</h2>
      <p>
        All you will need  to be back to school you can find it here!
        Come and see all our variety of school supplies!
      </p>
    </section>
  );
};

export default WelcomeMessage;
