import styles from './ResultsSummary.module.css';

/** Polite live region. Always mounted so screen readers pick up changes. */
export default function ResultsSummary({ shown, total, noun = 'messages' }) {
  return (
    <p role="status" aria-live="polite" className={styles.summary}>
      Showing <strong>{shown}</strong> of {total} {noun}
    </p>
  );
}
