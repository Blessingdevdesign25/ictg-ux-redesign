import { usePageTitle } from '../../hooks/usePageTitle.js';
import Hero from '../../components/home/Hero/Hero.jsx';
import ServicesGrid from '../../components/home/ServicesGrid/ServicesGrid.jsx';
import AboutSplit from '../../components/home/AboutSplit/AboutSplit.jsx';
import LatestMessages from '../../components/home/LatestMessages/LatestMessages.jsx';
import CoreValues from '../../components/home/CoreValues/CoreValues.jsx';
import ProjectShowcase from '../../components/home/ProjectShowcase/ProjectShowcase.jsx';
import JoinCta from '../../components/home/JoinCta/JoinCta.jsx';

export default function HomePage() {
  usePageTitle(null);

  return (
    <>
      <Hero />
      <ServicesGrid />
      <AboutSplit />
      <LatestMessages />
      <CoreValues />
      <ProjectShowcase />
      <JoinCta />
    </>
  );
}
