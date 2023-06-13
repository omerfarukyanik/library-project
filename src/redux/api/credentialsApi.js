import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_HOSTNAME } from "../../env";

export const credentialsApi = createApi({
  reducerPath: "credentialsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_HOSTNAME,
    credentials: "include",
    prepareHeaders: (headers, api) => {
      headers.append("Access-Control-Allow-Origin", "*");
      //headers.append("Content-Type", "application/json; charset=utf-8");
    },
  }),
  tagTypes: ["AdminLogin", "UserLogin"],
  endpoints: (build) => ({
    getSession: build.query({
      query: () => ({
        url: "/api/get-session",
        method: "GET",
      }),
      transformResponse(baseQueryReturnValue, meta, arg) {
        return {
          token: String(meta.response.headers.get("X-CSRFToken")),
        };
      },
    }),
    login: build.mutation({
      query: ({ formData, headers = {} }) => ({
        url: "/api/login",
        method: "POST",
        body: formData,
        headers: { ...headers },
        formData: true,
      }),
    }),
    signUp: build.mutation({
      query: ({ formData, headers = {} }) => ({
        url: "/api/signup",
        method: "POST",
        body: formData,
        headers: { ...headers },
        formDate: true,
      }),
    }),
  }),
});

export const { useGetSessionQuery, useLoginMutation, useSignUpMutation } =
  credentialsApi;
