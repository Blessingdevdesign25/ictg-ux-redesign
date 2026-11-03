import { Link } from 'react-router-dom';
import { FOOTER_NAV, SOCIAL } from '../../../data/navigation.js';
import Icon from '../../icons/Icon.jsx';
import ExternalLink from '../../ui/ExternalLink/ExternalLink.jsx';
import NavItem from '../NavItem/NavItem.jsx';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.about}>
          <Link to="/" className={styles.brand}>
            Faith Tabernacle ICTG
          </Link>
          <p className={styles.muted}>
            The technology arm of Living Faith Church Worldwide, advancing the gospel through innovation,
            excellence and emerging technologies.
          </p>
          <ExternalLink href={SOCIAL.linkedin} className={styles.social} showIcon={false}>
            <Icon name="linkedin" className={styles.socialIcon} />
            Follow ICTG on LinkedIn
          </ExternalLink>
        </div>

        {FOOTER_NAV.map((group) => {
          const headingId = `footer-${slug(group.title)}`;
          return (
            <nav key={group.title} aria-labelledby={headingId}>
              <h2 id={headingId} className={styles.heading}>
                {group.title}
              </h2>
              <ul role="list" className={styles.list}>
                {group.items.map((item) => (
                  <li key={item.label}>
                    <NavItem item={item} className={styles.link} />
                  </li>
                ))}
              </ul>
            </nav>
          );
        })}
      </div>
      <div className={styles.bar}>
        <p className="container">
          © {year} Faith Tabernacle ICTG. Prototype redesign — content is illustrative.
        </p>
      </div>
    </footer>
  );
}

function slug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}
