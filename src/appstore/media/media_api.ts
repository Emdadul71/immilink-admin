import { apiSlice } from "../api_slice";
import { mediaFolderParentInfo } from "./media_slice";

export const mediaApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getMedias: build.query({
      query: ({
        page,
        limit,
        title,
        type,
        libraryId,
        startDate = "",
        endDate = "",
      }) => {
        return `/medias?libraryId=${libraryId}&title=${title}&type=${type}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`;
      },
      providesTags: ["Media"],
    }),

    deleteMedia: build.mutation({
      query: ({ id }) => ({
        url: `/medias/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Media"],
    }),
    bulkDeleteMedia: build.mutation({
      query: ({ ids }) => ({
        url: `/medias/many/${ids}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Media"],
    }),
    getFolders: build.query({
      query: () => {
        return `/library`;
      },
      providesTags: ["mediaFolders"],

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result: any = await queryFulfilled;
          if (result && result?.data?.length > 0) {
            dispatch(
              mediaFolderParentInfo({
                title: result?.data[0].title,
                parentId: result?.data[0].key,
              })
            );
          }
        } catch (error) {}
      },
    }),
    addFolders: build.mutation({
      query: (data) => {
        return {
          url: "/library",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["mediaFolders"],
    }),
    deleteFolders: build.mutation({
      query: ({ id }) => {
        return {
          url: `/library/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["mediaFolders"],
    }),
    addFiles: build.mutation({
      query: (data) => {
        return {
          url: "/medias",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Media"],
    }),
  }),
});

export const {
  useGetMediasQuery,
  useGetFoldersQuery,
  useAddFoldersMutation,
  useAddFilesMutation,
  useDeleteMediaMutation,
  useBulkDeleteMediaMutation,
  useDeleteFoldersMutation,
} = mediaApi;
