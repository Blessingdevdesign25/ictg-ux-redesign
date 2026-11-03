import { useEffect } from 'react';

const SITE = 'Faith Tabernacle ICTG';

/** Sets a unique document title per route (WCAG 2.4.2). */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : SITE;
  }, [title]);
}
