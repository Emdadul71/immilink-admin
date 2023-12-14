import { apiSlice } from "../../../api_slice";

export const moduleApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getModules: build.query({
      query: ({ page, limit }) => `/modules`,
      providesTags: ["Module"],
    }),
    createModule: build.mutation({
      query: (data) => ({
        url: `/modules`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Module"],
    }),
    deleteModule: build.mutation({
      query: ({ id }) => ({
        url: `/modules/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Module"],
    }),
    singleModule: build.query({
      query: ({ id }) => `/modules/${id}`,
    }),
    updateModule: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/modules/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Module"],
    }),
  }),
});

export const {
  useGetModulesQuery,
  useCreateModuleMutation,
  useDeleteModuleMutation,
  useSingleModuleQuery,
  useUpdateModuleMutation,
} = moduleApi;
