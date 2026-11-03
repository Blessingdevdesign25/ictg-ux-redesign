import ExternalLink from '../../ui/ExternalLink/ExternalLink.jsx';
import styles from './AboutSplit.module.css';

const ABOUT_URL = 'https://ftwinnersictg.org/about-us/';

export default function AboutSplit() {
  return (
    <section className="section section-alt" aria-labelledby="about-title">
      <div className={`container ${styles.split}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>About ICTG</p>
          <h2 id="about-title">Dedicated to serving God with our skills</h2>
          <p>
            The Faith Tabernacle ICT Group is a volunteer service unit of Living Faith Church Worldwide. Our members —
            engineers, designers, broadcasters and support staff — give their time so that services run smoothly in
            the auditorium and reach millions online.
          </p>
          <p>
            From the broadcast desk to the members&apos; portal, we treat every system as part of the Liberation
            Mandate: excellent, reliable and built to serve people.
          </p>
          <ExternalLink href={ABOUT_URL} className={styles.link}>
            More about ICTG
          </ExternalLink>
        </div>
        <img
          className={styles.image}
          src="/images/about-illustration.svg"
          width="560"
          height="420"
          loading="lazy"
          decoding="async"
          alt="Illustration of a broadcast control desk: three monitors showing a live service stream, an audio mixer and a network rack."
        />
      </div>
    </section>
  );
}
