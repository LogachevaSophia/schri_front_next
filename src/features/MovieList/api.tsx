import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {MovieCardType} from "../../widget/movies/MovieCard/MovieCard"

type QueryResultType = {
  search_result: MovieCardType[],
  total_pages: number
}

export type QuerySearchParams = {
  title?:string,
  release_year?: string,
  genre?:string,
  page?: number
}


type MovieParams = {
  id: string
}


export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/v1/' }),
  endpoints: (builder) => ({
    getSearchResults: builder.query<QueryResultType, QuerySearchParams>({
      query: (params) => {
        const query = new URLSearchParams(params as any).toString();
     
        if (query)
          return `search?${query}`
        return 'search'
      },
    }),
    getMovieById: builder.query<MovieCardType, MovieParams>({
      query: ({id}) => `movie/${id}`,
    }),
  }),
});

export const { useGetSearchResultsQuery, useGetMovieByIdQuery } = searchApi;