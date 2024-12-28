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
            invalidatesTags: ["AddBook",],
        }),
        getSupportLanguage: builder.query({
            query: () => {
                return {
                    url: "/books/supported-languages",
                    method: "GET",
                };
            },
        }),
        getSupportCondition: builder.query({
            query: () => {
                return {
                    url: "/books/supported-conditions",
                    method: "GET",
                };
            },
        }),
    }),
});

export const { useAddBookMutation, useGetSupportLanguageQuery, useGetSupportConditionQuery } = bookApi;
