import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPersonDto, IFilmDto } from "@swapi-mern/domain";

interface IPersonApiResponse {
  message: string;
  result: IPersonDto;
}

interface IPeopleApiResponse {
  message: string;
  result: IPersonDto[];
}

interface IFilmApiResponse {
  message: string;
  result: IFilmDto;
}

interface IFilmsApiResponse {
  message: string;
  result: IFilmDto[];
}

if (!import.meta.env.VITE_SWAPI_API_URL) {
  throw new Error("Missing required environment variable: VITE_SWAPI_API_URL");
}

export const swapi = createApi({
  reducerPath: "swapiApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SWAPI_API_URL }),
  endpoints: (builder) => ({
    getPeople: builder.query<IPersonDto[], string | void>({
      query: (searchQuery) =>
        searchQuery ? `people/?name=${searchQuery}` : "people/",
      transformResponse: (response: IPeopleApiResponse) =>
        response.result as IPersonDto[],
    }),
    getPersonById: builder.query<IPersonDto, string>({
      queryFn: async (id, _queryApi, _extraOptions, baseQuery) => {
        const response = await baseQuery(`people/${id}`);
        if (response.error) {
          return { error: response.error };
        }
        if (!response.data) {
          return { error: { status: 404, data: "Not Found" } };
        }
        const data = (response.data as IPersonApiResponse).result;

        return { data };
      },
    }),
    getFilms: builder.query<IFilmDto[], string | void>({
      query: (searchQuery) =>
        searchQuery ? `films/?title=${searchQuery}` : "films/",
      transformResponse: (response: IFilmsApiResponse) =>
        response.result as IFilmDto[],
    }),
    getFilmById: builder.query<IFilmDto, string>({
      queryFn: async (id, _queryApi, _extraOptions, baseQuery) => {
        const response = await baseQuery(`films/${id}`);
        if (response.error) {
          return { error: response.error };
        }
        if (!response.data) {
          return { error: { status: 404, data: "Not Found" } };
        }
        const data = (response.data as IFilmApiResponse).result;

        return { data };
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
