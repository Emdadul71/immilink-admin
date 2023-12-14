import { apiSlice } from "../../api_slice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllCategories: build.query({
      query: ({ page, limit, title = "" }) =>
        `/categories?title=${title}&page=${page}&limit=${limit}`,
      providesTags: ["Category"],
    }),
    createCategory: build.mutation({
      query: (data) => ({
        url: "/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: build.mutation({
      query: ({ id }) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    getSingleCategory: build.query({
      query: ({ id }) => `/categories/${id}`,
    }),
    updateCategory: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useLazyGetSingleCategoryQuery,
} = categoryApi;
