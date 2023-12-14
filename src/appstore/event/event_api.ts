import moment from "moment";
import { apiSlice } from "../api_slice";

export const eventApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getEvents: build.query({
      query: ({
        title,
        startDate,
        endDate,
        status = "ACTIVE",
        page,
        limit,
      }) => {
        let url;
        if (startDate != null && endDate != null && title !== null) {
          `/events?status=${status}&title=${title}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`;
        } else if (startDate != null && endDate != null) {
          url = `/events?status=${status}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`;
        } else if (title !== null) {
          url = `/events?title=${title}&status=${status}&page=${page}&limit=${limit}`;
        } else {
          url = `/events?status=${status}&page=${page}&limit=${limit}`;
        }
        return {
          url: `${url}`,
        };
      },
      providesTags: ["Event"],
    }),
    createEvent: build.mutation({
      query: (data) => ({
        url: "/events",
        method: "POST",
        body: data,
      }),
    }),

    getSingleEvent: build.query({
      query: ({ id }) => `/events/${id}`,
      transformResponse: (response: any) => {
        const KeywordPrepare =
          response?.keywords !== "" ? response?.keywords?.split(",") : [];
        const data = {
          id: response?.id,
          title: response?.title,
          slug: response?.slug,
          content: response?.content,
          featureImage: response?.featureImage,
          country: response.country ?? undefined,
          status: response?.status,
          isFeatured: response?.isFeatured,
          eventDate: moment(response?.eventDate).format("YYYY-MM-DD"),
          eventTime: moment(response?.eventDate).format("HH:mm:ss"),
          eventEndTime: moment(response?.eventEndDate).format("HH:mm:ss"),
          address: response?.address,
          googleMap: response?.googleMap,
          keywords: KeywordPrepare,
          metaTitle: response?.metaTitle,
          metaDescription: response?.metaDescription,
        };
        return data;
      },
    }),
    updateEvent: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/events/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Event"],
    }),
    deleteEvent: build.mutation({
      query: ({ id }) => {
        return {
          url: `/events/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Event"],
    }),

    getParticipantedUser: build.query({
      query: ({ slug, page, limit, leadType }) => {
        let url;

        if (slug !== undefined) {
          url = `/participant?eventSlug=${slug}&leadType=${leadType}&page=${page}&limit=${limit}`;
        } else {
          url = `/participant?leadType=${leadType}&page=${page}&limit=${limit}`;
        }
        return {
          url: url,
        };
      },
    }),

    getAppoinmentList: build.query({
      query: ({ page, limit }) => `/appointment?page=${page}&limit=${limit}`,
    }),
  }),
});

export const {
  useGetEventsQuery,
  useCreateEventMutation,
  useGetSingleEventQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetParticipantedUserQuery,
  useLazyGetParticipantedUserQuery,
  useGetAppoinmentListQuery,
} = eventApi;
