import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie, isCookieExpired, setCookie } from "../../utility/cookies";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_REACT_MAIN_API,
        prepareHeaders: async (headers, { endpoint }) => {
            if (endpoint === "authenticate") return headers;
            const jwtToken = getCookie("jwtToken");
            let token = jwtToken;
            
            if (!token) {
                const data = JSON.stringify({
                    username: "user",
                    password: "mak12345",
                });
                await fetch(
                    `${import.meta.env.VITE_REACT_MAIN_API}/authenticate`,
                    {
                        method: "POST",
                        body: data,
                        headers: { "Content-Type": "application/json" },
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        const { jwtToken, refreshToken } = data;
                        token = jwtToken;
                        setCookie("jwtToken", jwtToken, 1);
                        setCookie("refreshToken", refreshToken, 1);
                    })
                    .catch((error) =>
                        console.log("authenticate error ->", error)
                    );
            }
            else if (token && isCookieExpired('jwtToken')) {
                const refreshToken = getCookie("refreshToken");
                await fetch(
                    `${
                        import.meta.env.VITE_REACT_MAIN_API
                    }/authenticate/refresh`,

                    {
                        method: "POST",
                        body: JSON.stringify({ refreshToken }),
                        headers: { "Content-Type": "application/json" },
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        setCookie("jwtToken", data?.jwtToken, 1);
                        token = data?.jwtToken;
                    });
            }
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: [
        "AddProfileImage",
        "UpdateUser",
        "AddCoverImage",
        "DeleteCoverImage",
        "DeleteProfileImage",
        "AddBook",
    ],
    endpoints: () => ({}),
});
