import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISearchQueryDto, SearchType } from "@swapi-mern/domain";

if (!import.meta.env.VITE_SEARCHES_STATS_API_URL) {
  throw new Error(
    "Missing required environment variable: VITE_SEARCHES_STATS_API_URL"
  );
}

export const searchQueries = createApi({
  reducerPath: "searchQueriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SEARCHES_STATS_API_URL}/search-queries/`,
  }),
  tagTypes: ["SearchQuery"],
  endpoints: (builder) => ({
    getSearchQueryById: builder.query<ISearchQueryDto, string>({
      query: (id) => `/${id}`,
      providesTags: (result, _error, id) => [{ type: "SearchQuery", id }],
    }),
    postSearchQuery: builder.mutation<
      void,
      { query: string; type: SearchType }
    >({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),
  }),
});
export const { usePostSearchQueryMutation, useGetSearchQueryByIdQuery } =
  searchQueries;
