import { apiSlice } from "../../api_slice";

export const designationApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllDesignation: build.query({
      query: ({ page, limit, title = "" }) =>
        `/designations?title=${title}&page=${page}&limit=${limit}`,
      providesTags: ["Designation"],
    }),
    createDesignation: build.mutation({
      query: (data) => ({
        url: "/designations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Designation"],
    }),
    deleteDesignation: build.mutation({
      query: ({ id }) => ({
        url: `/designations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Designation"],
    }),
    getSingleDesignation: build.query({
      query: ({ id }) => `/designations/${id}`,
    }),
    updateDesignation: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/designations/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Designation"],
    }),
  }),
});

export const {
  useGetAllDesignationQuery,
  useCreateDesignationMutation,
  useDeleteDesignationMutation,
  useLazyGetSingleDesignationQuery,
  useUpdateDesignationMutation,
} = designationApi;
