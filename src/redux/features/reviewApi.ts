import { baseApi } from "../baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (payload) => {
        return {
          url: "/review",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["review"],
    }),
    getAllReviews: builder.query({
      query: () => {
        return {
          url: "/review",
          method: "GET",
        };
      },
      providesTags: ["review"],
    }),
    getAverageRating: builder.query({
      query: () => {
        return {
          url: "/review/average-rating",
          method: "GET",
        };
      },
      providesTags: ["review"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetAllReviewsQuery,
  useGetAverageRatingQuery,
} = reviewApi;
