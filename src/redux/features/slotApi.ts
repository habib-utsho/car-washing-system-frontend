import { TQueryParam } from "../../types/index.type";
import { baseApi } from "../baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlot: builder.mutation({
      query: (payload) => {
        return {
          url: "/services/slots",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["slot"],
    }),
    getAllSlot: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();
        filters.forEach((item: TQueryParam) => {
          params.append(item.name, item.value as string);
        });

        return {
          url: "/slots",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["slot"],
    }),
    getAvailableSlot: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();
        filters.forEach((item: TQueryParam) => {
          params.append(item.name, item.value as string);
        });

        return {
          url: "/slots/availability",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["slot"],
    }),
    getSingleSlot: builder.query({
      query: (id) => {
        return {
          url: `/slots/${id}`,
          method: "GET",
        };
      },
      providesTags: ["slot"],
    }),

    toggleStatus: builder.mutation({
      query: (id: string) => ({
        url: `/slots/toggle-status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["slot"],
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useGetAllSlotQuery,
  useGetAvailableSlotQuery,
  useToggleStatusMutation,
  useGetSingleSlotQuery,
} = slotApi;
