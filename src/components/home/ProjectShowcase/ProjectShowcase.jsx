import { PROJECTS } from '../../../data/projects.js';
import Icon from '../../icons/Icon.jsx';
import Badge from '../../ui/Badge/Badge.jsx';
import Card from '../../ui/Card/Card.jsx';
import ExternalLink from '../../ui/ExternalLink/ExternalLink.jsx';
import SectionHeader from '../../ui/SectionHeader/SectionHeader.jsx';
import styles from './ProjectShowcase.module.css';

const PROJECTS_URL = 'https://ftwinnersictg.org/projects/';
const THUMB_ICONS = ['layers', 'code', 'broadcast'];

/**
 * Richer project cards (audit #3): summary + tags. Projects without a real URL render as
 * non-link cards — we don't invent destinations.
 */
export default function ProjectShowcase() {
  return (
    <section className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader
          id="projects-title"
          eyebrow="Project showcase"
          title="Built by ICTG volunteers"
          intro="A few of the tools our members design, build and maintain for the church."
          action={
            <ExternalLink href={PROJECTS_URL} className={styles.all}>
              See all projects
            </ExternalLink>
          }
        />
        <ul role="list" className={styles.grid}>
          {PROJECTS.map((project, i) => (
            <li key={project.id}>
              <Card as="article" variant="project" interactive={Boolean(project.href)}>
                <div className={styles.thumb} style={{ '--thumb': `var(--gradient-thumb-${(i % 4) + 1})` }}>
                  <Icon name={THUMB_ICONS[i % THUMB_ICONS.length]} />
                </div>
                <div className={styles.body}>
                  <h3>{project.title}</h3>
                  <p className={styles.summary}>{project.summary}</p>
                  <ul role="list" className={styles.tags} aria-label="Technologies">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <Badge>{tag}</Badge>
                      </li>
                    ))}
                  </ul>
                  {project.href && (
                    <ExternalLink href={project.href} className={`card-link ${styles.link}`} hiddenSuffix={`: ${project.title}`}>
                      View project
                    </ExternalLink>
                  )}
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
