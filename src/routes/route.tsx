/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-globals */
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import ResetPassword from "../pages/auth/resetPassword";
import BookDetails from "../pages/bookDetails";
import Books from "../pages/books";
import Profile from "../pages/profile";
import EditProfile from "../pages/profile/components/EditProfile";
import UserProfile from "../pages/profile/components/UserProfile";
import Authenticate from "./Authenticate";
import PrivateRoute from "./PrivateRoute";
import AddUpdateBook from "../pages/addUpdateBook";

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
        element: <Books />,
      },
      {
        path: "/book-details/:id",
        element: (
          <BookDetails />
        ),
      },
      
      {
        path: "/profile",
        element: (

          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
        children: [
          {
            loader: ()=> <p>Loading...</p>,
            index: true,
            path: "user-profile",
            element: <UserProfile />,
          },
          {
            path: "edit-user",
            element: <EditProfile />,
          },
          {
            path: "add-book",
            element: <AddUpdateBook />,
          },
          {
            path: "update-book/:id",
            element: <AddUpdateBook />,
          },
          // {
          //   path: "book-details/:id",
          //   element: <BookDetails />,
          // },
        ],
      },
      {
        path: "/map",
        element: (
          <Profile />
        ),
      },
      {
        path: "/message",
        element: (
          <Profile />
        ),
      },
      {
        path: "/auth/login",
        element: (
          <Authenticate>
            <Login />

          </Authenticate>
        ),
      },
      {
        path: "/password/reset",
        element: (
          <Authenticate>
            <ResetPassword />
          </Authenticate>
        ),
      },
      {
        path: "/auth/register",
        element: (
          <Authenticate>
            <Register />
          </Authenticate>
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
