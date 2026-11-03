import { MESSAGES } from '../../../data/messages.js';
import { sortMessages } from '../../../utils/filterMessages.js';
import Button from '../../ui/Button/Button.jsx';
import SectionHeader from '../../ui/SectionHeader/SectionHeader.jsx';
import MessageCard from '../../messages/MessageCard/MessageCard.jsx';
import styles from './LatestMessages.module.css';

const LATEST = sortMessages(MESSAGES, 'newest').slice(0, 3);

/** 3 latest messages + a real "see all" destination (audit #1: the carousel had none). */
export default function LatestMessages() {
  return (
    <section className="section" id="latest-messages" aria-labelledby="latest-title">
      <div className="container">
        <SectionHeader
          id="latest-title"
          eyebrow="Gospel messages"
          title="Latest messages"
          intro="Catch up on recent services, or search the full library by speaker, service type or year."
          action={
            <Button to="/messages" variant="secondary" icon="arrow-right">
              Browse all messages
            </Button>
          }
        />
        <ul role="list" className={styles.grid}>
          {LATEST.map((message) => (
            <li key={message.id}>
              <MessageCard message={message} headingLevel={3} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
