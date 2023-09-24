// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as moment from 'moment';
// Define a service using a base URL and expected endpoints
export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://78gxn3hk-8080.euw.devtunnels.ms/api' }),
  endpoints: (builder) => ({
    getEvents: builder.query<IEventsSolo, string>({
      query: (
        jerryId: string,
      ) => `/event/filter?jerry_id=${jerryId}&categories=sxodim`,
    }),
    getSelfEvent: builder.query<IEventsSolo, string>({
      query: (
        jerryId: string,
      ) => `/event/filter?jerry_id=${jerryId}&categories=self-made      `,
    }),
    postSelfEvent: builder.mutation<any, any>({
      query: (body) => ({
        url: '/event/create',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetEventsQuery, usePostSelfEventMutation, useGetSelfEventQuery } = eventApi;

export interface IEventsSolo{
    events: IEvents[];
}
export interface IEvents {
    id: string;
    title: string;
    description: string;
    banner_url: string;
    category: string;
    author: string;
    datetime: moment.Moment;
    address: string;
    location: string;
    latitude: number;
    longitude: number;
    city: string;
    distance: string;
}
