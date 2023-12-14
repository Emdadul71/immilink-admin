import ImageInput from "@/modules/media/@components/image_modal/imageModal";
import { Collapse, DatePicker, Select, Spin, TimePicker, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import moment from "moment";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateEventMutation,
  useGetSingleEventQuery,
  useUpdateEventMutation,
} from "../../../appstore/event/event_api";
import TextEditor from "../../@common/editor/bdwinners_editor";
import { formInit, preferredCountry, validationSchema } from "../utils";

const { Panel } = Collapse;

const CreateEvent = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [eventData, { isLoading }] = useCreateEventMutation();
  const [eventUpdateData, {}] = useUpdateEventMutation();
  const { data: singleEvent, isLoading: singleLoading } =
    useGetSingleEventQuery<any>({ id }, { skip: id ? false : true });

  const createHandler = async (values: any, resetForm: any) => {
    try {
      let res: any;
      const keywordStr = values.keywords ? values.keywords.join(",") : "";

      if (id === undefined) {
        res = await eventData({
          title: values.title,
          content: values.content,
          featureImage: values.featureImage,
          isFeatured: values.isFeatured,
          eventDate: values.eventDate,
          eventTime: values.eventTime,
          eventEndDate: values.eventDate,
          eventEndTime: values.eventEndTime,
          address: values.address,
          googleMap: values.googleMap,
          keywords: keywordStr,
          metaTitle: values.metaTitle,
          metaDescription: values.metaDescription,
          country: values.country ?? "",
          status: values.status ?? "ACTIVE",
        });
      } else {
        res = await eventUpdateData({
          id: id,
          title: values.title,
          content: values.content,
          featureImage: values.featureImage,
          isFeatured: values.isFeatured,
          eventDate: values.eventDate,
          eventTime: values.eventTime,
          eventEndDate: values.eventDate,
          eventEndTime: values.eventEndTime,
          address: values.address,
          googleMap: values.googleMap,
          keywords: keywordStr,
          metaTitle: values.metaTitle,
          metaDescription: values.metaDescription,
          country: values.country ?? "",
          status: values.status ?? "ACTIVE",
        });
      }

      if (!res?.error) {
        message.success(
          `Event ${id !== undefined ? "update" : "create"} successfully`
        );
        // navigate("/events");
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
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2 mt-3">
        <p>Dashboard</p>
        <FiChevronRight />
        <p>Event</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">
          {id !== undefined ? "Update" : "Create"} Event
        </h4>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>

      <Formik
        //@ts-ignore
        initialValues={id !== undefined ? singleEvent : formInit}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values: any, { resetForm }) => {
          createHandler(values, resetForm);
        }}
      >
        {({ handleSubmit, setFieldValue, errors, values, touched }: any) => (
          <Form>
            {!singleLoading ? (
              <>
                <div className="grid grid-cols-[1fr_300px] gap-5 mb-8 mt-4">
                  <div>
                    <div className="flex flex-col ">
                      <label htmlFor="title" className="font-semibold">
                        Title <span className="text-danger">*</span>
                      </label>
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

                    <div className="mt-4">
                      <label
                        htmlFor="title"
                        className="font-semibold inline-block mb-2"
                      >
                        Description <span className="text-danger">*</span>
                      </label>
                      <TextEditor
                        name="content"
                        btnOptionSize="large"
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
                    <div className="py-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="col-span-1">
                          <div className="grid grid-cols-1 gap-2 items-center">
                            <label htmlFor="Address" className="font-semibold">
                              Event Date
                              <span className="text-danger">*</span>
                            </label>
                            {singleEvent?.eventDate ? (
                              <DatePicker
                                defaultValue={dayjs(
                                  singleEvent?.eventDate
                                    ? singleEvent?.eventDate
                                    : new Date(),
                                  "YYYY-MM-DD"
                                )}
                                onChange={(date, dateString) =>
                                  setFieldValue("eventDate", dateString)
                                }
                                disabledDate={(current) =>
                                  current && current < moment().startOf("day")
                                }
                              />
                            ) : (
                              <DatePicker
                                onChange={(date, dateString) =>
                                  setFieldValue("eventDate", dateString)
                                }
                                disabledDate={(current) =>
                                  current && current < moment().startOf("day")
                                }
                              />
                            )}

                            {errors?.eventDate && touched?.eventDate ? (
                              <div className="error">{errors?.eventDate}</div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-span-1 md:col-span-1">
                          <div className="grid grid-cols-1 gap-2 items-center">
                            <label htmlFor="Address" className="font-semibold">
                              Start Time
                              <span className="text-danger">*</span>
                            </label>
                            {singleEvent?.eventTime ? (
                              <TimePicker
                                defaultValue={dayjs(
                                  singleEvent?.eventTime,
                                  "HH:mm:ss"
                                )}
                                onChange={(date, dateString) =>
                                  setFieldValue("eventTime", dateString)
                                }
                                defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                              />
                            ) : (
                              <TimePicker
                                onChange={(date, dateString) =>
                                  setFieldValue("eventTime", dateString)
                                }
                                defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                              />
                            )}

                            {errors?.eventTime && touched?.eventTime ? (
                              <div className="error">{errors?.eventTime}</div>
                            ) : null}
                          </div>
                        </div>

                        <div className="col-span-1 md:col-span-1">
                          <div className="grid grid-cols-1 gap-2 items-center">
                            <label htmlFor="Address" className="font-semibold">
                              End Time <span className="text-danger">*</span>
                            </label>
                            {singleEvent?.eventEndTime ? (
                              <TimePicker
                                defaultValue={dayjs(
                                  singleEvent?.eventEndTime,
                                  "HH:mm:ss"
                                )}
                                onChange={(date, dateString) =>
                                  setFieldValue("eventEndTime", dateString)
                                }
                                defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                              />
                            ) : (
                              <TimePicker
                                onChange={(date, dateString) =>
                                  setFieldValue("eventEndTime", dateString)
                                }
                                defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                              />
                            )}

                            {errors?.eventEndTime && touched?.eventEndTime ? (
                              <div className="error">
                                {errors?.eventEndTime}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="col-span-1">
                          <div className="grid grid-cols-1 gap-2  items-center">
                            <label htmlFor="Address" className="font-semibold">
                              Address <span className="text-danger">*</span>
                            </label>

                            <Field
                              type="text"
                              name="address"
                              placeholder="Add address"
                              className="border mt-1 px-2 py-1"
                            />
                            {errors?.address && touched?.address ? (
                              <div className="error">{errors?.address}</div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 pb-2 pt-1">
                        <div className="grid grid-cols-1 gap-2  items-center">
                          <label htmlFor="Address" className="font-semibold">
                            G-Map Embed Code
                            <span className="text-danger">*</span>
                          </label>
                          <TextArea
                            value={values?.googleMap}
                            onChange={(e) =>
                              setFieldValue("googleMap", e.target.value)
                            }
                            rows={4}
                            placeholder="Type Here"
                            className="border mt-1 px-2 py-1"
                          />
                          {errors?.googleMap && touched?.googleMap ? (
                            <div className="error">{errors?.googleMap}</div>
                          ) : null}
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="grid grid-cols-1 gap-2  items-center">
                          <label htmlFor="" className="font-semibold">
                            Meta Title
                          </label>
                          <Field
                            type="text"
                            name="metaTitle"
                            placeholder="Meta title"
                            className="border mt-1 px-2 py-1"
                          />
                          {errors?.metaTitle && touched?.metaTitle ? (
                            <div className="error">{errors?.metaTitle}</div>
                          ) : null}
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="grid grid-cols-1 gap-2  items-center">
                          <label htmlFor="Address" className="font-semibold">
                            Meta Keywords
                          </label>
                          <Select
                            defaultValue={values?.keywords ?? []}
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
                            onChange={(val: any) =>
                              setFieldValue("keywords", val)
                            }
                            options={[]}
                          />
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="grid grid-cols-1 gap-2  items-center">
                          <label htmlFor="Address" className="font-semibold">
                            Meta description
                          </label>
                          <TextArea
                            value={values?.metaDescription}
                            onChange={(e) =>
                              setFieldValue("metaDescription", e.target.value)
                            }
                            rows={4}
                            placeholder="Type Here"
                            className="border mt-1 px-2 py-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-3">
                      <Collapse
                        defaultActiveKey={["1"]}
                        onChange={(e) => console.log(e)}
                        expandIconPosition="end"
                        className="add_post"
                      >
                        <Panel header="Publish" key="1">
                          <div className="grid grid-cols-[50px_4fr] gap-[30px]">
                            <label htmlFor="" className="font-medium mr-1">
                              Status
                            </label>

                            <Select
                              defaultValue={values?.status}
                              className="w-full"
                              options={[
                                { value: "ACTIVE", label: "Active" },
                                // { value: "INACTIVE", label: "Inactive" },
                                { value: "DRAFT", label: "Draft" },
                                // { value: "PUBLIC", label: "Public" },
                                // { value: "PENDING", label: "Pending" },
                                // { value: "REJECTED", label: "Rejected" },
                              ]}
                              value={
                                values?.status &&
                                values?.status !== "" &&
                                values?.status
                              }
                              onChange={(val) => setFieldValue("status", val)}
                            />
                          </div>

                          <button
                            type="submit"
                            onClick={(e) => {
                              handleSubmit();
                              e.preventDefault();
                            }}
                            className="w-full btn btn-secondary mt-3"
                          >
                            SAVE{" "}
                            {id !== undefined
                              ? "& UPDATE"
                              : values?.status === "ACTIVE"
                              ? "& PUBLISH"
                              : "AS DRAFT"}{" "}
                          </button>
                        </Panel>
                      </Collapse>
                    </div>
                    <div className="mb-3">
                      <Collapse
                        defaultActiveKey={["1"]}
                        onChange={(e) => console.log(e)}
                        expandIconPosition="end"
                        className="add_post"
                      >
                        <Panel header="Country" key="1">
                          <div className="grid grid-cols-[50px_4fr] gap-[50px]">
                            <label htmlFor="" className="font-medium mr-1">
                              Country
                            </label>
                            <div>
                              <Select
                                placeholder="Preferred Country"
                                className="w-full"
                                options={preferredCountry}
                                value={
                                  values?.country !== undefined
                                    ? values?.country
                                    : undefined
                                }
                                onChange={(val) =>
                                  setFieldValue("country", val)
                                }
                              />
                            </div>
                          </div>
                          <div className="pl-[100px]">
                            {errors?.country && touched?.country ? (
                              <div className="error">{errors?.country}</div>
                            ) : null}
                          </div>
                        </Panel>
                      </Collapse>
                    </div>

                    <div className="mb-3">
                      <Collapse
                        defaultActiveKey={["1"]}
                        onChange={onChange}
                        expandIconPosition="end"
                        className="add_post"
                      >
                        <Panel header="Featured Image" key="1">
                          <div className="relative">
                            <ImageInput
                              onChange={(e: any) => {
                                setFieldValue("featureImage", e?.data?.path);
                              }}
                              imageUrl={values?.featureImage}
                            />
                            {errors?.featureImage && touched?.featureImage ? (
                              <div className="error">
                                {errors?.featureImage}
                              </div>
                            ) : null}
                          </div>
                        </Panel>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </>
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

export default CreateEvent;
