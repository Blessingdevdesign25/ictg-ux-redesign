import { useEffect, useId, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../../icons/Icon.jsx';
import NavItem from '../NavItem/NavItem.jsx';
import { useDisclosure } from '../../../hooks/useDisclosure.js';
import styles from './NavDropdown.module.css';

/**
 * Disclosure-pattern dropdown (NOT role="menu"): a <button aria-expanded aria-controls> that shows a
 * plain list of links. `variant="popover"` (desktop) also closes on outside click and focus leaving;
 * `variant="accordion"` (mobile menu) stays open until toggled. Escape closes and refocuses the trigger.
 */
export default function NavDropdown({ label, items, variant = 'popover' }) {
  const { isOpen, close, toggle } = useDisclosure();
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const panelId = `nav-${useId().replace(/:/g, '')}`;
  const { pathname } = useLocation();
  const isPopover = variant === 'popover';

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!isOpen || !isPopover) return undefined;
    const onPointerDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) close();
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [isOpen, isPopover, close]);

  const onKeyDown = (e) => {
    if (e.key === 'Escape' && isOpen) {
      e.stopPropagation();
      close();
      triggerRef.current?.focus();
    }
  };

  const onBlur = (e) => {
    if (isPopover && isOpen && !wrapRef.current?.contains(e.relatedTarget)) close();
  };

  return (
    // Key/blur handlers on the wrapper catch events bubbling from the trigger and links inside.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li ref={wrapRef} className={`${styles.item} ${styles[variant]}`} onKeyDown={onKeyDown} onBlur={onBlur}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={toggle}
      >
        {label}
        <Icon name="chevron-down" className={styles.chevron} />
      </button>
      <ul id={panelId} role="list" className={styles.panel} hidden={!isOpen}>
        {items.map((item) => (
          <li key={item.label}>
            <NavItem item={item} className={styles.link} />
          </li>
        ))}
      </ul>
    </li>
  );
}
