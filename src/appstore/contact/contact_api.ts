import { apiSlice } from "../api_slice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getContacts: build.query({
      query: ({ page, limit, email = "" }) => {
        return `/contacts?email=${email}&page=${page}&limit=${limit}`;
      },

    }),
  }),
});

export const { useGetContactsQuery, useLazyGetContactsQuery } = authApi;
