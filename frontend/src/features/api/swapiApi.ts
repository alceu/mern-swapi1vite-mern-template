import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const swapiApi = createApi({
  reducerPath: 'swapiApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.swapi.tech/api/' }),
  endpoints: (builder) => ({
    getPeople: builder.query<any, string | void>({
      query: (searchQuery) => (searchQuery ? `people/?name=${searchQuery}` : 'people/'),
    }),
    getPersonById: builder.query<any, string>({
      query: (id) => `people/${id}`,
    }),
    getFilms: builder.query<any, string | void>({
      query: (searchQuery) => (searchQuery ? `films/?title=${searchQuery}` : 'films/'),
    }),
    getFilmById: builder.query<any, string>({
      query: (id) => `films/${id}`,
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonByIdQuery, useGetFilmsQuery, useGetFilmByIdQuery } = swapiApi;
