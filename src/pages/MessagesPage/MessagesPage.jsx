import { usePageTitle } from '../../hooks/usePageTitle.js';
import { DESKTOP_QUERY, useMediaQuery } from '../../hooks/useMediaQuery.js';
import { useMessageFilters } from '../../hooks/useMessageFilters.js';
import Breadcrumb from '../../components/ui/Breadcrumb/Breadcrumb.jsx';
import Button from '../../components/ui/Button/Button.jsx';
import EmptyState from '../../components/ui/EmptyState/EmptyState.jsx';
import ActiveFilters from '../../components/messages/ActiveFilters/ActiveFilters.jsx';
import MessageFilters from '../../components/messages/MessageFilters/MessageFilters.jsx';
import MessageGrid from '../../components/messages/MessageGrid/MessageGrid.jsx';
import ResultsSummary from '../../components/messages/ResultsSummary/ResultsSummary.jsx';
import styles from './MessagesPage.module.css';

/** Messages Library — the "Gospel Messages" carousel rebuilt as a searchable library (audit #1). */
export default function MessagesPage() {
  usePageTitle('Messages library');
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const { filters, setFilter, clearAll, results, total, announced, options } = useMessageFilters();

  return (
    <>
      <div className={styles.intro}>
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Home', to: '/' },
              { label: 'Messages', to: '/messages' },
            ]}
          />
          <h1 className={styles.title}>Messages library</h1>
          <p className={styles.lead}>
            Search sermons and services from Faith Tabernacle by title, speaker or topic, then narrow by service type
            or year.
          </p>
        </div>
      </div>

      <div className={`container ${styles.body}`}>
        <MessageFilters
          filters={filters}
          setFilter={setFilter}
          clearAll={clearAll}
          options={options}
          isDesktop={isDesktop}
          resultCount={results.length}
        />

        <div className={styles.summary}>
          <ResultsSummary shown={announced} total={total} />
          <ActiveFilters filters={filters} setFilter={setFilter} />
        </div>

        {results.length > 0 ? (
          <MessageGrid messages={results} query={filters.q} />
        ) : (
          <EmptyState
            title={filters.q ? `No messages match “${filters.q}”.` : 'No messages match these filters.'}
            action={
              <Button variant="secondary" onClick={clearAll}>
                Clear filters
              </Button>
            }
          >
            Try a different keyword, or remove a filter to see more messages.
          </EmptyState>
        )}

        <p className={styles.note}>
          Messages beyond the five shown on the current ICTG home page are illustrative mock data.
        </p>
      </div>
    </>
  );
}
