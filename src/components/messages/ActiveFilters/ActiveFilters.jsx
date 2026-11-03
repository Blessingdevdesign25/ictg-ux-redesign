import Chip from '../../ui/Chip/Chip.jsx';
import styles from './ActiveFilters.module.css';

const LABELS = { q: 'Search', speaker: 'Speaker', category: 'Service type', year: 'Year' };

/** Removable chips for each active filter, e.g. "Remove filter: Speaker Bishop David Oyedepo". */
export default function ActiveFilters({ filters, setFilter }) {
  const active = Object.keys(LABELS).filter((key) => filters[key]);
  if (active.length === 0) return null;

  return (
    <ul role="list" className={styles.list} aria-label="Active filters">
      {active.map((key) => (
        <li key={key}>
          <Chip onRemove={() => setFilter(key, '')} removeLabel={`${LABELS[key]} ${filters[key]}`}>
            <span className={styles.key}>{LABELS[key]}:</span> {key === 'q' ? `“${filters.q}”` : filters[key]}
          </Chip>
        </li>
      ))}
    </ul>
  );
}
