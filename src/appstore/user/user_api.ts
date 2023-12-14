import { apiSlice } from "../api_slice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: ({ name, page, limit }) =>
        `/users?name=${name}&page=${page}&limit=${limit}`,
      providesTags: ["User"],
    }),
    createUser: build.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getSingleUser: build.query({
      query: ({ id }) => `/users/${id}`,
    }),
    updateUser: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Designation"],
    }),
    deleteUser: build.mutation({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useLazyGetSingleUserQuery,
  useUpdateUserMutation,
} = userApi;
