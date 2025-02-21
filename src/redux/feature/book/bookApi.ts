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
      invalidatesTags: ["AddBook"],
    }),
    getBookById: builder.query({
      query: ({ id }) => {
        return {
          url: `/books/${id}`,
          method: "GET",
        };
      },
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
    getAllBooks: builder.query({
      query: () => {
        return {
          url: "/books",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useAddBookMutation,
  useGetBookByIdQuery,
  useGetSupportLanguageQuery,
  useGetSupportConditionQuery,
  useGetAllBooksQuery,
} = bookApi;
