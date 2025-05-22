import { api } from '../../api/apiSlice';

export const genreApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGenre: builder.query({
      query: () => {
        return {
          url: '/genres',
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetGenreQuery } = genreApi;
