import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utility/localStorage/localStorage";

const mainBaseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
        baseUrl: import.meta.env.VITE_REACT_MAIN_API,
        prepareHeaders: (headers) => {
            const url = (typeof args === "string" ? args : args.url) || "";
            if (!url.includes("/authenticate")) {
                const jwtToken = getToken("jwtToken");
                if (jwtToken) {
                    headers.set("Authorization", `Bearer ${jwtToken}`);
                }
            }
            return headers;
        },
    });
    // If args is a string, treat it as a URL
    const { url, method, body } =
        typeof args === "string"
            ? { url: args, method: "GET", body: undefined }
            : args;

    // Make the API request
    let result = await baseQuery({ url, method, body }, api, extraOptions);
    
    return result;
};
export const api = createApi({
    reducerPath: "api",
    baseQuery: mainBaseQuery,
    tagTypes: [],
    endpoints: () => ({}),
});
