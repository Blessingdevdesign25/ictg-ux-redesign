import Icon from '../../icons/Icon.jsx';
import Badge from '../../ui/Badge/Badge.jsx';
import Card from '../../ui/Card/Card.jsx';
import ExternalLink from '../../ui/ExternalLink/ExternalLink.jsx';
import Highlight from '../../ui/Highlight/Highlight.jsx';
import { formatDate, formatDuration } from '../../../utils/formatDate.js';
import styles from './MessageCard.module.css';

const THUMBS = 4;

/** Stable gradient per category so the grid has visual rhythm without photos. */
function thumbFor(category) {
  let hash = 0;
  for (const ch of String(category)) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return (hash % THUMBS) + 1;
}

/**
 * Message card. One stretched "Watch on YouTube" link (title appended for screen readers);
 * cards without a video show "Video coming soon" and are not clickable.
 */
export default function MessageCard({ message, headingLevel = 3, query = '' }) {
  const Heading = `h${headingLevel}`;
  const hasVideo = Boolean(message.videoUrl);
  const duration = formatDuration(message.durationMin);

  return (
    <Card variant="message" interactive={hasVideo} className={styles.card}>
      <div className={styles.thumb} style={{ '--thumb': `var(--gradient-thumb-${thumbFor(message.category)})` }}>
        <span className={styles.play}>
          <Icon name="play" />
        </span>
        <span className={styles.duration} aria-hidden="true">
          {duration}
        </span>
      </div>

      <div className={styles.body}>
        <Badge variant="brand" className={styles.badge}>
          {message.category}
        </Badge>
        <Heading className={styles.title}>
          <Highlight text={message.title} query={query} />
        </Heading>
        <ul role="list" className={styles.meta}>
          <li>
            <Icon name="user" className={styles.metaIcon} />
            <span className="visually-hidden">Speaker: </span>
            <Highlight text={message.speaker} query={query} />
          </li>
          <li>
            <Icon name="calendar" className={styles.metaIcon} />
            <time dateTime={message.date}>{formatDate(message.date)}</time>
          </li>
          <li>
            <Icon name="clock" className={styles.metaIcon} />
            <span className="visually-hidden">Duration: </span>
            {duration}
          </li>
        </ul>

        <div className={styles.footer}>
          {hasVideo ? (
            <ExternalLink href={message.videoUrl} className={`card-link ${styles.action}`} hiddenSuffix={`: ${message.title}`}>
              Watch on YouTube
            </ExternalLink>
          ) : (
            <p className={styles.soon}>Video coming soon</p>
          )}
        </div>
      </div>
    </Card>
  );
}
