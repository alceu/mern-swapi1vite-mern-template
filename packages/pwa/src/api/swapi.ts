import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPersonDto, IFilmDto } from "@swapi-mern/domain";

if (!import.meta.env.VITE_SWAPI_API_URL) {
  throw new Error("Missing required environment variable: VITE_SWAPI_API_URL");
}

export const swapi = createApi({
  reducerPath: "swapiApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SWAPI_API_URL }),
  endpoints: (builder) => ({
    getPeople: builder.query<{ result: IPersonDto[] }, string | void>({
      query: (searchQuery) =>
        searchQuery ? `people/?name=${searchQuery}` : "people/",
    }),
    getPersonById: builder.query<{ result: IPersonDto }, string>({
      queryFn: async (id, _queryApi, _extraOptions, baseQuery) => {
        const response = await baseQuery(`people/${id}`);
        if (response.error) {
          return { error: response.error };
        }
        if (!response.data) {
          return { error: { status: 404, data: "Not Found" } };
        }
        return { data: response.data.result as IPersonDto };
      },
    }),
    getFilms: builder.query<{ result: IFilmDto[] }, string | void>({
      query: (searchQuery) =>
        searchQuery ? `films/?title=${searchQuery}` : "films/",
    }),
    getFilmById: builder.query<{ result: IFilmDto }, string>({
      queryFn: async (id, _queryApi, _extraOptions, baseQuery) => {
        const response = await baseQuery(`films/${id}`);
        if (response.error) {
          return { error: response.error };
        }
        if (!response.data) {
          return { error: { status: 404, data: "Not Found" } };
        }
        return { data: response.data.result as IFilmDto };
      },
    }),
  }),
});

export const {
  useGetPeopleQuery,
  useGetPersonByIdQuery,
  useGetFilmsQuery,
  useGetFilmByIdQuery,
} = swapi;
