import { apiSlice } from "../api_slice";

export const teamApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTeam: build.query({
      query: ({ name, page, limit }) =>
        `/team?name=${name}&page=${page}&limit=${limit}`,
      providesTags: ["Team"],
    }),
    createTeam: build.mutation({
      query: (data) => ({
        url: "/team",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Team"],
    }),

    getSingleTeam: build.query({
      query: ({ id }) => `/team/${id}`,
    }),
    updateTeam: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/team/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Team"],
    }),
    deleteTeam: build.mutation({
      query: ({ id }) => {
        return {
          url: `/team/${id}/force`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Team"],
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useGetSingleTeamQuery,
  useUpdateTeamMutation,
  useGetTeamQuery,
  useDeleteTeamMutation,
} = teamApi;
