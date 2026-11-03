import Icon from '../../icons/Icon.jsx';
import styles from './ExternalLink.module.css';

/**
 * Link that leaves the site: new tab, safe rel, visible icon + screen-reader signpost.
 * `hiddenSuffix` adds extra visually-hidden context before the new-tab text (e.g. the card title).
 */
export default function ExternalLink({ href, children, className, showIcon = true, hiddenSuffix, ...rest }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[styles.link, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
      {hiddenSuffix && <span className="visually-hidden">{hiddenSuffix}</span>}
      {showIcon && <Icon name="external-link" className={styles.icon} />}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
