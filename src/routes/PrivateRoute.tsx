/* eslint-disable react/jsx-no-useless-fragment */
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

interface UserInformation {
  id: string;
  email: string;
}

const isUserInformationValid = (userInformation: UserInformation | null): boolean => {
  return !!(userInformation?.id && userInformation?.email);
};

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { userInformation } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const { pathname, state } = location;

  if (isUserInformationValid(userInformation)) {
    return <>{children}</>;
  }

  return <Navigate to="/auth/login" state={{ ...state, path: pathname }} />;
}
