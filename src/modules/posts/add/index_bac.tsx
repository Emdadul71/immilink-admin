import {
  Checkbox,
  Collapse,
  DatePicker,
  Select,
  Spin,
  Tabs,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import InfiniteScroll from "react-infinite-scroller";
import { useNavigate, useParams } from "react-router";
import API from "../../../appstore/helpers/api";
import {
  useCreatePostMutation,
  useGetSinglePostQuery,
  useUpdatePostMutation,
} from "../../../appstore/post/post_api";
import { useGetTegsQuery } from "../../../appstore/post/tag/tag_api";
import TextEditor from "../../@common/editor/bdwinners_editor";
import { editIniVal, validationSchema } from "../utils";
const { Panel } = Collapse;

const PostAdd = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [catItems, setCatItems] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { data } = useGetTegsQuery({});
  const [postData, { isLoading }] = useCreatePostMutation();
  const [postUpdateData, {}] = useUpdatePostMutation();
  const { data: singlePost, isLoading: singleLoading } = useGetSinglePostQuery(
    { id },
    { skip: id ? false : true }
  );

  const tagOptions = data?.data.map((item: any) => {
    return {
      value: item?.id,
      label: item?.title,
    };
  });
  const postSchema = editIniVal(id ? singlePost : undefined);

  const createHandler = async (values: any, resetForm: any) => {
    try {
      const keywordStr = values.keywords ? values.keywords.join(",") : "";
      let res: any;
      if (id === undefined) {
        res = await postData({
          title: values.title,
          subTitle: values.subTitle,
          content: values.content,
          featureImage: values.featureImage,
          isFeatured: values.isFeatured,
          publishedAt: new Date(values.publishedAt),
          categoryIds: values.categoryIds,
          tagIds: values.tagIds,
          keywords: keywordStr,
          metaTitle: values.metaTitle,
          metaDescription: values.metaDescription,
          status: values.status ?? "ACTIVE",
        });
      } else {
        res = await postUpdateData({
          id: id,
          title: values.title,
          subTitle: values.subTitle,
          content: values.content,
          featureImage: values.featureImage,
          isFeatured: values.isFeatured,
          publishedAt: new Date(values.publishedAt),
          categoryIds: values.categoryIds,
          tagIds: values.tagIds,
          keywords: keywordStr,
          metaTitle: values.metaTitle,
          metaDescription: values.metaDescription,
          status: values.status ?? "ACTIVE",
        });
      }

      if (!res?.error) {
        if (id === undefined) {
          resetForm();
        }
        message.success(
          `Post ${id !== undefined ? "update" : "create"} successfully`
        );
      } else {
        message.error(
          res?.error?.data?.message ??
            "Something went wrong. Try reload the page"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const categoryLoad = (values: any, setFieldValue: any) => {
    const loadMoreItems = async () => {
      try {
        const newItems: any = await API.get(
          `/categories?&page=${page}&limit=${20}`
        );
        setCatItems([...catItems, ...newItems?.data]);
        setPage(page + 1);
        setHasMore(newItems?.data?.length > 0);
      } catch (error) {
        console.log("error");
      }
    };
    return [
      {
        key: "1",
        label: `All Categories`,
        children: (
          <>
            <div className="max-h-[130px] overflow-auto">
              <InfiniteScroll
                pageStart={0}
                loadMore={loadMoreItems}
                hasMore={hasMore}
                loader={
                  <div key={0} className="flex justify-center items-center">
                    <Spin />
                  </div>
                }
                useWindow={false}
              >
                {catItems?.map((item: any, i: any) => {
                  return (
                    <div key={i}>
                      <Checkbox
                        checked={
                          values?.categoryIds &&
                          values?.categoryIds.includes(item?.id)
                            ? true
                            : false
                        }
                        name="categoryIds"
                        value={item?.id}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFieldValue(`categoryIds`, [
                              ...values?.categoryIds,
                              e?.target?.value,
                            ]);
                          } else {
                            setFieldValue(
                              `categoryIds`,
                              values?.categoryIds.filter(
                                (item: any) => item !== e?.target?.value
                              )
                            );
                          }
                        }}
                      >
                        <span>{item?.title}</span>
                      </Checkbox>
                    </div>
                  );
                })}
              </InfiniteScroll>
            </div>
          </>
        ),
      },
      {
        key: "2",
        label: `Most Used`,
        children: (
          <div className="flex flex-col justify-start item-start gap-1 max-h-[130px] overflow-auto">
            <Checkbox>রাজনীতি</Checkbox>
          </div>
        ),
      },
    ];
  };

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2 mt-3">
        <p>Dashboard</p>
        <FiChevronRight />
        <p>Add New Post </p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">
          {id !== undefined ? "Update" : "New"} Post
        </h4>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>
      <Formik
        initialValues={postSchema}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values: any, { resetForm }) => {
          createHandler(values, resetForm);
        }}
      >
        {({ handleSubmit, setFieldValue, errors, values, touched }: any) => (
          <Form>
            {!singleLoading ? (
              <div className="grid grid-cols-[1fr_300px] gap-5 mb-8 mt-4">
                <div>
                  <div className="flex flex-col ">
                    <label htmlFor="title" className="font-semibold">
                      Title
                      <span className="text-danger">*</span>
                    </label>
                    <div>
                      <Field
                        type="text"
                        name="title"
                        placeholder="Add Title"
                        className="border mt-1 px-2 py-1"
                      />
                      {errors?.title && touched?.title ? (
                        <div className="error">{errors?.title}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-col mt-4">
                    <label htmlFor="title" className="font-semibold">
                      Sub Headding
                    </label>
                    <div>
                      <Field
                        type="text"
                        name={"subTitle"}
                        placeholder="Add Sub Heading"
                        className="border mt-1 px-2 py-1"
                        onChange={(e: any) =>
                          setFieldValue("subTitle", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="title"
                      className="font-semibold inline-block mb-2"
                    >
                      Description{JSON.stringify(values.content)}
                    </label>
                    <div>
                      <TextEditor
                        btnOptionSize="large"
                        name="content"
                        height="450"
                        contents={values?.content ? values?.content : ""}
                        onBlur={(event: any) => {
                          const content = event.value.replace(
                            /(<([^>]+)>)/gi,
                            ""
                          );

                          if (content) {
                            setFieldValue("content", event.value);
                          }
                        }}
                      />
                      {errors?.content && touched?.content ? (
                        <div className="error">{errors?.content}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-col w-full mt-4">
                    <label htmlFor="title" className="font-semibold">
                      Keywords
                    </label>

                    <Select
                      defaultValue={values?.keywords}
                      mode="tags"
                      popupClassName="!hidden"
                      size={"middle"}
                      placeholder="Please select"
                      className="w-full"
                      value={
                        values?.keywords && values?.keywords !== ""
                          ? values?.keywords
                          : []
                      }
                      onChange={(val: any) => setFieldValue("keywords", val)}
                      options={[]}
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label htmlFor="title" className="font-semibold">
                      Meta Title
                    </label>

                    <Field
                      type="text"
                      name="metaTitle"
                      placeholder="Meta Title"
                      className="border mt-1 px-2 py-1"
                    />
                  </div>

                  <div className="flex flex-col mt-4">
                    <label htmlFor="title" className="font-semibold">
                      Meta Description
                    </label>
                    <TextArea
                      value={values.metaDescription}
                      onChange={(e) =>
                        setFieldValue("metaDescription", e.target.value)
                      }
                      rows={4}
                      placeholder="Type Here"
                      className="border mt-1 px-2 py-1"
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <Collapse
                      defaultActiveKey={["1"]}
                      onChange={(e: any) => console.log(e)}
                      expandIconPosition="end"
                      className="add_post"
                    >
                      <Panel header="Publish" key="1">
                        <div className="grid grid-cols-[auto_1fr] gap-[30px] mb-2">
                          <label htmlFor="" className="font-medium mr-1">
                            Status
                          </label>

                          <Select
                            defaultValue={values?.status}
                            style={{ width: "100%" }}
                            onChange={(value) => setFieldValue("status", value)}
                            options={[
                              { value: "ACTIVE", label: "Active" },
                              { value: "INACTIVE", label: "Inactive" },
                              { value: "DRAFT", label: "Draft" },
                              { value: "PUBLIC", label: "Public" },
                              { value: "PENDING", label: "Pending" },
                              { value: "REJECTED", label: "Rejected" },
                            ]}
                            value={values.status}
                          />
                        </div>

                        <div className="grid grid-cols-[43px_1fr] gap-[30px] mb-2">
                          <label htmlFor="" className="font-medium mr-1">
                            Date
                          </label>
                          {singlePost?.publishedAt ? (
                            <DatePicker
                              defaultValue={dayjs(
                                singlePost?.publishedAt ?? new Date(),
                                "YYYY-MM-DD"
                              )}
                              onChange={(date, dateString) => {
                                setFieldValue("publishedAt", dateString);
                              }}
                            />
                          ) : (
                            <DatePicker
                              onChange={(date, dateString) => {
                                setFieldValue("publishedAt", dateString);
                              }}
                            />
                          )}
                        </div>
                        <div className="ps-[75px] w-full">
                          {errors?.publishedAt && touched?.publishedAt ? (
                            <div className="error">{errors?.publishedAt}</div>
                          ) : null}
                        </div>
                        <div className="grid grid-cols-[auto_1fr] gap-[30px]">
                          <label
                            htmlFor="isFeatured"
                            className="font-medium mr-1"
                          >
                            is Featured {JSON.stringify(values.isFeatured)}
                          </label>
                          <Checkbox
                            value={values?.isFeatured}
                            onChange={(e) => {
                              setFieldValue("isFeatured", e.target.checked);
                            }}
                            checked={values?.isFeatured}
                          >
                            Featured
                          </Checkbox>
                        </div>
                        {!isLoading ? (
                          <button
                            className="w-full btn btn-secondary mt-3"
                            onClick={handleSubmit}
                            type="submit"
                          >
                            SAVE & {id !== undefined ? "UPDATE" : "PUBLISH"}{" "}
                          </button>
                        ) : (
                          <button
                            className="w-full btn btn-secondary disabled mt-3"
                            type="button"
                          >
                            <Spin className="h-5" />
                          </button>
                        )}
                      </Panel>
                    </Collapse>
                  </div>
                  <div className="mt-3">
                    <Collapse
                      defaultActiveKey={["1"]}
                      onChange={(e: any) => console.log(e)}
                      expandIconPosition="end"
                      className="add_post add_post_categories"
                    >
                      <Panel header="Category" key="1">
                        <Tabs
                          defaultActiveKey="1"
                          items={categoryLoad(values, setFieldValue)}
                          className=" min-h-[150px]"
                        />
                      </Panel>
                    </Collapse>
                  </div>
                  <div className="mt-3 ">
                    <Collapse
                      defaultActiveKey={["1"]}
                      onChange={(e: any) => console.log(e)}
                      expandIconPosition="end"
                      className=""
                    >
                      <Panel header="Tags" key="1">
                        <Select
                          mode="multiple"
                          defaultValue={
                            singlePost?.tags
                              ? singlePost?.tags?.map((tag: any) => {
                                  return parseInt(tag?.id);
                                })
                              : []
                          }
                          size={`middle`}
                          onChange={(val) => setFieldValue("tagIds", val)}
                          className="w-full"
                          options={tagOptions}
                        />
                      </Panel>
                    </Collapse>
                  </div>
                  <div className="mt-3">
                    <Collapse
                      defaultActiveKey={["1"]}
                      onChange={(e: any) => console.log(e)}
                      expandIconPosition="end"
                      className="add_post"
                    >
                      <Panel header="Featured Image" key="1">
                        <div className="flex justify-center upload_image_width">
                          <Field
                            type="text"
                            name="featureImage"
                            placeholder="Image url"
                            className="border mt-1 px-2 py-1"
                          />
                        </div>
                        {errors?.featureImage && touched?.featureImage ? (
                          <div className="error">{errors?.featureImage}</div>
                        ) : null}
                      </Panel>
                    </Collapse>
                  </div>
                </div>
              </div>
            ) : (
              <div className="min-h-[80vh] flex justify-center items-center">
                <Spin size="large" />
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PostAdd;
