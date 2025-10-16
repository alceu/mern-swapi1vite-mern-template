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
      query: (id) => `people/${id}`,
    }),
    getFilms: builder.query<{ result: IFilmDto[] }, string | void>({
      query: (searchQuery) =>
        searchQuery ? `films/?title=${searchQuery}` : "films/",
    }),
    getFilmById: builder.query<IFilmDto, string>({
      query: (id) => `films/${id}`,
    }),
  }),
});

export const {
  useGetPeopleQuery,
  useGetPersonByIdQuery,
  useGetFilmsQuery,
  useGetFilmByIdQuery,
} = swapiApi;