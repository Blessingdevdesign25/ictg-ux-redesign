import MessageCard from '../MessageCard/MessageCard.jsx';
import styles from './MessageGrid.module.css';

/** Responsive 1 / 2 / 3 column list of message cards. Card titles are h2 (page h1 is the only parent). */
export default function MessageGrid({ messages, query }) {
  return (
    <ul role="list" className={styles.grid}>
      {messages.map((message) => (
        <li key={message.id}>
          <MessageCard message={message} headingLevel={2} query={query} />
        </li>
      ))}
    </ul>
  );
}
