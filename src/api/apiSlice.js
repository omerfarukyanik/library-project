import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  endpoints: (build) => ({
    getAuthor: build.query({
      query: () => "/todos",
    }),
    userById: build.query({
      query: (userId) => `/users/${userId}`,
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

export const { useGetAuthorQuery, useUserByIdQuery, useUpdateTodoMutation } =
  api;
