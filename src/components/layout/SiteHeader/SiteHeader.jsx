import { Link } from 'react-router-dom';
import { PRIMARY_CTA, PRIMARY_NAV } from '../../../data/navigation.js';
import { DESKTOP_QUERY, useMediaQuery } from '../../../hooks/useMediaQuery.js';
import Button from '../../ui/Button/Button.jsx';
import MobileNav from '../MobileNav/MobileNav.jsx';
import NavDropdown from '../NavDropdown/NavDropdown.jsx';
import NavItem from '../NavItem/NavItem.jsx';
import styles from './SiteHeader.module.css';

/**
 * Sticky header with ONE primary <nav> (audit #2: the live site renders it 4×).
 * Dropdowns are disclosure buttons; below 960px the same nav moves into the MobileNav panel.
 */
export default function SiteHeader() {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} aria-label="ICTG home" data-home-link="">
          <span aria-hidden="true">ICT</span>
          <span aria-hidden="true" className={styles.logoAccent}>
            Group
          </span>
        </Link>

        <MobileNav isDesktop={isDesktop} panelId="site-menu">
          <nav aria-label="Primary" className={styles.nav}>
            <ul role="list" className={styles.navList}>
              {PRIMARY_NAV.map((item) =>
                item.children ? (
                  <NavDropdown
                    key={item.label}
                    label={item.label}
                    items={item.children}
                    variant={isDesktop ? 'popover' : 'accordion'}
                  />
                ) : (
                  <li key={item.label}>
                    <NavItem item={item} className={styles.navLink} />
                  </li>
                ),
              )}
            </ul>
          </nav>
          {/* Outline, not filled: the hero owns the page's single filled "Join ICTG" (audit #2). */}
          <Button href={PRIMARY_CTA.href} external variant="secondary" onDark className={styles.cta}>
            {PRIMARY_CTA.label}
          </Button>
        </MobileNav>
      </div>
    </header>
  );
}
