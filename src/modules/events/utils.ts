import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  eventDate: Yup.string().required("Event start date is required"),
  eventTime: Yup.string().required("Event start time is required"),
  eventEndTime: Yup.string().required("Event end time is required"),
  address: Yup.string().required("Address is required"),
  country: Yup.string().required("Country is required"),
  googleMap: Yup.string().required("Google map is required"),
});

export const formInit = {
  title: "",
  content: "",
  featureImage: "",
  isFeatured: false,
  country: undefined,
  status: "ACTIVE",
  eventDate: "",
  eventTime: "",
  eventEndDate: "",
  eventEndTime: "",
  address: "",
  googleMap: "",
  keywords: "",
  metaTitle: "",
  metaDescription: "",
};

export const preferredCountry = [
  { value: "UK", label: "UK" },
  { value: "USA", label: "USA" },
  { value: "Germany", label: "Germany" },
  { value: "Japan", label: "Japan" },
  { value: "Canada", label: "Canada" },
  { value: "Australia", label: "Australia" },
  { value: "Ireland", label: "Ireland" },
  { value: "Malaysia", label: "Malaysia" },
  { value: "Netherlands", label: "Netherlands" },
];