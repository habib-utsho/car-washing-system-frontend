import { baseApi } from "../baseApi";

const uploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (payload) => {
        return {
          url: "/upload",
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const { useUploadFileMutation } = uploadApi;
