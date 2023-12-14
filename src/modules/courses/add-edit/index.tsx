import {
  Checkbox,
  Collapse,
  Modal,
  Popover,
  Select,
  Spin,
  Switch,
  message,
} from "antd";
import BreadCrumb from "@/modules/@common/breadcrumb";
import Title from "@/modules/@common/title";
import React from "react";
import TextArea from "antd/es/input/TextArea";
import { Field, Form, Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import TextEditor from "../../../modules/@common/editor/bdwinners_editor";
import ImageInput from "../../../modules/media/@components/image_modal/imageModal";

const { Panel } = Collapse;
const breadcrumbData = [
  {
    title: "Dashboard",
    link: "/dashboard",
  },

  {
    title: "Add Course",
    link: "",
  },
];
const CourseAddEdit = () => {
  return (
    <div>
      <BreadCrumb data={breadcrumbData} />

      <div className="flex justify-between items-center mt-4">
        <Title title="Add Course" />

        <Link to="/courses" className="btn btn-secondary">
          <span>All Course</span>
        </Link>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>
      <div className="grid grid-cols-[1fr_400px] gap-5 mb-8 mt-4">
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <div className="flex justify-between pb-2">
                <label htmlFor="title" className="font-medium">
                  Course Title<span className="text-danger">*</span>{" "}
                </label>
              </div>
              <div>
                <input
                  type="text"
                  name="sourceUrl"
                  placeholder="Course Title"
                  className="border mt-1 px-2 py-1"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between pb-2">
                <label htmlFor="title" className="font-medium">
                  Course Level<span className="text-danger">*</span>
                </label>
                {/* <button
                   onClick={() => {
                     setTitleModal("Add Course Level");
                    setIsModalOpen(true);
                  }}
                  className="btn btn-primary-outline-sm"
                >
                  Add Course Level
                </button> */}
              </div>
              <div>
                <Select
                  showSearch
                  // loading={levelLoading}
                  placeholder="Select Course Lavel"
                  // options={levelOptions}
                  className="w-full"
                  // onChange={(val) => {
                  //   setFieldValue("levelId", val);
                  // }}
                  // onSearch={(e) => setCourseLevel(e)}
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  // value={
                  //   values?.levelId !== undefined ? values?.levelId : undefined
                />
              </div>
              {/* {errors?.levelId && touched?.levelId ? (
                <div className="text-danger">{errors?.levelId as String}</div>
              ) : null} */}
            </div>

            <div className="flex flex-col col-span-2">
              <label htmlFor="title" className="font-medium">
                Display Name
                <span className="text-danger">*</span>
              </label>
              <div>
                <input
                  type="text"
                  name="displayName"
                  placeholder="Display Name"
                  className="border mt-1 px-2 py-1"
                />
              </div>
              {/* {errors?.displayName && touched?.displayName ? (
                <div className="text-danger">
                  {errors?.displayName as String}
                </div>
              ) : null} */}
            </div>
            {/*
            <div className="flex flex-col ">
              <label htmlFor="title" className="font-medium">
                University
                <span className="text-danger">*</span>
              </label>
              <div>
                <Select
                  showSearch
                  loading={uniLoading}
                  placeholder="Select University"
                  options={universityOptions}
                  className="w-full"
                  onChange={(val) => {
                    setFieldValue("universityId", val);
                    setUniId(val);
                  }}
                  onSearch={(e) => setUniversityName(e)}
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  value={
                    values?.universityId !== undefined
                      ? values?.universityId
                      : undefined
                  }
                />
              </div>
              {errors?.universityId && touched?.universityId ? (
                <div className="text-danger">
                  {errors?.universityId as String}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col ">
              <label htmlFor="specializationId" className="font-medium">
                Specialization
              </label>
              <div>
                <Select
                  showSearch
                  loading={speciaLoading}
                  placeholder="Select Specialization"
                  options={specializationOptions}
                  className="w-full"
                  onChange={(val) => {
                    setFieldValue("specializationId", val);
                  }}
                  onSearch={(e) => setSpeciaName(e)}
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  value={
                    values?.specializationId !== undefined
                      ? values?.specializationId
                      : undefined
                  }
                />
              </div>
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="title" className="font-medium">
                University Campus
                <span className="text-danger">*</span>
              </label>
              <div>
                <Select
                  mode="multiple"
                  showSearch
                  loading={uniCampusLoading}
                  placeholder="Select University Campus"
                  options={universityCampusOptions}
                  className="w-full"
                  onChange={(val) => {
                    setFieldValue("campusId", val);
                  }}
                  onSearch={(e) => setUniCampusName(e)}
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  value={
                    values?.campusId !== undefined
                      ? values?.campusId
                      : undefined
                  }
                />
              </div>
              {errors?.campusId && touched?.campusId ? (
                <div className="text-danger">{errors?.campusId as String}</div>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label htmlFor="location" className="font-medium">
                Location
              </label>
              <div>
                <Field
                  type="text"
                  name="location"
                  placeholder="Location"
                  className="border mt-1 px-2 py-1"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="duration" className="font-medium">
                Course Duration
                <span className="text-danger">*</span>
              </label>
              <div>
                <Field
                  type="text"
                  name="duration"
                  placeholder="Course Duration"
                  className="border mt-1 px-2 py-1"
                />
              </div>
              {errors?.duration && touched?.duration ? (
                <div className="text-danger">{errors?.duration as String}</div>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label htmlFor="sourceUrl" className="font-medium">
                Source Url
                <span className="text-danger">*</span>
              </label>
              <div>
                <Field
                  type="text"
                  name="sourceUrl"
                  placeholder="Source Url"
                  className="border mt-1 px-2 py-1"
                />
              </div>
              {errors?.sourceUrl && touched?.sourceUrl ? (
                <div className="text-danger">{errors?.sourceUrl as String}</div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label htmlFor="language" className="font-medium">
                Language
              </label>
              <div>
                <Field
                  type="text"
                  name="language"
                  placeholder="language"
                  className="border mt-1 px-2 py-1"
                />
              </div>
            </div> */}

            <div className="flex flex-col">
              <label htmlFor="viewCount" className="font-medium">
                View Count
              </label>
              <div>
                <input
                  type="number"
                  name="viewCount"
                  placeholder="View Count"
                  className="border mt-1 px-2 py-1"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="positionOrder" className="font-medium">
                Position Order
              </label>
              <div>
                <input
                  type="number"
                  name="positionOrder"
                  placeholder="Position Order"
                  className="border mt-1 px-2 py-1"
                />
              </div>
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="description" className="font-medium">
                Description
                <span className="text-danger">*</span>
              </label>
              <div>
                <TextEditor
                  btnOptionSize="large"
                  name="whyStudy"
                  height="400"
                  // contents={values?.description ? values?.description : ""}
                  // onBlur={(event: any) => {
                  //   setFieldValue("description", event.value);
                  // }}
                />
              </div>
              {/* {errors?.description && touched?.description ? (
                <div className="text-danger">
                  {errors?.description as String}
                </div>
              ) : null} */}
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="title" className="font-medium">
                Search Keywords
              </label>
              <div>
                <Select
                  mode="tags"
                  placeholder="Search Keywords"
                  className="w-full"
                  // onChange={(val) => setFieldValue("searchKeywords", val)}
                  options={[]}
                  popupClassName="!hidden"
                  // value={
                  //   values?.searchKeywords &&
                  //   values?.searchKeywords !== undefined
                  //     ? values?.searchKeywords
                  //     : undefined
                  // }
                />
              </div>
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="title" className="font-medium">
                Meta Title
              </label>
              <div>
                <input
                  type="text"
                  name={"metaTitle"}
                  placeholder="Meta Tile"
                  className="border mt-1 px-2 py-1"
                />
              </div>
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="title" className="font-medium">
                Meta Keywords
              </label>
              <div>
                <Select
                  mode="tags"
                  placeholder="Meta Keywords"
                  className="w-full"
                  // onChange={(val) => setFieldValue("metaKeyword", val)}
                  options={[]}
                  popupClassName="!hidden"
                  // value={
                  //   values?.metaKeyword && values?.metaKeyword !== undefined
                  //     ? values?.metaKeyword
                  //     : undefined
                  // }
                />
              </div>
            </div>

            <div className="flex flex-col col-span-2">
              <label htmlFor="title" className="font-medium">
                Meta Description
              </label>
              <div>
                <TextArea
                  // value={values?.metaDescription}
                  // onChange={(e) =>
                  //   setFieldValue("metaDescription", e.target.value)
                  // }
                  placeholder="Meta Description"
                  autoSize={{ minRows: 5 }}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <Collapse
              defaultActiveKey={["1"]}
              onChange={(e: any) => console.log(e)}
              expandIconPosition="end"
            >
              <Panel header="Publish" key="1">
                <div className="flex flex-col gap-2 mb-2">
                  <label htmlFor="" className="font-medium mr-1">
                    Status
                  </label>

                  <div>
                    <Select
                      style={{ width: "100%" }}
                      options={[
                        { value: "ACTIVE", label: "Active" },
                        { value: "DRAFT", label: "Draft" },
                      ]}
                      placeholder="Select Status"
                      // onChange={(val) => setFieldValue("status", val)}
                      // value={
                      //   values?.status && values?.status !== undefined
                      //     ? values?.status
                      //     : undefined
                      // }
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-2">
                  <div>
                    <Checkbox
                    // onChange={(e) =>
                    //   setFieldValue("hasScholarship", e.target.checked)
                    // }
                    // checked={values?.hasScholarship}
                    >
                      Has Scholarship
                    </Checkbox>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-2">
                  <div>
                    <Checkbox
                    // onChange={(e) => setFieldValue("isTop", e.target.checked)}
                    // checked={values?.isTop}
                    >
                      Is Top
                    </Checkbox>
                  </div>
                </div>

                <button
                  className={`w-full btn btn-primary mt-3 `}
                  type="submit"
                >
                  {`SAVE & NEXT`}
                </button>
              </Panel>
            </Collapse>
          </div>
          <div className="mt-4">
            <Collapse
              defaultActiveKey={["1"]}
              onChange={(e: any) => console.log(e)}
              expandIconPosition="end"
            >
              <Panel header="Delevery Method" key="1">
                <div className="flex flex-col gap-2 mb-2">
                  <label htmlFor="" className="font-medium mr-1">
                    Delivery Method
                    <span className="text-danger">*</span>
                  </label>

                  <div>
                    <Select
                      showSearch
                      mode="multiple"
                      // options={deliveryOption}
                      // loading={deliveryLoading}
                      style={{ width: "100%" }}
                      placeholder="Select Delivery Methods"
                      // onChange={(val) =>
                      //   setFieldValue("deliveryMethodIds", val)
                      // }
                      // onSearch={(e) => setDeliverName(e)}
                      filterOption={(input: any, option: any) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      // value={
                      //   values?.deliveryMethodIds &&
                      //   values?.deliveryMethodIds !== undefined
                      //     ? values?.deliveryMethodIds
                      //     : undefined
                      // }
                    />
                  </div>
                  {/* {errors?.deliveryMethodIds && touched?.deliveryMethodIds ? (
                    <div className="text-danger">
                      {errors?.deliveryMethodIds as String}
                    </div>
                  ) : null} */}
                </div>
              </Panel>
            </Collapse>
          </div>
          <div className="mt-4">
            <Collapse
              defaultActiveKey={["1"]}
              onChange={(e: any) => console.log(e)}
              expandIconPosition="end"
            >
              <Panel header="Study Pace" key="1">
                <div className="flex flex-col gap-2 mb-2">
                  <label htmlFor="" className="font-medium mr-1">
                    Study Pace
                  </label>

                  <div>
                    <Select
                      placeholder="Select Study Pace"
                      className="w-full"
                      options={[
                        { value: "FULL_TIME", label: "Full Time" },
                        { value: "PART_TIME", label: "Part Time" },
                      ]}
                      // onChange={(val) => setFieldValue("studyPace", val)}
                      // value={
                      //   values?.studyPace && values?.studyPace !== undefined
                      //     ? values?.studyPace
                      //     : undefined
                      // }
                    />
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>
          <div className="mt-4">
            <Collapse defaultActiveKey={["1"]} expandIconPosition="end">
              <Panel header="Course Guide" key="1">
                <div className="flex flex-col gap-2 mb-2">
                  <label
                    htmlFor=""
                    className="font-medium flex justify-between"
                  >
                    <span>Course Guide</span>
                    <span>
                      Upload:{" "}
                      <Switch
                        // onChange={(val) => setCourseFile(val)}
                        size="small"
                        // checked={courseFile}
                      />
                    </span>
                  </label>

                  <div>
                    <ImageInput
                    // onChange={(e: any) => {
                    //   setFieldValue("courseGuide", e?.data?.path);
                    // }}
                    // imageUrl={values?.courseGuide}
                    />
                  </div>
                  {/* {errors?.courseGuide && touched?.courseGuide ? (
                    <div className="text-danger">
                      {errors?.courseGuide as String}
                    </div>
                  ) : null} */}
                </div>
              </Panel>
            </Collapse>
          </div>
          <div className="mt-4">
            <Collapse
              defaultActiveKey={["1"]}
              onChange={(e: any) => console.log(e)}
              expandIconPosition="end"
            >
              <Panel
                header={
                  <div>
                    <span>Featured Image</span> <span>Ratio: 960 x 540</span>
                  </div>
                }
                key="1"
              >
                <div className="flex flex-col gap-2 mb-2">
                  <label htmlFor="" className="font-medium mr-1">
                    Feature Image
                  </label>

                  <div>
                    <ImageInput
                    // onChange={(e: any) => {
                    //   setFieldValue("featureImage", e?.data?.path);
                    // }}
                    // imageUrl={values?.featureImage}
                    />
                  </div>
                </div>
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
              <Panel header="Video" key="1">
                <div className="flex flex-col">
                  <label
                    htmlFor="guideVideo"
                    className="font-semibold flex items-center gap-1"
                  >
                    <span>YouTube Video Code</span>
                    <Popover
                      content={
                        <>
                          <img src="/images/misc/video-example.png" alt="" />
                        </>
                      }
                      arrow={false}
                      title=""
                      trigger="hover"
                    >
                      <button type="button">
                        <AiOutlineQuestionCircle />
                      </button>
                    </Popover>
                  </label>

                  <input
                    type="text"
                    name="guideVideo"
                    placeholder="Example: VpV5cyfzv5Y"
                    className="border mt-1 px-2 py-1"
                  />
                </div>

                {/* {values?.guideVideo && (
                  <div className="mt-4">
                    <iframe
                      title="Video Preview"
                      className="w-full aspect-video"
                      src={`https://www.youtube.com/embed/${values?.guideVideo}`}
                      allowFullScreen
                    ></iframe>
                  </div>
                )} */}

                <div className="mt-4">
                  <iframe
                    title="Video Preview"
                    className="w-full aspect-video"
                    // src={`https://www.youtube.com/embed/${values?.guideVideo}`}
                    allowFullScreen
                  ></iframe>
                </div>
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAddEdit;
