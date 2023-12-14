import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
  createApi,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: async (headers, { getState }) => {
    const localStorageToken = JSON.parse(localStorage.getItem("auth")!);
    const token = localStorageToken?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    localStorage.removeItem("auth");
    window.location.href = `/login`;
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 0,
  tagTypes: [
    "Category",
    "Tag",
    "Post",
    "Designation",
    "User",
    "Profile",
    "Module",
    "Permission",
    "Role",
    "Event",
    "Media",
    "Team",
    "teamDesignation",
    "mediaFolders",
    "Testimonial",
    "teamLevel",
  ],
  endpoints: () => ({}),
});
