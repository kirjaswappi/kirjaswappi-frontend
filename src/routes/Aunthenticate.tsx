/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, useLocation } from "react-router-dom";
// import { useAppSelector } from "../redux/hooks";

const Aunthenticate = ({ children }: { children: any }) => {
  const location = useLocation();
  // const { pathname, state } = location;
  // const { userAllInfo } = useAppSelector((state) => state.auth);

  // if (!userAllInfo) {
  //   return children;
  // }

  // if (userAllInfo) {
  //   return <Navigate to="/" state={{ ...state, path: pathname }} />;
  // }
  return children;
};

export default Aunthenticate;
