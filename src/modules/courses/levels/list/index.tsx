import BreadCrumb from "@/modules/@common/breadcrumb";
import Title from "@/modules/@common/title";
import { Input, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronRight, FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import moment from "moment";
import { RangePickerProps } from "antd/es/date-picker";
import { DatePicker } from "antd";

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  let customDate = moment().subtract(90, "days").format("YYYY-MM-DD");
  return current && current < moment(customDate);
};
interface DataType {
  key: React.Key;
  name: any;
  provider: any;
  level: any;
  duration: any;
}

const breadcrumbData = [
  {
    title: "Dashboard",
    link: "/dashboard",
  },

  {
    title: "Course Level",
    link: "",
  },
];
const { RangePicker } = DatePicker;

const columns: ColumnsType<DataType> = [
  {
    title: "Level Title",
    dataIndex: "name",
  },
  {
    title: "Slug",
    dataIndex: "provider",
  },
  {
    title: "Meta Keyword	",
    dataIndex: "level",
  },
  {
    title: "Status",
    dataIndex: "duration",
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_, record) => {
      return (
        <div className="flex items-center gap-3">
          <Link to="#">
            <FiEdit className="text-base" />
          </Link>

          <button>
            <FiTrash2 className="text-base" />
          </button>
        </div>
      );
    },
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "Advanced Diploma of Accounting",
    provider: "	Crown Institute of Business and Technology Pty Ltd",
    level: "Advanced Diploma",
    duration: "36",
  },
  {
    key: "2",
    name: "Advanced Diploma of Building and Construction (Management)",
    provider: "	Canberra Institute of Technology",
    level: "Advanced Diploma",
    duration: "36",
  },
  {
    key: "3",
    name: "Advanced Diploma of Christian Ministry and Theology",
    provider: "	Canberra Institute of Technology",
    level: "Advanced Diploma",
    duration: "36",
  },
  {
    key: "4",
    name: "Advanced Diploma of Christian Ministry and Theology",
    provider: "	C3 Church Sydney Ltd",
    level: "Advanced Diploma",
    duration: "36",
  },
];
const CourseLevelList = () => {
  return (
    <div>
      <BreadCrumb data={breadcrumbData} />

      <div className="flex justify-between items-center mt-4">
        <Title title="Course Level" />

        <Link to="#" className="btn btn-secondary">
          <span>ADD NEW</span>
        </Link>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>
      <div className="flex  justify-end lg:flex-row justify-end items-center mt-6 my-4  gap-[10px] ">
        <div className="lg:w-3/12 w-full relative">
          <Input
            type="text"
            placeholder="Search Course Level"
            className="border pl-8 pr-5 py-1 rounded-[4px] w-full"
            // onChange={(e) => setKeyword(e.target.value)}
          />
          <BiSearch
            size={18}
            className="absolute top-[50%]  translate-y-[-50%] left-2"
          />
        </div>
      </div>

      <div className="overflow-auto">
        <Table
          rowKey={`id`}
          //   loading={isFetching}
          columns={columns}
          dataSource={data}
          //   pagination={paginationOptions}
        />
      </div>
    </div>
  );
};

export default CourseLevelList;
