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
      string[],
      { limit?: number; type?: "films" | "people" }
    >({
      query: ({ limit, type }) => {
        const params = new URLSearchParams();
        if (limit) params.append("limit", limit.toString());
        if (type) params.append("type", type);
        return `?${params.toString()}`;
      },
      providesTags: ["TopSearches"],
      keepUnusedDataFor: 60 * 60 * 24, // Keep data for 24 hours
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        const eventSource = new EventSource(
          `${import.meta.env.VITE_SEARCHES_STATS_API_URL}/top-searches/events`
        );

        try {
          await cacheDataLoaded;

          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.updatedIds && Array.isArray(data.updatedIds)) {
              // Invalidate cache for each updated ID
              data.updatedIds.forEach((id: string) => {
                dispatch(
                  topSearchesApi.util.invalidateTags([
                    { type: "TopSearches", id: id },
                  ])
                );
              });
              // Invalidate the composed query as its underlying data has changed
              dispatch(
                topSearchesApi.util.invalidateTags([
                  { type: "TopSearches", id: "LIST" }, // Invalidate the list of composed top searches
                ])
              );
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
    getTopSearchById: builder.query<TopSearchItem, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "TopSearches", id }],
      keepUnusedDataFor: 60 * 60 * 24, // Keep data for 24 hours
    }),
    getComposedTopSearches: builder.query<
      TopSearchItem[],
      { limit?: number; type?: "films" | "people" }
    >({
      async queryFn(arg, _queryApi, _extraOptions, baseQuery) {
        // First, get the list of top search IDs, leveraging caching
        const topSearchIdsResult = await _queryApi.dispatch(
          topSearchesApi.endpoints.getTopSearches.initiate(arg)
        );

        if (topSearchIdsResult.error) {
          return { error: topSearchIdsResult.error };
        }

        const topSearchIds = topSearchIdsResult.data as string[];

        if (!topSearchIds || topSearchIds.length === 0) {
          return { data: [] };
        }

        // Then, fetch each individual top search item by ID concurrently, leveraging caching
        const individualResults = await Promise.all(
          topSearchIds.map(async (id) => {
            const { data, error } = await _queryApi.dispatch(
              topSearchesApi.endpoints.getTopSearchById.initiate(id)
            );
            if (error) {
              throw error; // Propagate error
            }
            return data;
          })
        );

        // Filter out any null or undefined results from individual fetches
        const composedData = individualResults.filter(
          (item): item is TopSearchItem => item !== null && item !== undefined
        );
        
        return { data: composedData };
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ searchQuery }) => ({
                type: "TopSearches" as const,
                id: searchQuery._id,
              })),
              { type: "TopSearches", id: "LIST" },
            ]
          : [{ type: "TopSearches", id: "LIST" }],
      keepUnusedDataFor: 60 * 60 * 24, // Keep data for 24 hours
    }),
  }),
});

export const {
  useGetTopSearchesQuery,
  useGetTopSearchByIdQuery,
  useGetComposedTopSearchesQuery,
} = topSearchesApi;
