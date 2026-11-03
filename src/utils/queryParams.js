import { DEFAULT_FILTERS, SORT_OPTIONS } from './filterMessages.js';

const KEYS = Object.keys(DEFAULT_FILTERS);
const VALID_SORTS = new Set(SORT_OPTIONS.map((o) => o.value));

/** URLSearchParams → filters object (unknown keys ignored, invalid sort falls back). */
export function parseFilters(searchParams) {
  const params = searchParams instanceof URLSearchParams ? searchParams : new URLSearchParams(searchParams);
  const filters = { ...DEFAULT_FILTERS };
  for (const key of KEYS) {
    const value = params.get(key);
    if (value != null) filters[key] = value.trim();
  }
  if (!VALID_SORTS.has(filters.sort)) filters.sort = DEFAULT_FILTERS.sort;
  return filters;
}

/** filters object → URLSearchParams, omitting empty/default values so URLs stay clean. */
export function serializeFilters(filters) {
  const params = new URLSearchParams();
  for (const key of KEYS) {
    const value = filters?.[key];
    if (value && value !== DEFAULT_FILTERS[key]) params.set(key, value);
  }
  return params;
}
