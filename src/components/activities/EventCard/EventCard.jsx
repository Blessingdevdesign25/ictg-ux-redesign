import Icon from '../../icons/Icon.jsx';
import Badge from '../../ui/Badge/Badge.jsx';
import Button from '../../ui/Button/Button.jsx';
import Card from '../../ui/Card/Card.jsx';
import { downloadIcs } from '../../../utils/ics.js';
import styles from './EventCard.module.css';

// Venues are in Nigeria: show local event time (WAT) regardless of the viewer's timezone.
const TZ = 'Africa/Lagos';
const DAY = new Intl.DateTimeFormat('en-GB', { day: 'numeric', timeZone: TZ });
const MONTH = new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: TZ });
const FULL = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  timeZone: TZ,
  timeZoneName: 'short',
});

export default function EventCard({ event, isPast = false }) {
  const start = new Date(event.start);
  return (
    <Card as="article" className={styles.card}>
      <div className={styles.date} aria-hidden="true">
        <span className={styles.day}>{DAY.format(start)}</span>
        <span className={styles.month}>{MONTH.format(start)}</span>
      </div>
      <div className={styles.body}>
        <Badge variant="brand" className={styles.badge}>
          {event.type}
        </Badge>
        <h2 className={styles.title}>{event.title}</h2>
        <ul role="list" className={styles.meta}>
          <li>
            <Icon name="calendar" className={styles.icon} />
            <time dateTime={event.start}>{FULL.format(start)}</time>
          </li>
          <li>
            <Icon name="map-pin" className={styles.icon} />
            <span className="visually-hidden">Location: </span>
            {event.location}
          </li>
        </ul>
        {!isPast && (
          <Button variant="secondary" icon="calendar" onClick={() => downloadIcs(event)} className={styles.action}>
            Add to calendar<span className="visually-hidden">: {event.title}</span>
          </Button>
        )}
      </div>
    </Card>
  );
}
