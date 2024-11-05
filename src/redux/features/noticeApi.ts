import { TQueryParam } from "../../types/index.type";
import { baseApi } from "../baseApi";

const noticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNotice: builder.mutation({
      query: (payload) => {
        return {
          url: "/notice",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["notice"],
    }),
    getAllNotice: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();
        filters.forEach((item: TQueryParam) => {
          params.append(item.name, item.value as string);
        });

        return {
          url: "/notice",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["notice"],
    }),

    getSingleNotice: builder.query({
      query: (id) => {
        return {
          url: `/notice/${id}`,
          method: "GET",
        };
      },
    }),
    updateNotice: builder.mutation({
      query: (payload) => {
        return {
          url: `/notice/${payload?.id}`,
          method: "PATCH",
          body: payload.body,
        };
      },
      invalidatesTags: ["notice"],
    }),
    deleteNotice: builder.mutation({
      query: (id) => {
        return {
          url: `/notice/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["notice"],
    }),
  }),
});

export const {
  useCreateNoticeMutation,
  useGetAllNoticeQuery,
  useGetSingleNoticeQuery,
  useUpdateNoticeMutation,
  useDeleteNoticeMutation,
} = noticeApi;
