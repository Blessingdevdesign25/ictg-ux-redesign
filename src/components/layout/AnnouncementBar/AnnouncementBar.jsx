import { ANNOUNCEMENT } from '../../../data/navigation.js';
import { useLocalStorage } from '../../../hooks/useLocalStorage.js';
import Icon from '../../icons/Icon.jsx';
import ExternalLink from '../../ui/ExternalLink/ExternalLink.jsx';
import styles from './AnnouncementBar.module.css';

/** Single home for the Shiloh registration CTA (audit #2). Dismissal is remembered per announcement id. */
export default function AnnouncementBar({ announcement = ANNOUNCEMENT }) {
  const [dismissed, setDismissed] = useLocalStorage(`ictg:announcement-dismissed:${announcement.id}`, false);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    // The button is about to unmount — hand focus to the next logical control.
    document.querySelector('[data-home-link]')?.focus();
  };

  return (
    <aside className={styles.bar} aria-label="Announcement">
      <div className={`container ${styles.inner}`}>
        <p className={styles.text}>
          {announcement.text}{' '}
          <ExternalLink href={announcement.cta.href} className={styles.link}>
            {announcement.cta.label}
          </ExternalLink>
        </p>
        <button type="button" className={styles.dismiss} onClick={dismiss} aria-label="Dismiss announcement">
          <Icon name="close" />
        </button>
      </div>
    </aside>
  );
}
