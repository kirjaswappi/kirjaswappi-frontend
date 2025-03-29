import { IFilterData } from "../../../interface";
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
      query: (filter: IFilterData) => {
        const queryParameter: {
          genre?: string[];
          condition?: string[];
          language?: string[];
          search?: string;
        } = {};
        if (filter.search && filter.search.length > 0) {
          queryParameter["search"] = filter.search;
        }
        if (filter.genre && filter.genre.length > 0) {
          queryParameter["genre"] = filter.genre;
        }
        if (filter.condition && filter.condition.length > 0) {
          queryParameter["condition"] = filter.condition;
        }
        if (filter.language && filter.language.length > 0) {
          queryParameter["language"] = filter.language;
        }
        const queryParams = new URLSearchParams(
          queryParameter as Record<string, string>
        ).toString();
        let url = `/books${queryParams && `?${queryParams}`}`;
        return {
          url: url,
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
