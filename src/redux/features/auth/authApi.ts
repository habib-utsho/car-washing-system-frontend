import { TQueryParam } from "../../../types/index.type";
import { baseApi } from "../../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
    }),

    getAllUser: builder.query({
      query: (filter: TQueryParam[]) => {
        const params = new URLSearchParams();
        filter.forEach((item: TQueryParam) => {
          params.append(item.name, item.value as string);
        });
        return {
          url: "/auth/users",
          method: "GET",
          params: params,
        };
      },
    }),
    deleteUser: builder.mutation({
      query: (id: string) => {
        return {
          url: `/auth/users/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useGetAllUserQuery,
  useDeleteUserMutation,
} = authApi;
