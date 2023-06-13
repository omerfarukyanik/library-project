import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_HOSTNAME } from "../../env";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_HOSTNAME,
    credentials: "include",
    prepareHeaders: (headers, api) => {
      headers.append("Access-Control-Allow-Origin", "*");
      //headers.append("Content-Type", "application/json; charset=utf-8");
    },
  }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    getUsers: build.query({
      query: (arg) => ({
        url: "/api/get-users",
        method: "GET",
      }),
      providesTags: ["Users"],
      transformResponse(baseQueryReturnValue, meta, arg) {
        baseQueryReturnValue.data.forEach((currentValue, index, arr) => {
          currentValue.key = "" + index;
        });

        console.log(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
    }),
    deleteUser: build.mutation({
      query: (arg) => ({
        url: "/api/delete-user",
        method: "DELETE",
        body: arg.formData,
        headers: { ...arg.headers },
        formData: true,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation } = adminApi;
