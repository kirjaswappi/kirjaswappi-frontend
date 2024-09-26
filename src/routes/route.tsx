/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-globals */
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import ResetPassword from "../pages/auth/resetPassword";
import Home from "../pages/home";
import Authenticate from "./Aunthenticate";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      // <NoInternetConnection>
      // <ErrorBoundary FallbackComponent={ErrorReturn} onReset={() => (location.href = "/")}>
      <App />
      // </ErrorBoundary>
      // </NoInternetConnection>
    ),
    // errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/auth/login",
        element: (
          <Authenticate>
            <Login />
          // </Authenticate>
        ),
      },
      {
        path: "/password/reset",
        element: (
          <Authenticate>
            <ResetPassword />
          // </Authenticate>
        ),
      },
      {
        path: "/auth/register",
        element: (
          <Authenticate>
            <Register />
          // </Authenticate>
        ),
      },
      // {
      //   // path: "/profile",
      //   // element: (
      //   //   <PrivateRoute>
      //   //     {" "}
      //   //     <User />{" "}
      //   //   </PrivateRoute>
      //   // ),
      //   children: [
      //     // {
      //     //   index: true,
      //     //   element: <UserProfile />,
      //     // },

      //   ],
      // },

    ],
  },

  // {
  //   path: "*",
  //   element: <NotFound />,
  // },
  // {
  //   path: "/notFound",
  //   element: <NotFound />,
  // },
]);

export default routes;
