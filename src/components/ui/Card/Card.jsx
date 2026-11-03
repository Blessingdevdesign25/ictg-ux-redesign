import styles from './Card.module.css';

/**
 * Card base. `variant`: service | message | project.
 * For a whole-card click target put the class `card-link` on the card's single link
 * (stretched-link pattern from base.css) and pass `interactive`.
 */
export default function Card({ as: Tag = 'article', variant, interactive = false, className, children, ...rest }) {
  const classes = [styles.card, variant && styles[variant], interactive && styles.interactive, className]
    .filter(Boolean)
    .join(' ');
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
