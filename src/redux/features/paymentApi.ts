import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://​sandbox​.aamarpay.com" }),

  endpoints: (builder) => ({
    initPayment: builder.mutation({
      query: (payload) => {
        return {
          url: "/jsonpost.php",
          method: "POST",
          // headers: {
          //   "Access-Control-Allow-Headers": "Content-Type",
          //   "Access-Control-Allow-Origin": "*",
          //   "Content-Type": "application/json",
          //   "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
          // },
          body: payload,
        };
      },
    }),
  }),
});

export const { useInitPaymentMutation } = paymentApi;
