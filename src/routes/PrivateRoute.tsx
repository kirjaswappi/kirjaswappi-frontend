import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const userInformation = useAppSelector((state) => state.auth.userInformation);
  const location = useLocation();

  const isValid = Boolean(userInformation?.id && userInformation?.email);

  if (isValid) {
    return <>{children}</>;
  }

  return <Navigate to="/auth/login" state={{ path: location.pathname, from: location }} replace />;
}
