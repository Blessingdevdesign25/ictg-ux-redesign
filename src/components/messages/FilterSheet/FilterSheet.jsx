import { useRef } from 'react';
import Icon from '../../icons/Icon.jsx';
import Button from '../../ui/Button/Button.jsx';
import styles from './FilterSheet.module.css';

/**
 * Mobile filters in a native modal <dialog> (focus trap, Escape and inert background for free).
 * Focus returns to the "Filters" trigger whenever the dialog closes.
 */
export default function FilterSheet({ activeCount, resultCount, onClearAll, children }) {
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button ref={triggerRef} type="button" className={styles.trigger} aria-haspopup="dialog" onClick={open}>
        <Icon name="filter" className={styles.triggerIcon} />
        Filters{activeCount > 0 ? ` (${activeCount})` : ''}
      </button>

      {/* Backdrop click is a pointer convenience; Escape and the Close button cover keyboard users. */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <dialog
        ref={dialogRef}
        className={styles.sheet}
        aria-labelledby="filter-sheet-title"
        onClose={() => triggerRef.current?.focus()}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className={styles.head}>
          <h2 id="filter-sheet-title" className={styles.title}>
            Filter messages
          </h2>
          <button type="button" className={styles.close} onClick={close} aria-label="Close filters">
            <Icon name="close" />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        <div className={styles.foot}>
          {activeCount > 0 && (
            <Button variant="ghost" onClick={onClearAll}>
              Clear all
            </Button>
          )}
          <Button onClick={close} className={styles.show}>
            Show {resultCount} {resultCount === 1 ? 'result' : 'results'}
          </Button>
        </div>
      </dialog>
    </>
  );
}
