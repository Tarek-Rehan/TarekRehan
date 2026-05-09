import { Navigate } from 'react-router-dom';
import NotFound from '../pages/NotFound';

export default function AdminGuard({ children }) {
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  if (!isLocal) {
    // Strictly return 404 on production for any admin route
    return <NotFound />;
  }

  return children;
}
