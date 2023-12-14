import { apiSlice } from "../../../api_slice";

export const permissionApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getPermissions: build.query({
      query: () => `/permissions`,
      providesTags: ["Permission"],
    }),
    createPermission: build.mutation({
      query: (data) => ({
        url: "/permissions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Permission"],
    }),
    deletePermission: build.mutation({
      query: ({ id }) => ({
        url: `/permissions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Permission"],
    }),
    singlePermission: build.query({
      query: ({ id }) => `/permissions/${id}`,
    }),
    updatePermission: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/permissions/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Permission"],
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useCreatePermissionMutation,
  useDeletePermissionMutation,
  useSinglePermissionQuery,
  useUpdatePermissionMutation,
} = permissionApi;
