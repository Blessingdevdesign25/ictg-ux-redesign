import styles from './SectionHeader.module.css';

/**
 * Section heading block. `id` goes on the <h2> so the parent <section aria-labelledby={id}> is named.
 */
export default function SectionHeader({ id, eyebrow, title, intro, action, onDark = false, align = 'start' }) {
  return (
    <div className={[styles.header, onDark && styles.onDark, align === 'center' && styles.center].filter(Boolean).join(' ')}>
      <div className={styles.text}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
        {intro && <p className={styles.intro}>{intro}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
