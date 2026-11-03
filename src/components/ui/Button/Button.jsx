import { Link } from 'react-router-dom';
import Icon from '../../icons/Icon.jsx';
import styles from './Button.module.css';

/**
 * Button — variants: primary | secondary | ghost; sizes: md | lg; `onDark` for dark surfaces.
 * Renders <Link> when `to`, <a> when `href` (`external` opens a new tab), else <button>.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  onDark = false,
  to,
  href,
  external = false,
  icon,
  className,
  children,
  type = 'button',
  ...rest
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    onDark && styles.onDark,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {children}
      {icon && <Icon name={icon} className={styles.icon} />}
      {external && (
        <>
          <Icon name="external-link" className={styles.icon} />
          <span className="visually-hidden"> (opens in a new tab)</span>
        </>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a href={href} className={classes} {...externalProps} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
