import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { appRoutes } from '../routes.jsx';
import { ROUTER_FUTURE } from '../routerFuture.js';

/** Exposes the router location so tests can assert on the query string (test id is unavoidable here). */
function LocationProbe() {
  const { pathname, search } = useLocation();
  return (
    <output data-testid="location" hidden>
      {pathname}
      {search}
    </output>
  );
}

/** Render the full app route tree at a given URL, e.g. renderAt('/messages?q=grace'). */
export function renderAt(url = '/', { withLocation = false } = {}) {
  return render(
    <MemoryRouter initialEntries={[url]} future={ROUTER_FUTURE}>
      <Routes>{appRoutes}</Routes>
      {withLocation && <LocationProbe />}
    </MemoryRouter>,
  );
}

/** Render a single element inside a router (for components using Link/NavLink). */
export function renderWithRouter(ui, { url = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[url]} future={ROUTER_FUTURE}>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
    </MemoryRouter>,
  );
}

/** Make `(min-width: 960px)` match (desktop layout). Returns a restore function. */
export function mockDesktop() {
  const original = window.matchMedia;
  window.matchMedia = (query) => ({
    matches: /min-width:\s*960px/.test(query),
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
  return () => {
    window.matchMedia = original;
  };
}
