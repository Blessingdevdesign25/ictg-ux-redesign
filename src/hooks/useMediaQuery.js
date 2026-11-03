import { useCallback, useSyncExternalStore } from 'react';

/** Live boolean for a CSS media query. Safe when matchMedia is unavailable (returns false). */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      if (typeof window === 'undefined' || !window.matchMedia) return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener?.('change', onChange);
      return () => mql.removeEventListener?.('change', onChange);
    },
    [query],
  );

  const getSnapshot = () =>
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false;

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export const DESKTOP_QUERY = '(min-width: 960px)';
