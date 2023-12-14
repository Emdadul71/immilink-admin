import dayjs from "dayjs";
import moment from "moment";
import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  publishedAt: Yup.string().required("published at is required"),
  featureImage: Yup.string().required("Image url is required"),
});

export const editIniVal = (singlePost: any) => {
  if (singlePost !== undefined) {
    return {
      title: singlePost?.title ?? "",
      subTitle: singlePost?.subTitle ?? "",
      content: singlePost?.content ?? "",
      featureImage: singlePost?.featureImage ?? "",
      isFeatured: singlePost?.isFeatured ?? false,
      status: singlePost?.status ?? "ACTIVE",
      publishedAt:
        singlePost?.publishedAt ?? new Date(moment().format("YYYY-MM-DD")),
      categoryIds: singlePost?.categories
        ? singlePost?.categories?.map((cat: any) => {
            return cat?.id;
          })
        : [],
      tagIds: singlePost?.tags
        ? singlePost?.tags?.map((tag: any) => {
            return parseInt(tag?.id);
          })
        : [],
      keywords:
        singlePost?.keywords && singlePost?.keywords !== ""
          ? singlePost?.keywords?.split(",")
          : [],
      metaTitle: singlePost?.metaTitle ?? "",
      metaDescription: singlePost?.metaDescription ?? "",
    };
  } else {
    return {
      title: "",
      subTitle: "",
      content: "",
      featureImage: "",
      isFeatured: false,
      status: "ACTIVE",
      templateId: 0,
      publishedAt: undefined,
      categoryIds: [],
      slug: "",
      tagIds: [],
      keywords: undefined,
      metaTitle: "",
      metaDescription: "",
    };
  }
};

const test = async (data: any) => {};
