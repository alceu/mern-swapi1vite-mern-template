import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchesStatsApi = createApi({
  reducerPath: "searchesStatsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/searches/" }), // Assuming backend runs on port 3000
  endpoints: (builder) => ({
    postSearchQuery: builder.mutation<void, { query: string }>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePostSearchQueryMutation } = searchesStatsApi;
