import { Input, Table } from "antd";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import React, { ReactNode, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";

interface DataType {
  key: React.Key;
  title?: string;
  description?: string;
  time?: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "",
    dataIndex: "title",
    width: "15%",
    ellipsis: true,
    render: (emdad, record) => {
      return (
        <div className="flex items-center gap-5">
          <div className="cursor-pointer">
            <FaRegStar className="text-base" />
          </div>
          <Link to="/contact/29" className="flex items-center gap-4">
            <span className="line-clamp-1">{record?.title}</span>
          </Link>
        </div>
      );
    },
  },
  {
    title: "",
    dataIndex: "description",
    width: "72%",
    render: (_, record) => {
      return (
        <Link to="/contact/29" className="flex items-center gap-4">
          <span className="line-clamp-1">{record?.description}</span>
        </Link>
      );
    },
  },
  {
    title: "",
    dataIndex: "time",
    ellipsis: true,
    render: (_, record) => {
      return (
        <Link to="/contact/29" className="flex items-center justify-end gap-4">
          <span className="line-clamp-1">{record?.time}</span>
        </Link>
      );
    },
  },
];

const data: DataType[] = [
  {
    key: "1",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "1",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "1",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "1",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "1",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "1",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "1",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "1",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "1",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {},
  // getCheckboxProps: (record: DataType) => ({
  //   disabled: record.name === "Disabled User", // Column configuration not to be checked
  //   name: record.name,
  // }),
};
const Marked = () => {
  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox"
  );
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  //  Pagination
  const paginationOptions = {
    showSizeChanger: true,
    showQuickJumper: true,
    defaultPageSize: limit,
    current: page,
    onChange: (page: any) => {
      setPage(page);
    },
    onShowSizeChange: (_: any, showItem: any) => {
      setLimit(showItem);
    },
    pageSizeOptions: [10, 20, 30, 50],
    // total: data?.totalItems,
    showTotal: (total: number, range: any) =>
      `${range[0]} to ${range[1]} of ${total}`,
  };
  return (
    <div className="relative">
      <div className="w-3/12 absolute top-[12px] right-[20px] z-[50]">
        <Input
          type="text"
          // prefix={<BiSearch size={18} />}
          name=""
          id=""
          placeholder="Search Mail"
          className="border pl-8 pr-5 py-1 rounded-[4px] w-full"
        />
        <BiSearch
          size={18}
          className="absolute top-[50%]  translate-y-[-50%] left-2"
        />
      </div>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        className="border contact_table"
        columns={columns}
        dataSource={data}
        pagination={paginationOptions}
      />
    </div>
  );
};

export default Marked;
