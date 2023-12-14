import { apiSlice } from "../api_slice";

export const testimonialApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllTestimonial: build.query({
      query: ({ page, limit, name = "" }) =>
        `/testimonials?page=${page}&limit=${limit}&name=${name}`,
      providesTags: ["Testimonial"],
    }),
    createTestimonial: build.mutation({
      query: (data) => ({
        url: "/testimonials",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Testimonial"],
    }),
    deleteTestimonial: build.mutation({
      query: ({ id }) => ({
        url: `/testimonials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Testimonial"],
    }),
    getSingleTestimonial: build.query({
      query: ({ id }) => `/testimonials/${id}`,
    }),
    updateTestimonial: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/testimonials/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Testimonial"],
    }),
  }),
});

export const {
  useGetAllTestimonialQuery,
  useCreateTestimonialMutation,
  useDeleteTestimonialMutation,
  useGetSingleTestimonialQuery,
  useUpdateTestimonialMutation,
} = testimonialApi;
