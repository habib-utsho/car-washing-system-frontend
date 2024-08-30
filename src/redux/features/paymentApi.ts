import { baseApi } from "../baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initPayment: builder.mutation({
      query: (payload) => {
        return {
          url: "/payment/init",
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const { useInitPaymentMutation } = paymentApi;
