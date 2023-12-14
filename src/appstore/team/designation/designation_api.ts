import { apiSlice } from "../../api_slice";

export const teamDesignationApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllTeamDesignation: build.query({
      query: ({ page, limit, name = "" }) =>
        `/team-designation?name=${name}&page=${page}&limit=${limit}`,
      providesTags: ["teamDesignation"],
    }),
    createTeamDesignation: build.mutation({
      query: (data) => ({
        url: "/team-designation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["teamDesignation"],
    }),
    deleteTeamDesignation: build.mutation({
      query: ({ id }) => ({
        url: `/team-designation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["teamDesignation"],
    }),
    getSingleTeamDesignation: build.query({
      query: ({ id }) => `/team-designation/${id}`,
    }),
    updateTeamDesignation: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/team-designation/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["teamDesignation"],
    }),
  }),
});

export const {
  useGetAllTeamDesignationQuery,
  useCreateTeamDesignationMutation,
  useLazyGetSingleTeamDesignationQuery,
  useUpdateTeamDesignationMutation,
  useDeleteTeamDesignationMutation,
} = teamDesignationApi;
