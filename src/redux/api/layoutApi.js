import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_HOSTNAME } from "../../env";

export const layoutApi = createApi({
  reducerPath: "layoutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_HOSTNAME,
    prepareHeaders: (headers, api) => {
      headers.append("Access-Control-Allow-Origin", "*");
      //headers.append("Content-Type", "application/json; charset=utf-8");
    },
  }),
  tagTypes: ["Avatar"],
  endpoints: (build) => ({
    uploadProfilePicture: build.mutation({
      query: (args) => ({
        url: "api/upload-profile-picture",
        method: "POST",
        body: args.requestBody,
        headers: { "Content-Type": "", ...args.headers },
        formData: true,
      }),
      invalidatesTags: ["Avatar"],
    }),
    updateTodo: build.mutation({
      query: (updatedTodo) => ({
        url: `/todos/${updatedTodo.id}`,
        method: "POST",
        body: updatedTodo,
      }),
    }),
  }),
});

export const { useUploadProfilePictureMutation } = layoutApi;
