import Icon from '../../icons/Icon.jsx';
import styles from './Select.module.css';

/**
 * Styled native <select> (native for a11y + mobile pickers).
 * `options`: [{ value, label }] or strings. `placeholder` renders an empty-value first option.
 */
export default function Select({ id, label, value, onChange, options, placeholder, className }) {
  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.control}>
        <select id={id} className={styles.select} value={value} onChange={(e) => onChange(e.target.value)}>
          {placeholder != null && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const o = typeof opt === 'string' ? { value: opt, label: opt } : opt;
            return (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            );
          })}
        </select>
        <Icon name="chevron-down" className={styles.chevron} />
      </div>
    </div>
  );
}
