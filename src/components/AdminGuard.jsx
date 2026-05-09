import { Navigate } from 'react-router-dom';
import NotFound from '../pages/NotFound';

export default function AdminGuard({ children }) {
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const isAuth = localStorage.getItem('TR_ADMIN_AUTH') === 'true';

  if (!isLocal && !isAuth) {
    // Return 404 instead of login to "hide" the page on production
    return <NotFound />;
  }

  return children;
}
