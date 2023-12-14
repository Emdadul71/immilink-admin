import { apiSlice } from "../../../api_slice";

export const roleManagementApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getRoles: build.query({
      query: () => `/roles`,
      providesTags: ["Role"],
    }),
    createRole: build.mutation({
      query: (data) => ({
        url: "/roles",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Role"],
    }),
    getSingleRole: build.query({
      query: ({ id }) => `/roles/${id}`,
      transformResponse: (response: any) => {
        const data = {
          id: response?.id,
          name: response?.name,
          permissions: response?.permissions.map((item: any) =>
            item.id.toString()
          ),
        };
        return data;
      },
    }),
    updateRole: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/roles/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Role"],
    }),
    deleteRole: build.mutation({
      query: ({ id }) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useCreateRoleMutation,
  useGetSingleRoleQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleManagementApi;
