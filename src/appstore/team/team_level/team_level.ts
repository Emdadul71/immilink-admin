import { apiSlice } from "@/appstore/api_slice";

export const teamApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTeamLevel: build.query({
      query: ({ name, page, limit }) =>
        `/team-level?name=${name}&page=${page}&limit=${limit}`,
      providesTags: ["teamLevel"],
    }),
    createTeamLevel: build.mutation({
      query: (data) => ({
        url: "/team-level",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["teamLevel"],
    }),

    getSingleTeamLevel: build.query({
      query: ({ id }) => `/team-level/${id}`,
    }),
    updateTeamLevel: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/team-level/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["teamLevel"],
    }),
    deleteTeamLevel: build.mutation({
      query: ({ id }) => {
        return {
          url: `/team-level/${id}/force`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["teamLevel"],
    }),
  }),
});

export const {
  useGetTeamLevelQuery,
  useCreateTeamLevelMutation,
  useLazyGetSingleTeamLevelQuery,
  useUpdateTeamLevelMutation,
  useDeleteTeamLevelMutation,
} = teamApi;
