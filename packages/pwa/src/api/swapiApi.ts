import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPersonDto, IFilmDto } from "@swapi-mern/domain";

if (!import.meta.env.VITE_SWAPI_API_URL) {
  throw new Error("Missing required environment variable: VITE_SWAPI_API_URL");
}

export const swapiApi = createApi({
  reducerPath: "swapiApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SWAPI_API_URL }),
  endpoints: (builder) => ({
    getPeople: builder.query<{ result: IPersonDto[] }, string | void>({
      query: (searchQuery) =>
        searchQuery ? `people/?name=${searchQuery}` : "people/",
    }),
    getPersonById: builder.query<IPersonDto, string>({
      queryFn: async (id, _queryApi, _extraOptions, baseQuery) => {
        const result = await baseQuery(`people/${id}`);
        if (result.error) {
          return { error: result.error };
        }
        if (!result.data) {
          return { error: { status: 404, data: 'Not Found' } };
        }
        return { data: result.data as IPersonDto };
      },
    }),
    getFilms: builder.query<{ result: IFilmDto[] }, string | void>({
      query: (searchQuery) =>
        searchQuery ? `films/?title=${searchQuery}` : "films/",
    }),
    getFilmById: builder.query<IFilmDto, string>({
      queryFn: async (id, _queryApi, _extraOptions, baseQuery) => {
        const result = await baseQuery(`films/${id}`);
        if (result.error) {
          return { error: result.error };
        }
        if (!result.data) {
          return { error: { status: 404, data: 'Not Found' } };
        }
        return { data: result.data as IFilmDto };
      },
    }),
  }),
});

export const {
  useGetPeopleQuery,
  useGetPersonByIdQuery,
  useGetFilmsQuery,
  useGetFilmByIdQuery,
} = swapiApi;