import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string().required("Mobile is required"),
  email: Yup.string().required("Email is required"),
  education: Yup.string().required("Education is required"),
  description: Yup.string().required("Description is required"),
  levelId: Yup.string().required("Team level is required"),
  designationId: Yup.string().required("Designation is required"),
  location: Yup.string().required("Address is required"),
  profileImage: Yup.string().required("Profile image is required"),
});

export const teamLevelValidationSchema = Yup.object().shape({
  name: Yup.string().required("Title is required"),
});
export const designationValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  orderPosition: Yup.string().required("Order position is required"),
});

export const locSocileLinks = {
  facebook: "https://www.facebook.com/SIBangladesh",
  instagram: "https://www.instagram.com/studyinternationalbangladesh/",
  linkedin: "https://www.linkedin.com/company/study-international-bangladesh/",
  youtube: "https://www.youtube.com/@StudyInternationalaustralia",
};