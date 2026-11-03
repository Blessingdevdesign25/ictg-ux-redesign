import { Link } from 'react-router-dom';
import { usePageTitle } from '../../hooks/usePageTitle.js';

export default function NotFoundPage() {
  usePageTitle('Page not found');
  return (
    <div className="container section">
      <h1>Page not found</h1>
      <p>
        The page you’re looking for doesn’t exist. <Link to="/">Go to the home page</Link> or{' '}
        <Link to="/messages">browse messages</Link>.
      </p>
    </div>
  );
}
