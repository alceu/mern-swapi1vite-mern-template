import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

if (!import.meta.env.VITE_SEARCHES_STATS_API_URL) {
  throw new Error(
    "Missing required environment variable: VITE_SEARCHES_STATS_API_URL"
  );
}

export const searchQueryApi = createApi({
  reducerPath: "searchQueryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SEARCHES_STATS_API_URL}/search-queries/`,
  }),
  endpoints: (builder) => ({
    postSearchQuery: builder.mutation<
      void,
      { query: string; type: "films" | "people" }
    >({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePostSearchQueryMutation } = searchQueryApi;
