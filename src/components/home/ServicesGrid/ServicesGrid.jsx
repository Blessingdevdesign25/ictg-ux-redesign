import { SERVICES } from '../../../data/services.js';
import Icon from '../../icons/Icon.jsx';
import Card from '../../ui/Card/Card.jsx';
import SectionHeader from '../../ui/SectionHeader/SectionHeader.jsx';
import styles from './ServicesGrid.module.css';

/** All five services at once — replaces the 3-up carousel that hid two of them (audit #1). */
export default function ServicesGrid() {
  return (
    <section className="section" aria-labelledby="services-title">
      <div className="container">
        <SectionHeader
          id="services-title"
          eyebrow="What we do"
          title="Technology in service of the gospel"
          intro="Five teams, one mandate: make sure the message reaches every screen, every service, every time."
        />
        <ul role="list" className={styles.grid}>
          {SERVICES.map((service) => (
            <li key={service.id} className={styles.item}>
              <Card as="article" variant="service">
                <span className={styles.icon}>
                  <Icon name={service.icon} />
                </span>
                <h3>{service.title}</h3>
                <p className={styles.body}>{service.body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
