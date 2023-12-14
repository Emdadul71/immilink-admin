import moment from "moment";
import { apiSlice } from "../api_slice";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query({
      query: ({
        page,
        limit,
        title = "",
        category = "",
        startDate,
        endDate,
        blogFor,
        status = "ACTIVE",
      }) => {
        let url;

        if (startDate != null && endDate != null) {
          url = `/blogs?title=${title}&status=${status}&category=${category}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}&blogFor=${blogFor}`;
        } else {
          url = `/blogs?title=${title}&status=${status}&category=${category}&page=${page}&limit=${limit}&blogFor=${blogFor}`;
        }
        return {
          url: `${url}`,
        };
      },
      providesTags: ["Post"],
    }),

    createPost: build.mutation({
      query: (data) => ({
        url: "/blogs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    getSinglePost: build.query({
      query: ({ id }) => `/blogs/${id}`,
    }),
    deletePost: build.mutation({
      query: ({ id }) => {
        return {
          url: `/blogs/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Post"],
    }),
    updatePost: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/blogs/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetSinglePostQuery,
  useUpdatePostMutation,
} = postApi;
