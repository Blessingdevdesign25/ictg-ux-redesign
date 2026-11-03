import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../../icons/Icon.jsx';
import styles from './MobileNav.module.css';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Wraps the single primary <nav>. Below 960px it renders a Menu toggle and turns the children into
 * a full-height panel: focus is trapped while open, Escape closes and refocuses the toggle,
 * body scroll is locked, and it closes on navigation. On desktop the children render inline.
 */
export default function MobileNav({ isDesktop, panelId, children }) {
  const [open, setOpen] = useState(false);
  const [panelTop, setPanelTop] = useState(0);
  const wrapRef = useRef(null);
  const toggleRef = useRef(null);
  const { pathname } = useLocation();
  const isModal = open && !isDesktop;

  useEffect(() => {
    setOpen(false);
  }, [pathname, isDesktop]);

  // Panel starts at the bottom of the header (the announcement bar may sit above it).
  useLayoutEffect(() => {
    if (!isModal) return;
    const header = wrapRef.current?.closest('header');
    if (header) setPanelTop(Math.max(0, header.getBoundingClientRect().bottom));
  }, [isModal]);

  useEffect(() => {
    if (!isModal) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isModal]);

  const onKeyDown = (e) => {
    if (!isModal) return;
    if (e.key === 'Escape') {
      setOpen(false);
      toggleRef.current?.focus();
      return;
    }
    if (e.key !== 'Tab') return;
    const nodes = [...wrapRef.current.querySelectorAll(FOCUSABLE)].filter((el) => !el.closest('[hidden]'));
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    // Captures Tab/Escape bubbling from controls inside the menu (focus trap); not itself interactive.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div ref={wrapRef} className={styles.wrap} onKeyDown={onKeyDown}>
      {!isDesktop && (
        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} className={styles.toggleIcon} />
          Menu
        </button>
      )}
      <div
        id={panelId}
        className={isDesktop ? styles.inline : styles.panel}
        hidden={!isDesktop && !open}
        style={isDesktop ? undefined : { '--panel-top': `${panelTop}px` }}
      >
        {children}
      </div>
    </div>
  );
}
