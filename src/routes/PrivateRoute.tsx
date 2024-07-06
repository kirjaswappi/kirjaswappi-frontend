/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import Loader from "../components/shared/Loader";
// import { useAppSelector } from "../redux/hooks";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  // const { userInfo, loading } = useAppSelector((state) => state.auth);
  // const location = useLocation();
  // const { pathname, state } = location;
  // // console.log("userInfo", userInfo, userToken, pathname);
  // if (loading) {
  //   return <Loader />;
  // }

  // if (userInfo) {
  //   return <>{children}</>;
  // }

  // if (!userInfo && !loading) {
  //   return <Navigate to="/auth/signin" state={{ ...state, path: pathname }} />;
  // }
  return <>{children}</>;
}
