import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/stats/" }), // Assuming backend runs on port 3000
  endpoints: (builder) => ({
    postSearchQuery: builder.mutation<void, { query: string }>({
      query: (body) => ({
        url: "search",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePostSearchQueryMutation } = statsApi;
