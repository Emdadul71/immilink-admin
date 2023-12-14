import * as Yup from "yup";

export const initialValue = {
  title: "",
  parent_id: undefined,
  description: "",
};
export const addFromInitialValue = {
  name: "",
  designation: "",
  message: "",
  orderPosition: 0,
  email: "",
  rating: 0,
};

export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  slug: Yup.string().required("Slug is required"),
});

export const addValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  message: Yup.string().required("Message is required"),
  designation: Yup.string().required("Designation is required"),
  country: Yup.string().required("Designation is required"),
});
