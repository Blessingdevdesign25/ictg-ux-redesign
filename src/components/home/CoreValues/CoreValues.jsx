import { CORE_VALUES } from '../../../data/coreValues.js';
import Icon from '../../icons/Icon.jsx';
import styles from './CoreValues.module.css';

const ICONS = { spirituality: 'heart', diligence: 'check', sacrifice: 'gift', creativity: 'lightbulb' };

/**
 * Split layout: large heading on the left, 2×2 value cards on the right; the first card is the
 * brand-filled feature. In the DOM each card's <h3> comes before its text (heading, then content for
 * screen readers); CSS `order` moves the title under the divider visually. Nothing here is focusable,
 * so the visual reorder can't affect tab order.
 */
export default function CoreValues() {
  return (
    <section className="section section-alt" aria-labelledby="values-title">
      <div className={`container ${styles.layout}`}>
        <h2 id="values-title" className={styles.title}>
          Our core values
        </h2>
        <ul role="list" className={styles.grid}>
          {CORE_VALUES.map((value, i) => (
            <li key={value.id}>
              <article className={[styles.card, i === 0 && styles.featured].filter(Boolean).join(' ')}>
                <h3 className={styles.name}>{value.title}</h3>
                <span className={styles.icon}>
                  <Icon name={ICONS[value.id] ?? 'check'} />
                </span>
                <p className={styles.body}>{value.body}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
