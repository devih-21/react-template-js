import styles from './style.module.scss';
import { RedButton } from '../../components/custom/ButtonRs';

export const Example = () => {
  return (
    <header className={styles.AppHeader}>
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className={styles.AppLink}
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer">
        Learn React
      </a>
      <RedButton>Example</RedButton>
    </header>
  );
};
