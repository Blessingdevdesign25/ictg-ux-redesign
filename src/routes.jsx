import { Route } from 'react-router-dom';
import Layout from './components/layout/Layout/Layout.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import MessagesPage from './pages/MessagesPage/MessagesPage.jsx';
import ActivitiesPage from './pages/ActivitiesPage/ActivitiesPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';

// Shared by main.jsx (BrowserRouter) and tests (MemoryRouter).
export const appRoutes = (
  <Route element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="messages" element={<MessagesPage />} />
    <Route path="activities" element={<ActivitiesPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>
);
