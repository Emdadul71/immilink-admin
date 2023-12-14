import { apiSlice } from "../api_slice";

export const excelExport = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    leadExport: build.query({
      query: ({ skip, limit, startDate, endDate, leadType }) =>
        `/participant/export?skip=${skip}&limit=${limit}&startDate=${startDate}&endDate=${endDate}&leadType=${leadType}`,
      providesTags: ["Team"],
    }),
    contactExport: build.query({
      query: ({ skip, limit, startDate, endDate }) =>
        `/contacts/excel-data?skip=${skip}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`,
      providesTags: ["Team"],
    }),
  }),
});

export const { useLazyLeadExportQuery, useLazyContactExportQuery } =
  excelExport;
