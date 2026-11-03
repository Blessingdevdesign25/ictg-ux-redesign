import { MESSAGES } from '../../../data/messages.js';
import { PRIMARY_CTA } from '../../../data/navigation.js';
import { sortMessages } from '../../../utils/filterMessages.js';
import Button from '../../ui/Button/Button.jsx';
import styles from './Hero.module.css';

const latestWithVideo = sortMessages(MESSAGES, 'newest').find((m) => m.videoUrl);

/** Owns the page's single <h1> (audit #2: the live hero splits it across three <h2>s). */
export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow}>Welcome to</p>
        <h1 id="hero-title" className={styles.title}>
          Faith Tabernacle ICT Group
        </h1>
        <p className={styles.lead}>
          The technology service unit of Living Faith Church — broadcasting the gospel to the nations, building
          ministry software and keeping every service online.
        </p>
        <div className={styles.actions}>
          <Button href={PRIMARY_CTA.href} external size="lg">
            Join ICTG
          </Button>
          {latestWithVideo && (
            <Button href={latestWithVideo.videoUrl} external variant="secondary" onDark size="lg">
              Watch latest message
              <span className="visually-hidden">: {latestWithVideo.title}</span>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
