import { TPasswordUpdate, TQueryParam, TUser } from "../../../types/index.type";
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
      providesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id: string) => {
        return {
          url: `/auth/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["user"],
    }),
    toggleUserRole: builder.mutation({
      query: (id: string) => {
        return {
          url: `/auth/users/toggle-role/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["user"],
    }),
    editProfile: builder.mutation({
      query: ({ id, payload }: { id: string; payload: Partial<TUser> }) => {
        return {
          url: `/auth/users/edit-profile/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["user"],
    }),
    editPassword: builder.mutation({
      query: ({
        id,
        payload,
      }: {
        id: string;
        payload: Partial<TPasswordUpdate>;
      }) => {
        return {
          url: `/auth/users/edit-password/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useToggleUserRoleMutation,
  useEditProfileMutation,
  useEditPasswordMutation,
} = authApi;
