import { apiSlice } from "../api_slice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (body) => {
        return {
          url: "/auth/signin",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result?.data?.accessToken,
            })
          );
        } catch (error) {}
      },
    }),
    getProfile: build.query({
      query: () => `/auth/profile`,
    }),
    logOut: build.query({
      query: () => `/auth/logout`,
    }),
  }),
});

export const { useSignInMutation, useGetProfileQuery, useLogOutQuery } =
  authApi;
