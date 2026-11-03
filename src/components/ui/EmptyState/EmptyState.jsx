import Icon from '../../icons/Icon.jsx';
import styles from './EmptyState.module.css';

/** Zero-results state: icon, message and a recovery action. `headingLevel` keeps the outline correct. */
export default function EmptyState({ title, children, action, headingLevel = 2, icon = 'search' }) {
  const Heading = `h${headingLevel}`;
  return (
    <div className={styles.empty}>
      <span className={styles.iconWrap}>
        <Icon name={icon} />
      </span>
      <Heading className={styles.title}>{title}</Heading>
      {children && <div className={styles.body}>{children}</div>}
      {action && <div>{action}</div>}
    </div>
  );
}
