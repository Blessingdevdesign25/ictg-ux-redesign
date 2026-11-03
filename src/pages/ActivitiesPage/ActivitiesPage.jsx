import { useMemo, useState } from 'react';
import { EVENTS, EVENT_TYPES } from '../../data/events.js';
import { usePageTitle } from '../../hooks/usePageTitle.js';
import { filterEvents } from '../../utils/filterEvents.js';
import Breadcrumb from '../../components/ui/Breadcrumb/Breadcrumb.jsx';
import Button from '../../components/ui/Button/Button.jsx';
import Chip from '../../components/ui/Chip/Chip.jsx';
import EmptyState from '../../components/ui/EmptyState/EmptyState.jsx';
import EventCard from '../../components/activities/EventCard/EventCard.jsx';
import ResultsSummary from '../../components/messages/ResultsSummary/ResultsSummary.jsx';
import styles from './ActivitiesPage.module.css';

/** STRETCH (Phase 7): event filtering by time window + type. `now` injectable for tests. */
export default function ActivitiesPage({ now }) {
  usePageTitle('Activities');
  const [when, setWhen] = useState('upcoming');
  const [types, setTypes] = useState([]);

  const reference = useMemo(() => now ?? new Date(), [now]);
  const windowed = useMemo(() => filterEvents(EVENTS, { when, now: reference }), [when, reference]);
  const results = useMemo(() => filterEvents(EVENTS, { when, types, now: reference }), [when, types, reference]);

  const toggleType = (type) =>
    setTypes((current) => (current.includes(type) ? current.filter((t) => t !== type) : [...current, type]));

  return (
    <>
      <div className={styles.intro}>
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Home', to: '/' },
              { label: 'Activities', to: '/activities' },
            ]}
          />
          <h1 className={styles.title}>Activities</h1>
          <p className={styles.lead}>Trainings, outreaches, service support and meetings for ICTG members.</p>
        </div>
      </div>

      <div className={`container ${styles.body}`}>
        <div className={styles.controls}>
          <fieldset className={styles.segmented}>
            <legend className="visually-hidden">Show</legend>
            {[
              ['upcoming', 'Upcoming'],
              ['past', 'Past'],
            ].map(([value, label]) => (
              <label key={value} className={styles.segment}>
                <input
                  type="radio"
                  name="when"
                  value={value}
                  checked={when === value}
                  onChange={() => setWhen(value)}
                  className={styles.radio}
                />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>

          <div role="group" aria-labelledby="type-filter-label" className={styles.types}>
            <span id="type-filter-label" className={styles.groupLabel}>
              Activity type
            </span>
            <ul role="list" className={styles.chips}>
              {EVENT_TYPES.map((type) => (
                <li key={type}>
                  <Chip pressed={types.includes(type)} onClick={() => toggleType(type)}>
                    {type}
                  </Chip>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ResultsSummary shown={results.length} total={windowed.length} noun={`${when} activities`} />

        {results.length > 0 ? (
          <ul role="list" className={styles.grid}>
            {results.map((event) => (
              <li key={event.id}>
                <EventCard event={event} isPast={when === 'past'} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon="calendar"
            title={`No ${when} activities match these filters.`}
            action={
              types.length > 0 && (
                <Button variant="secondary" onClick={() => setTypes([])}>
                  Clear filters
                </Button>
              )
            }
          >
            {when === 'upcoming' ? 'Check past activities, or try another type.' : 'Try another activity type.'}
          </EmptyState>
        )}

        <p className={styles.note}>Activities are illustrative mock data.</p>
      </div>
    </>
  );
}
