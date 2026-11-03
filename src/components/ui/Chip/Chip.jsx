import Icon from '../../icons/Icon.jsx';
import styles from './Chip.module.css';

/**
 * Chip — toggleable (`pressed` + `onClick` → aria-pressed) or removable (`onRemove`).
 * Removable chips are labelled "Remove filter: {removeLabel}".
 */
export default function Chip({ children, pressed, onClick, onRemove, removeLabel, className }) {
  const classes = [styles.chip, className].filter(Boolean).join(' ');

  if (onRemove) {
    return (
      <button
        type="button"
        className={`${classes} ${styles.removable}`}
        onClick={onRemove}
        aria-label={`Remove filter: ${removeLabel ?? children}`}
      >
        <span>{children}</span>
        <Icon name="close" className={styles.icon} />
      </button>
    );
  }

  return (
    <button type="button" className={classes} aria-pressed={Boolean(pressed)} onClick={onClick}>
      {pressed && <Icon name="check" className={styles.icon} />}
      {children}
    </button>
  );
}
