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
    const { userInformation } = useAppSelector((state) => state.auth);
    const { data } = useGetUserByIdQuery(userInformation.id, {
        skip: !userInformation.id,
    });

    useEffect(() => {
        if (data) {
            dispatch(setUserInformation(data));
        }
    }, [data]);

    return (
        <React.Fragment>
            <RouterProvider router={routes} />
        </React.Fragment>
    );
}
