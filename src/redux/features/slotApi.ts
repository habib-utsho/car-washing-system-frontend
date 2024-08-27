import { TQueryParam } from "../../types/index.type";
import { baseApi } from "../baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  useGetAllSlotQuery,
  useGetAvailableSlotQuery,
  useToggleStatusMutation,
} = slotApi;
