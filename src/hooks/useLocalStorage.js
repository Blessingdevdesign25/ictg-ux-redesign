import { useCallback, useState } from 'react';

/**
 * useState backed by localStorage. Every access is wrapped in try/catch: storage can be
 * unavailable (private mode, blocked cookies) and the UI must still work without it.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? initialValue : JSON.parse(raw);
    } catch {
      return initialValue;
    }
  });

  const set = useCallback(
    (next) => {
      setValue(next);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Storage unavailable — keep in-memory state only.
      }
    },
    [key],
  );

  return [value, set];
}
