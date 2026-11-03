import { PRIMARY_CTA, SOCIAL } from '../../../data/navigation.js';
import Button from '../../ui/Button/Button.jsx';
import Icon from '../../icons/Icon.jsx';
import ExternalLink from '../../ui/ExternalLink/ExternalLink.jsx';
import styles from './JoinCta.module.css';

export default function JoinCta() {
  return (
    <section className={styles.band} aria-labelledby="join-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <h2 id="join-title" className={styles.title}>
            Use your skills to serve
          </h2>
          <p className={styles.text}>
            Developers, designers, broadcast crew and support volunteers are all welcome. Join ICTG and help put the
            gospel on every screen.
          </p>
        </div>
        <div className={styles.actions}>
          <Button href={PRIMARY_CTA.href} external size="lg">
            Become a member
          </Button>
          <ExternalLink href={SOCIAL.linkedin} className={styles.social} showIcon={false}>
            <Icon name="linkedin" className={styles.socialIcon} />
            Follow on LinkedIn
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}
