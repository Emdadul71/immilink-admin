import { useGetAllTeamDesignationQuery } from "@/appstore/team/designation/designation_api";
import {
  useCreateTeamMutation,
  useGetSingleTeamQuery,
  useUpdateTeamMutation,
} from "@/appstore/team/team_api";
import { useGetTeamLevelQuery } from "@/appstore/team/team_level/team_level";
import TextEditor from "@/modules/@common/editor/bdwinners_editor";
import ImageInput from "@/modules/media/@components/image_modal/imageModal";
import { Collapse, Select, Spin, message } from "antd";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import PI from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useParams } from "react-router-dom";
import { locSocileLinks, validationSchema } from "../helper";
const PhoneInput = (PI as any).default !== undefined ? (PI as any).default : PI;
const { Panel } = Collapse;

const TeamAdd = () => {
  const [dialCode, setDialCode] = useState("+880");
  const params = useParams();
  const { id } = params;
  const { data: singleTeam, isLoading: singleLoading } =
    useGetSingleTeamQuery<any>({ id }, { skip: id ? false : true });
  const [createData, { isLoading }] = useCreateTeamMutation();
  const [updateData, { isLoading: upLoadign }] = useUpdateTeamMutation();
  const { data } = useGetTeamLevelQuery({
    name: "",
    page: 1,
    limit: 20,
  });

  const { data: designationData, isFetching } = useGetAllTeamDesignationQuery({
    name: "",
    page: 1,
    limit: 10,
  });

  const parentOptions = data?.data?.map((item: any) => {
    return {
      value: item?.id,
      label: item?.name,
    };
  });
  const designationOptions = designationData?.data?.map((item: any) => {
    return {
      value: item?.id,
      label: item?.name,
    };
  });

  const forminit = {
    name: singleTeam?.name ?? "",
    slug: singleTeam?.slug ?? "",
    education: singleTeam?.education ?? "",
    description: singleTeam?.description ?? "",
    designationId: singleTeam?.designationId ?? "",
    countryId: 0,
    stateId: 0,
    profileImage: singleTeam?.profileImage ?? "",
    mobile: singleTeam?.mobile ?? "",
    email: singleTeam?.email ?? "",
    location: singleTeam?.location ?? "",
    levelId: singleTeam?.levelId ?? undefined,
    status: singleTeam?.status ?? "ACTIVE",
  };

  const createHandler = async (values: any, resetForm: any) => {
    const payload = {
      name: values.name,
      email: values.email,
      slug: values.slug,
      mobile: values.mobile,
      location: values.location,
      education: values.education,
      description: values.description,
      profileImage: values.profileImage,
      socialLink: locSocileLinks,
      levelId: parseInt(values.levelId),
      designationId: parseInt(values.designationId),
      countryId: 0,
      stateId: 0,
      status: values.status,
    };
    try {
      const response: any = id
        ? await updateData({ ...payload, id: id })
        : await createData(payload);

      if (!response?.error) {
        message.success(`Team ${id ? "update" : "create"} successfully`);
      } else {
        message.error(
          response?.error?.data?.message ??
            "Something went wrong. Try reload the page"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <p>Dashboard</p>
        <FiChevronRight />
        <p> {id !== undefined ? "Update" : "Create"} Team</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">
          {" "}
          {id !== undefined ? "Update" : "Create"} Team
        </h4>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>

      <div className="w-full">
        <Formik
          //@ts-ignore
          initialValues={forminit}
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1">
                          <div className="grid grid-cols-1 gap-2  items-center">
                            <label htmlFor="Address" className="font-semibold">
                              Name <span className="text-danger">*</span>
                            </label>

                            <Field
                              type="text"
                              name="name"
                              placeholder="Name"
                              className="border mt-1 px-2 py-1"
                            />
                            {errors?.name && touched?.name ? (
                              <div className="error">{errors?.name}</div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-span-1">
                          <div className="grid grid-cols-1 gap-2  items-center">
                            <label htmlFor="Address" className="font-semibold">
                              Email <span className="text-danger">*</span>
                            </label>

                            <Field
                              type="email"
                              name="email"
                              placeholder="Email"
                              className="border mt-1 px-2 py-1"
                            />
                            {errors?.email && touched?.email ? (
                              <div className="error">{errors?.email}</div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-span-1">
                          <div className="grid grid-cols-1 gap-2  items-center">
                            <label htmlFor="Address" className="font-semibold">
                              Slug
                            </label>

                            <Field
                              type="slug"
                              name="slug"
                              placeholder="Slug"
                              className="border mt-1 px-2 py-1"
                            />
                            {errors?.slug && touched?.slug ? (
                              <div className="error">{errors?.slug}</div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-span-1">
                          <div className="grid grid-cols-1 gap-2  items-center phone_input_wrapper">
                            <label htmlFor="Address" className="font-semibold">
                              Mobile <span className="text-danger">*</span>
                            </label>
                            <PhoneInput
                              country={"bd"}
                              countryCodeEditable={true}
                              className="mt-1 px-2 py-1 w-full"
                              value={values?.mobile ?? dialCode}
                              onChange={(val: any, countryCode: any) => {
                                setDialCode(countryCode?.dialCode);
                                setFieldValue("mobile", `+${val}`);
                              }}
                            />
                            {errors?.mobile && touched?.mobile ? (
                              <div className="error">{errors?.mobile}</div>
                            ) : null}
                          </div>
                        </div>

                        <div className="col-span-1">
                          <div className="grid grid-cols-1 gap-2  items-center">
                            <label htmlFor="Address" className="font-semibold">
                              Designation <span className="text-danger">*</span>
                            </label>

                            <Select
                              placeholder="Designation"
                              style={{ width: "100%", borderRadius: 0 }}
                              className="py-1"
                              options={designationOptions}
                              value={
                                values?.designationId &&
                                values?.designationId !== undefined
                                  ? values?.designationId
                                  : undefined
                              }
                              onChange={(val: any) =>
                                setFieldValue("designationId", val)
                              }
                            />

                            {errors?.designationId && touched?.designationId ? (
                              <div className="error">
                                {errors?.designationId}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="col-span-1">
                          <div className="grid grid-cols-1 gap-2  items-center">
                            <label htmlFor="Address" className="font-semibold">
                              Team Level <span className="text-danger">*</span>
                            </label>

                            <Select
                              placeholder="Team Level"
                              style={{ width: "100%", borderRadius: 0 }}
                              className="py-1"
                              options={parentOptions}
                              value={
                                values?.levelId && values?.levelId !== undefined
                                  ? values?.levelId
                                  : undefined
                              }
                              onChange={(val: any) =>
                                setFieldValue("levelId", val)
                              }
                            />

                            {errors?.levelId && touched?.levelId ? (
                              <div className="error">{errors?.levelId}</div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="grid grid-cols-1 gap-2  items-center">
                            <label htmlFor="Address" className="font-semibold">
                              Address <span className="text-danger">*</span>
                            </label>

                            <Field
                              type="text"
                              name="location"
                              placeholder="Address"
                              className="border mt-1 px-2 py-1"
                            />
                            {errors?.location && touched?.location ? (
                              <div className="error">{errors?.location}</div>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label
                          htmlFor="title"
                          className="font-semibold inline-block mb-2"
                        >
                          Education <span className="text-danger">*</span>
                        </label>
                        <TextEditor
                          btnOptionSize="small"
                          name="education"
                          height="200"
                          contents={values?.education ? values?.education : ""}
                          onBlur={(event: any) => {
                            const education = event.value.replace(
                              /(<([^>]+)>)/gi,
                              ""
                            );

                            if (education) {
                              setFieldValue("education", event.value);
                            }
                          }}
                        />
                        {errors?.education && touched?.education ? (
                          <div className="error">{errors?.education}</div>
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
                          btnOptionSize="large"
                          name="description"
                          height="450"
                          contents={
                            values?.description ? values?.description : ""
                          }
                          onBlur={(event: any) => {
                            const description = event.value.replace(
                              /(<([^>]+)>)/gi,
                              ""
                            );

                            if (description) {
                              setFieldValue("description", event.value);
                            }
                          }}
                        />
                        {errors?.description && touched?.description ? (
                          <div className="error">{errors?.description}</div>
                        ) : null}
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
                            <div className="grid grid-cols-[100px_4fr] gap-[30px]">
                              <label htmlFor="" className="font-medium mr-1">
                                Status
                              </label>

                              <Select
                                defaultValue={values?.status}
                                style={{ width: 120 }}
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
                              className={`w-full btn btn-secondary mt-3 ${
                                isLoading || upLoadign ? "disabled" : ""
                              }`}
                            >
                              {isLoading ||
                                (upLoadign && <Spin size="small" />)}
                              SAVE & {id !== undefined ? "UPDATE" : "PUBLISH"}{" "}
                            </button>
                          </Panel>
                        </Collapse>
                      </div>

                      <div className="mb-3">
                        <Collapse
                          defaultActiveKey={["1"]}
                          onChange={(e) => console.log()}
                          expandIconPosition="end"
                          className="add_post"
                        >
                          <Panel header="Profile Image" key="1">
                            <div className="flex justify-center upload_image_width">
                              <ImageInput
                                onChange={(e: any) => {
                                  setFieldValue("profileImage", e?.data?.path);
                                }}
                                imageUrl={values?.profileImage}
                              />
                            </div>
                            {errors?.profileImage && touched?.profileImage ? (
                              <div className="error">
                                {errors?.profileImage}
                              </div>
                            ) : null}
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
    </div>
  );
};

export default TeamAdd;
