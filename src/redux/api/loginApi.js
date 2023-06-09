import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_HOSTNAME } from "../../env";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_HOSTNAME,
    prepareHeaders: (headers, api) => {
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append("Content-Type", "application/json; charset=utf-8");
    },
  }),
  tagTypes: ["Login"],
  endpoints: (build) => ({
    getCSRF: build.query({
      query: () => ({
        url: "/api/get-csrf",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCSRFQuery } = loginApi;
