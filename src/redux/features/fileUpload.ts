/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.imgbb.com/1" }),
  tagTypes: ["category", "product"],
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (file: FormData) => ({
        url: `/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        method: "POST",
        body: file,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = uploadApi;
