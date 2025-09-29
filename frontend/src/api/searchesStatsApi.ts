import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface TopSearchItem {
  searchQuery: {
    _id: string;
    query: string;
    type: "films" | "people";
  };
  percentage: number;
  timestamp: string;
}

if (!import.meta.env.VITE_SEARCHES_STATS_API_URL) {
  throw new Error(
    "Missing required environment variable: VITE_SEARCHES_STATS_API_URL"
  );
}

export const searchesStatsApi = createApi({
  reducerPath: "searchesStatsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SEARCHES_STATS_API_URL}/searches/`,
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
    getTopSearches: builder.query<
      TopSearchItem[],
      { limit?: number; type?: "films" | "people" }
    >({
      query: ({ limit, type }) => {
        const params = new URLSearchParams();
        if (limit) params.append("limit", limit.toString());
        if (type) params.append("type", type);
        return `top?${params.toString()}`;
      },
    }),
  }),
});

export const { usePostSearchQueryMutation, useGetTopSearchesQuery } =
  searchesStatsApi;
