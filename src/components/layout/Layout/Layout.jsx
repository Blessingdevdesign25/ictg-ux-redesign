import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SkipLink from '../SkipLink/SkipLink.jsx';
import AnnouncementBar from '../AnnouncementBar/AnnouncementBar.jsx';
import SiteHeader from '../SiteHeader/SiteHeader.jsx';
import SiteFooter from '../SiteFooter/SiteFooter.jsx';
import styles from './Layout.module.css';

export default function Layout() {
  const mainRef = useRef(null);
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  // Move focus to <main> on route change so screen readers announce the new page.
  // Only pathname — query-string changes (filters) must NOT steal focus.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
    mainRef.current?.focus();
  }, [pathname]);

  return (
    <div className={styles.shell}>
      <SkipLink />
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" ref={mainRef} tabIndex={-1} className={styles.main}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
