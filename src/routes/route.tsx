/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-globals */
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    // element: (
    //   <NoInternetConnection>
    //     <ErrorBoundary FallbackComponent={ErrorReturn} onReset={() => (location.href = "/")}>
    //       <App />
    //     </ErrorBoundary>
    //   </NoInternetConnection>
    // ),
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
