import styles from './Badge.module.css';

/** Static label — variants: neutral | brand. */
export default function Badge({ variant = 'neutral', children, className }) {
  return <span className={[styles.badge, styles[variant], className].filter(Boolean).join(' ')}>{children}</span>;
}
