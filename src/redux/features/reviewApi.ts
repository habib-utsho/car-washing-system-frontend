import { TQueryParam } from "../../types/index.type";
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
      query: (args) => {
        const params = new URLSearchParams();

        args.forEach((item: TQueryParam) => {
          params.append(item.name, item.value);
        });
        return {
          url: "/review",
          method: "GET",
          params,
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
