import { SORT_OPTIONS } from '../../../utils/filterMessages.js';
import Button from '../../ui/Button/Button.jsx';
import SearchInput from '../../ui/SearchInput/SearchInput.jsx';
import Select from '../../ui/Select/Select.jsx';
import FilterSheet from '../FilterSheet/FilterSheet.jsx';
import styles from './MessageFilters.module.css';

/**
 * Search + filters. ≥960px: one inline filter bar. <960px: search stays visible, the selects move into
 * a FilterSheet dialog. Only one set of controls is ever rendered, so ids/labels stay unique.
 */
export default function MessageFilters({ filters, setFilter, clearAll, options, isDesktop, resultCount }) {
  const sheetCount = ['speaker', 'category', 'year'].filter((k) => filters[k]).length;
  const anyActive = Boolean(filters.q) || sheetCount > 0;

  const selects = (
    <>
      <Select
        id="filter-speaker"
        label="Speaker"
        value={filters.speaker}
        onChange={(v) => setFilter('speaker', v)}
        placeholder="All speakers"
        options={options.speakers}
      />
      <Select
        id="filter-category"
        label="Service type"
        value={filters.category}
        onChange={(v) => setFilter('category', v)}
        placeholder="All service types"
        options={options.categories}
      />
      <Select
        id="filter-year"
        label="Year"
        value={filters.year}
        onChange={(v) => setFilter('year', v)}
        placeholder="All years"
        options={options.years}
      />
      <Select
        id="filter-sort"
        label="Sort by"
        value={filters.sort}
        onChange={(v) => setFilter('sort', v)}
        options={SORT_OPTIONS}
      />
    </>
  );

  return (
    <form role="search" aria-label="Filter messages" className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <SearchInput
        id="message-search"
        label="Search messages"
        value={filters.q}
        onChange={(v) => setFilter('q', v)}
        placeholder="Title, speaker or topic"
        className={styles.search}
      />

      {isDesktop ? (
        <>
          {selects}
          {anyActive && (
            <Button variant="ghost" onClick={clearAll} className={styles.clear}>
              Clear all
            </Button>
          )}
        </>
      ) : (
        <div className={styles.sheetTrigger}>
          <FilterSheet activeCount={sheetCount} resultCount={resultCount} onClearAll={clearAll}>
            {selects}
          </FilterSheet>
        </div>
      )}
    </form>
  );
}
