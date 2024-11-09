import { TQueryParam } from "../../types/index.type";
import { baseApi } from "../baseApi";

const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (payload) => {
        return {
          url: "/services",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["services"],
    }),
    getAllServices: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();
        filters?.forEach((item: TQueryParam) => {
          params.append(item.name, item.value as string);
        });

        return {
          url: "/services",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["services"],
    }),

    getSingleService: builder.query({
      query: (id) => {
        return {
          url: `/services/${id}`,
          method: "GET",
        };
      },
    }),
    updateService: builder.mutation({
      query: ({ id, body }) => {
        console.log(id, body, "id, body");

        return {
          url: `/services/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["services"],
    }),
    deleteService: builder.mutation({
      query: (id) => {
        return {
          url: `/services/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["services"],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetAllServicesQuery,
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
