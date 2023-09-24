import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '~/config';

import {
  GetPromotionsRequest, GetPromotionsResponse, SupportRequest, SupportResponse,
} from './type';

export const PROMOTIONS_API_REDUCER_KEY = 'promotionsApi';

const promotionsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
  }),
  reducerPath: PROMOTIONS_API_REDUCER_KEY,
  endpoints: (builder) => ({
    getPromotions: builder.query<GetPromotionsResponse, GetPromotionsRequest>({
      query: ({ jerryId }) => ({
        url: `/promotion/filter?jerry_id=${jerryId}`,
      }),
    }),
    getSupportAnswer: builder.query<SupportResponse, SupportRequest>({
      query: ({ jerryId }) => ({
        url: `/event/suggest?jerry_id=${jerryId}`,
      }),
    }),
  }),
});

export default promotionsApi;
