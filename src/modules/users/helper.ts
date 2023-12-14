import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});
export const userValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Minimum 6 characters is required"),
  designationId: Yup.string().required("Designation is required"),
});
export const userUpdateValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().required("Email is required"),
  designationId: Yup.string().required("Designation is required"),
});
