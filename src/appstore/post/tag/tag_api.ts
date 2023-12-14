import { apiSlice } from "../../api_slice";

export const tagApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTegs: build.query({
      query: ({ page, limit, title = "" }) =>
        `/tags?page=${page}&limit=${limit}&title=${title}`,
      providesTags: ["Tag"],
    }),
    createTag: build.mutation({
      query: (data) => ({
        url: "/tags",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tag"],
    }),
    getSingleTag: build.query({
      query: ({ id }) => `/tags/${id}`,
    }),

    updateTag: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/tags/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Tag"],
    }),

    deleteTag: build.mutation({
      query: ({ id }) => {
        return {
          url: `/tags/${id}/force`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Tag"],
    }),
  }),
});

export const {
  useGetTegsQuery,
  useCreateTagMutation,
  useDeleteTagMutation,
  useGetSingleTagQuery,
  useLazyGetSingleTagQuery,
  useUpdateTagMutation,
} = tagApi;
