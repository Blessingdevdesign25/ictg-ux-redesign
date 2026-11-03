import { Link } from 'react-router-dom';
import styles from './Breadcrumb.module.css';

/** items: [{ label, to }]; the last item is the current page. */
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol role="list" className={styles.list}>
        {items.map((item, i) => {
          const isCurrent = i === items.length - 1;
          return (
            <li key={item.label} className={styles.item}>
              {isCurrent ? (
                <span aria-current="page" className={styles.current}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className={styles.link}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
