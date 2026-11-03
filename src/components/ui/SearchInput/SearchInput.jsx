import { useRef } from 'react';
import Icon from '../../icons/Icon.jsx';
import styles from './SearchInput.module.css';

/** Labelled `type="search"` input with a clear button that returns focus to the input. */
export default function SearchInput({ id, label, value, onChange, placeholder, hideLabel = false, className }) {
  const inputRef = useRef(null);

  const clear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label htmlFor={id} className={hideLabel ? 'visually-hidden' : styles.label}>
        {label}
      </label>
      <div className={styles.control}>
        <Icon name="search" className={styles.searchIcon} />
        <input
          ref={inputRef}
          id={id}
          type="search"
          className={styles.input}
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape' && value) {
              e.preventDefault();
              onChange('');
            }
          }}
        />
        {value && (
          <button type="button" className={styles.clear} onClick={clear} aria-label="Clear search">
            <Icon name="close" />
          </button>
        )}
      </div>
    </div>
  );
}
