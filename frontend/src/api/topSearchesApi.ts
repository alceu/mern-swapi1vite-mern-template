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

export const topSearchesApi = createApi({
  reducerPath: "topSearchesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SEARCHES_STATS_API_URL}/top-searches/`,
  }),
  tagTypes: ["TopSearches"],
  endpoints: (builder) => ({
    getTopSearches: builder.query<
      TopSearchItem[],
      { limit?: number; type?: "films" | "people" }
    >({
      query: ({ limit, type }) => {
        const params = new URLSearchParams();
        if (limit) params.append("limit", limit.toString());
        if (type) params.append("type", type);
        return `?${params.toString()}`;
      },
      providesTags: ["TopSearches"],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        const eventSource = new EventSource(
          `${
            import.meta.env.VITE_SEARCHES_STATS_API_URL
          }/top-searches/events`
        );

        try {
          await cacheDataLoaded;

          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.updated) {
              dispatch(topSearchesApi.util.invalidateTags(["TopSearches"]));
            }
          };

          eventSource.onmessage = listener;
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }

        await cacheEntryRemoved;
        eventSource.close();
      },
    }),
  }),
});

export const { useGetTopSearchesQuery } = topSearchesApi;
