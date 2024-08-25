/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-globals */
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";

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
        // element: <Home />,
      },
      {
        path: "/campaign",
        // element: <Campaign />,
      },
      {
        path: "/auth/login",
        element: (
          // <Aunthenticate>
            <Login />
          // </Aunthenticate>
        ),
      },
      {
        path: "/auth/register",
        element: (
          // <Aunthenticate>
            <Register />
          // </Aunthenticate>
        ),
      },
      {
        // path: "/profile",
        // element: (
        //   <PrivateRoute>
        //     {" "}
        //     <User />{" "}
        //   </PrivateRoute>
        // ),
        children: [
          // {
          //   index: true,
          //   element: <UserProfile />,
          // },
          
        ],
      },
      
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
