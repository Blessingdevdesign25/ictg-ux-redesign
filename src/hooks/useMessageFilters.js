import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MESSAGES } from '../data/messages.js';
import { applyFilters, countActiveFilters, DEFAULT_FILTERS, getFilterOptions } from '../utils/filterMessages.js';
import { parseFilters, serializeFilters } from '../utils/queryParams.js';

export const SEARCH_DEBOUNCE_MS = 250;

/**
 * URL-synced filter state for the Messages Library (`?q&speaker&category&year&sort`).
 * - Results update instantly as the user types; the `q` URL write is debounced (250ms, replace).
 * - `announced` is derived from the URL (debounced) values so the live region isn't chatty.
 */
export function useMessageFilters(messages = MESSAGES) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlFilters = useMemo(() => parseFilters(searchParams), [searchParams]);
  const [q, setQ] = useState(urlFilters.q);
  const timer = useRef(null);

  // URL → input (back/forward, chip removal, clear all) when no local edit is pending.
  useEffect(() => {
    if (timer.current === null) setQ(urlFilters.q);
  }, [urlFilters.q]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const writeUrl = useCallback(
    (next) => setSearchParams(serializeFilters(next), { replace: true }),
    [setSearchParams],
  );

  const setFilter = useCallback(
    (key, value) => {
      if (key === 'q') {
        setQ(value);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          timer.current = null;
          writeUrl({ ...urlFilters, q: value });
        }, SEARCH_DEBOUNCE_MS);
        return;
      }
      // Any other change flushes the pending search term into the same URL write.
      clearTimeout(timer.current);
      timer.current = null;
      writeUrl({ ...urlFilters, q, [key]: value });
    },
    [q, urlFilters, writeUrl],
  );

  const clearAll = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = null;
    setQ('');
    writeUrl({ ...DEFAULT_FILTERS, sort: urlFilters.sort });
  }, [urlFilters.sort, writeUrl]);

  const filters = useMemo(() => ({ ...urlFilters, q }), [urlFilters, q]);
  const results = useMemo(() => applyFilters(messages, filters), [messages, filters]);
  const announced = useMemo(() => applyFilters(messages, urlFilters).length, [messages, urlFilters]);
  const options = useMemo(() => getFilterOptions(messages), [messages]);

  return {
    filters,
    setFilter,
    clearAll,
    results,
    total: messages.length,
    announced,
    activeCount: countActiveFilters(filters),
    options,
  };
}
