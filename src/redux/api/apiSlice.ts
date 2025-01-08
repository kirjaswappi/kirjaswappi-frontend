import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie, isCookieExpired, setCookie } from "../../utility/cookies";

let isAuthenticating = false;
let pendingAuthPromise: Promise<any> | null = null;



export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_REACT_MAIN_API,
        prepareHeaders: async (headers, { endpoint }) => {
            if (endpoint === "authenticate") return headers;

            let token = getCookie("jwtToken");
            console.log("get jwt token -> ", token)
            if (!token || isCookieExpired("jwtToken")) {
                if (!isAuthenticating) {
                    isAuthenticating = true;
                    pendingAuthPromise = (async () => {
                        try {
                            if (!token) {
                                const data = JSON.stringify({
                                    username: "user",
                                    password: "mak12345",
                                });
                                const resp = await fetch(
                                    `${
                                        import.meta.env.VITE_REACT_MAIN_API
                                    }/authenticate`,
                                    {
                                        method: "POST",
                                        body: data,
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    }
                                );
                                const { jwtToken, refreshToken } = await resp.json();
                                setCookie("jwtToken", jwtToken, 0.5); // 1 hour
                                setCookie("refreshToken", refreshToken, 2); // 2 hour
                                return jwtToken
                            } else{
                                console.log('insert in refresh token logic')
                                const refreshToken = getCookie("refreshToken");
                                const res = await fetch(
                                    `${import.meta.env.VITE_REACT_MAIN_API}/authenticate/refresh`,
                                    {
                                        method: "POST",
                                        body: JSON.stringify({ refreshToken }),
                                        headers: { "Content-Type": "application/json" },
                                    }
                                );
                                const data = await res.json();
                                setCookie("jwtToken", data.jwtToken, 1);
                                return data.jwtToken;
                            }
                        } catch (error) {
                            console.log("Authenticate error", error)
                            
                        } finally{
                            isAuthenticating = false
                            pendingAuthPromise = null
                        }
                    })();
                }
                token = await pendingAuthPromise;
            }
            // if (!token) {
            //     console.dir("insert in token")
            //     const data = JSON.stringify({
            //         username: "user",
            //         password: "mak12345",
            //     });
            //     await fetch(
            //         `${import.meta.env.VITE_REACT_MAIN_API}/authenticate`,
            //         {
            //             method: "POST",
            //             body: data,
            //             headers: { "Content-Type": "application/json" },
            //         }
            //     )
            //         .then((res) => res.json())
            //         .then((data) => {
            //             const { jwtToken, refreshToken } = data;
            //             token = jwtToken;
            //             setCookie("jwtToken", jwtToken, 60); // 1 hour
            //             setCookie("refreshToken", refreshToken, 120); // 2 hour
            //         })
            //         .catch((error) =>
            //             console.dir("authenticate error ->", error)
            //         );
            // }
            // else if (token && isCookieExpired('jwtToken')) {
            //     console.dir("insert in refresh token")
            //     const refreshToken = getCookie("refreshToken");
            //     await fetch(
            //         `${
            //             import.meta.env.VITE_REACT_MAIN_API
            //         }/authenticate/refresh`,

            //         {
            //             method: "POST",
            //             body: JSON.stringify({ refreshToken }),
            //             headers: { "Content-Type": "application/json" },
            //         }
            //     )
            //         .then((res) => res.json())
            //         .then((data) => {
            //             setCookie("jwtToken", data?.jwtToken, EXPIRE_TIME);
            //             token = data?.jwtToken;
            //         });
            // }
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
