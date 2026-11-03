import { NavLink } from 'react-router-dom';
import ExternalLink from '../../ui/ExternalLink/ExternalLink.jsx';

/** Renders one navigation entry from data/navigation.js: internal route → NavLink, otherwise ExternalLink. */
export default function NavItem({ item, className }) {
  if (item.to) {
    return (
      <NavLink to={item.to} end className={className}>
        {item.label}
      </NavLink>
    );
  }
  return (
    <ExternalLink href={item.href} className={className}>
      {item.label}
    </ExternalLink>
  );
}
