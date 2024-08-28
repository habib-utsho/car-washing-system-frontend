import { TQueryParam } from "../../types/index.type";
import { baseApi } from "../baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (payload) => {
        return {
          url: "/bookings",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["booking"],
    }),
    getAllBooking: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();
        filters.forEach((item: TQueryParam) => {
          params.append(item.name, item.value as string);
        });

        return {
          url: "/bookings",
          method: "GET",
          params: params,
        };
      },
    }),
    getMyBooking: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();
        filters.forEach((item: TQueryParam) => {
          params.append(item.name, item.value as string);
        });

        return {
          url: "/bookings/my-bookings",
          method: "GET",
          params: params,
        };
      },
    }),

    getSingleBooking: builder.query({
      query: (id) => {
        return {
          url: `/bookings/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingQuery,
  useGetMyBookingQuery,
  useGetSingleBookingQuery,
} = bookingApi;
