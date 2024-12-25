
import { api } from "../../api/apiSlice";

export const bookApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addBook: builder.mutation<any, any>({
            query: (data) => {
                return {
                    url: "/books",
                    method: "POST",
                    body: data,
                };
            },
        }),
    }),
});



export const { useAddBookMutation } = bookApi;
