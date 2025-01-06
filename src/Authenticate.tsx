import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import {
    useGetUserByIdQuery
} from "./redux/feature/auth/authApi";
import { setUserInformation } from "./redux/feature/auth/authSlice";
import { useAppSelector } from "./redux/hooks";
import routes from "./routes/route";

export default function Authenticate() {
    const dispatch = useDispatch();
    // const [authenticate] = useAuthenticateMutation();
    const { userInformation } = useAppSelector((state) => state.auth);
    const { data } = useGetUserByIdQuery(userInformation.id, {
        skip: !userInformation.id,
    });
    // const hasFetched = useRef(false);
    // useEffect(() => {
    //     const auth = async () => {
    //         try {
    //             await authenticate({
    //                 username: "user",
    //                 password: "mak12345",
    //             }).unwrap();
    //         } catch (error) {
    //             console.log("Authentication error", error);
    //         }
    //     };
    //     if (!hasFetched.current) {
    //         const jwtToken =  getCookie("jwtToken");
    //         console.log("authenticate jwtToken ", jwtToken)
    //         if (!jwtToken && isCookieExpired('jwtToken')) {
    //             hasFetched.current = true;
    //             auth();
    //         }
    //     }
    // }, []);

    useEffect(() => {
        if (data) {
            dispatch(setUserInformation(data));
        }
    }, [data]);

    // if (isLoading) return <Loader />;

    return (
        <React.Fragment>
            <RouterProvider router={routes} />
        </React.Fragment>
    );
}
