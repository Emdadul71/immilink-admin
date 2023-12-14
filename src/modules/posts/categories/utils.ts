import * as Yup from "yup";

export const initialValue = {
  title: "",
  parent_id: undefined,
  description: "",
};

export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  slug: Yup.string().required("Slug is required"),

  //   keywords: Yup.array()
  //     .of(Yup.string().required("keywords is required")) // Validation for each item in the array
  //     .min(1, "At least one item is required"),
});
