import React from "react";
import TextEditor from "../../@common/editor/bdwinners_editor";
import { FiChevronRight } from "react-icons/fi";
import { Collapse, Select, Input, message, Spin } from "antd";
import { HiPlus } from "react-icons/hi";
import { Field, Form, Formik } from "formik";
import { addValidationSchema } from "../utils";
import {
  useCreateTestimonialMutation,
  useGetSingleTestimonialQuery,
  useUpdateTestimonialMutation,
} from "@/appstore/testimonial/testimonial_api";
import { useParams } from "react-router";
import ImageInput from "@/modules/media/@components/image_modal/imageModal";

const { Panel } = Collapse;

const TestimonialAdd = () => {
  const params = useParams();
  const { id } = params;
  console.log("id", id);

  const [createTestimonial, { isLoading: createLoading }] =
    useCreateTestimonialMutation();

  const [updateTestimonial, { isLoading: updateLoading }] =
    useUpdateTestimonialMutation();

  const {
    data: singletestimonial,
    isFetching: singleLoading,
    error,
  } = useGetSingleTestimonialQuery({ id }, { skip: id ? false : true });

  const addFromInitialValue = {
    name: singletestimonial?.name ?? "",
    designation: singletestimonial?.designation ?? "",
    message: singletestimonial?.message ?? "",
    country: singletestimonial?.country ?? "",
    orderPosition: singletestimonial?.orderPosition ?? "",
    email: singletestimonial?.email ?? undefined,
    rating: singletestimonial?.rating ?? null,
    picture: singletestimonial?.picture ?? undefined,
  };

  const createHandler = async (values: any, actions: any) => {
    const payload = {
      name: values.name,
      designation: values.designation,
      message: values.message,
      country: values.country,
      picture: values.picture,
      orderPosition: values.orderPosition
        ? parseInt(values.orderPosition)
        : undefined,
      email: values.email ? values.email : undefined,
      rating: values.rating ? values.rating : undefined,
    };
    if (!values.rating) delete payload?.rating;
    if (!values.email) delete payload?.email;
    if (!values.orderPosition) delete payload?.orderPosition;
    try {
      let res: any;
      if (id === undefined) {
        res = await createTestimonial(payload);
      } else {
        res = await updateTestimonial({ ...payload, id });
      }

      if (!res?.error) {
        message.success(
          `Testimonial ${
            id === undefined || null ? "Added" : "Update"
          } Succesfully`
        );
        actions?.resetForm();
      } else {
        if (res?.error?.status >= 500) {
          message.error("Somthing went wrong");
        } else {
          message.error(res?.error?.data?.message ?? "Something went wrong.");
        }
      }
    } catch (error) {}
  };

  return (
    <div className="mt-3">
      <div className="sticky top-[65px] bg-white z-20">
        <div className="flex items-center gap-2 pt-3 ">
          <p>Dashboard</p>
          <FiChevronRight />
          <p>Add New Testimonial</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <h4 className="text-primary">
            {id !== undefined ? "Update" : "New"} Testimonial
          </h4>
        </div>
        <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>
      </div>
      <div className="mb-8 mt-4">
        <Formik
          initialValues={addFromInitialValue}
          enableReinitialize={true}
          validationSchema={addValidationSchema}
          onSubmit={(values: any, { resetForm }) => {
            createHandler(values, resetForm);
          }}
        >
          {({ handleSubmit, setFieldValue, errors, values, touched }: any) => (
            <Form>
              {!singleLoading ? (
                <div className="grid grid-cols-[1fr_300px] gap-5 mb-8 mt-4">
                  <div>
                    <div className="flex flex-col">
                      <label htmlFor="title" className="font-semibold">
                        Name
                        <span className="text-danger">*</span>
                      </label>
                      <div>
                        <Field
                          name="name"
                          type="text"
                          className=" border px-3 py-1"
                          placeholder="Enter Name"
                          onChange={(e: any) => {
                            setFieldValue("name", e.target.value);
                          }}
                          value={values?.name}
                        />
                        {errors?.name && touched?.name ? (
                          <div className="error">{errors?.name}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col mt-4">
                      <label htmlFor="title" className="font-semibold">
                        Email
                      </label>
                      <div>
                        <Field
                          name="email"
                          type="email"
                          className=" border px-3 py-1"
                          placeholder="Enter Email"
                          onChange={(e: any) => {
                            setFieldValue("email", e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col mt-4">
                      <label htmlFor="title" className="font-semibold">
                        Designation
                        <span className="text-danger">*</span>
                      </label>
                      <div>
                        <Field
                          name="designation"
                          type="text"
                          className=" border px-3 py-1"
                          placeholder="Designation"
                          onChange={(e: any) => {
                            setFieldValue("designation", e.target.value);
                          }}
                        />
                        {errors?.designation && touched?.designation ? (
                          <div className="error">{errors?.designation}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col mt-4">
                      <label htmlFor="title" className="font-semibold">
                        Location
                        <span className="text-danger">*</span>
                      </label>

                      <Field
                        name="country"
                        type="text"
                        className=" border px-3 py-1"
                        placeholder="Location"
                        onChange={(e: any) => {
                          setFieldValue("country", e.target.value);
                        }}
                      />
                      {errors?.country && touched?.country ? (
                        <div className="error">{errors?.country}</div>
                      ) : null}
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="title"
                        className="font-semibold inline-block mb-2"
                      >
                        Message
                        <span className="font-medium text-danger">*</span>
                      </label>
                      <div>
                        <TextEditor
                          btnOptionSize="large"
                          name="content"
                          height="350"
                          contents={values?.message ? values?.message : ""}
                          onBlur={(event: any) => {
                            const content = event.value.replace(
                              /(<([^>]+)>)/gi,
                              ""
                            );

                            if (content) {
                              setFieldValue("message", event.value);
                            }
                          }}
                        />
                        {errors?.message && touched?.message ? (
                          <div className="error">{errors?.message}</div>
                        ) : null}
                      </div>
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
                          {!createLoading ? (
                            <button
                              className="w-full btn btn-secondary mt-3"
                              onClick={handleSubmit}
                              type="submit"
                            >
                              {id !== undefined ? "UPDATE" : `SAVE`}
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
                        <Panel header="Rating" key="1">
                          <Field
                            name="rating"
                            type="number"
                            className=" border px-3 py-1"
                            placeholder="Rating"
                            onChange={(e: any) => {
                              setFieldValue("rating", e.target.value);
                            }}
                          />
                          {errors?.rating && touched?.rating ? (
                            <div className="error">{errors?.rating}</div>
                          ) : null}
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
                        <Panel header="Order Position" key="1">
                          <Field
                            name="orderPosition"
                            type="number"
                            className=" border px-3 py-1"
                            placeholder="Order Position"
                            onChange={(e: any) => {
                              setFieldValue("orderPosition", e.target.value);
                            }}
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
                        <Panel header="Avatar Image" key="1">
                          <div className="flex justify-center upload_image_width">
                            <ImageInput
                              onChange={(e: any) => {
                                setFieldValue("picture", e?.data?.path);
                              }}
                              imageUrl={values?.picture}
                            />
                          </div>
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
    </div>
  );
};

export default TestimonialAdd;
