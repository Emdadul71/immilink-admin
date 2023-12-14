import { Input, Select, Switch, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactNode, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronRight, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

interface DataType {
  key: React.Key;
  name: string;
  email: string;
  tags: string;
  role: string;
  appointment: string;
  publishDate: string;
  publishTime?: string;
  date: string;
  participants?: any;
  // username: ReactNode;
  action?: ReactNode;
  events?: any;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "events",
    width: "1152px",
    render: (emdad, record) => {
      return (
        <Link to="/user/29" className="flex items-center gap-4">
          <div className="w-[30px] h-[30px] rounded shrink-0	">
            <img
              src={record?.events?.avatar}
              alt=""
              className="w-full h-full rounded object-cover"
            />
          </div>
          <span className="line-clamp-1">{record?.events?.name}</span>
        </Link>
      );
    },
  },

  {
    title: "Publish Date",
    dataIndex: "publishDate",
    render: (_, record) => {
      return <span className="line-clamp-1">{record?.publishDate}</span>;
    },
  },

  {
    title: "Action",
    dataIndex: "action",
    render: (emdad, record) => {
      return (
        <div className="flex items-center gap-3">
          <button className="text-base">
            <Switch size="small" defaultChecked />
          </button>
          <button>
            <FiEdit className="text-base" />
          </button>
          <button>
            <FiEye className="text-base" />
          </button>
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
    events: {
      name: "Learn how to master your communication skillsLearn how to master your communication skills",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    name: "Savannah Nguyen",
    email: "deanna.curtis@example.com",
    role: "Administrator",
    tags: "tags",
    date: "Feb 28, 2004",
    appointment: "23/03/2023",
    publishDate: "2020-05-02 07:10:15",
    participants: 651535,
  },
  {
    key: "2",
    events: {
      name: "Emdad Khan",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=81",
      designation: "Admin",
    },
    name: "Savannah Nguyen",
    email: "deanna.curtis@example.com",
    role: "Administrator",
    tags: "tags",
    date: "May 16, 2005",
    appointment: "23/03/2023",
    publishDate: "2020-05-02 07:10:15",
    participants: 267400,
  },
  {
    key: "3",
    events: {
      name: "Emdad Khan",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=81",
      designation: "Admin",
    },
    name: "Savannah Nguyen",
    email: "deanna.curtis@example.com",
    role: "Administrator",
    tags: "tags",
    date: "Sep 01, 2000",
    appointment: "23/03/2023",
    publishDate: "2020-05-02 07:10:15",
    participants: 267400,
  },
  {
    key: "4",
    events: {
      name: "Emdad Khan",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=81",
      designation: "Admin",
    },
    name: "Savannah Nguyen",
    email: "deanna.curtis@example.com",
    role: "Administrator",
    tags: "tags",
    date: "Aug 07, 2019",
    appointment: "23/03/2023",
    publishDate: "2020-05-02 07:10:15",
    participants: 267400,
  },
  {
    key: "5",
    events: {
      name: "Emdad Khan",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=81",
      designation: "Admin",
    },
    name: "Savannah Nguyen",
    email: "deanna.curtis@example.com",
    role: "Administrator",
    tags: "tags",
    date: "Aug 07, 2019",
    appointment: "23/03/2023",
    publishDate: "2020-05-02 07:10:15",
    participants: 267400,
  },
  {
    key: "6",
    events: {
      name: "Emdad Khan",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=81",
      designation: "Admin",
    },
    name: "Savannah Nguyen",
    email: "deanna.curtis@example.com",
    role: "Administrator",
    tags: "tags",
    date: "Aug 07, 2019",
    appointment: "23/03/2023",
    publishDate: "2020-05-02 07:10:15",
    participants: 267400,
  },
  {
    key: "7",
    events: {
      name: "Emdad Khan",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=81",
      designation: "Admin",
    },
    name: "Savannah Nguyen",
    email: "deanna.curtis@example.com",
    role: "Administrator",
    tags: "tags",
    date: "Aug 07, 2019",
    appointment: "23/03/2023",
    publishDate: "2020-05-02 07:10:15",
    participants: 267400,
  },
  {
    key: "8",
    events: {
      name: "Emdad Khan",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=81",
      designation: "Admin",
    },
    name: "Savannah Nguyen",
    email: "deanna.curtis@example.com",
    role: "Administrator",
    tags: "tags",
    date: "Aug 07, 2019",
    appointment: "23/03/2023",
    publishDate: "2020-05-02 07:10:15",
    participants: 267400,
  },
  {
    key: "9",
    events: {
      name: "Emdad Khan",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=81",
      designation: "Admin",
    },
    name: "Savannah Nguyen",
    email: "deanna.curtis@example.com",
    role: "Administrator",
    tags: "tags",
    date: "Aug 07, 2019",
    appointment: "23/03/2023",
    publishDate: "2020-05-02 07:10:15",
    participants: 267400,
  },
  {
    key: "10",
    events: {
      name: "Emdad Khan",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=81",
      designation: "Admin",
    },
    name: "Savannah Nguyen",
    email: "deanna.curtis@example.com",
    role: "Administrator",
    tags: "tags",
    date: "Aug 07, 2019",
    appointment: "23/03/2023",
    publishDate: "2020-05-02 07:10:15",
    participants: 267400,
  },
  {
    key: "11",
    events: {
      name: "Emdad Khan",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=81",
      designation: "Admin",
    },
    name: "Savannah Nguyen",
    email: "deanna.curtis@example.com",
    role: "Administrator",
    tags: "tags",
    date: "Aug 07, 2019",
    appointment: "23/03/2023",
    publishDate: "2020-05-02 07:10:15",
    participants: 267400,
  },
  {
    key: "12",
    events: {
      name: "Emdad Khan",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=81",
      designation: "Admin",
    },
    name: "Savannah Nguyen",
    email: "deanna.curtis@example.com",
    role: "Administrator",
    tags: "tags",
    date: "Aug 07, 2019",
    appointment: "23/03/2023",
    publishDate: "2020-05-02 07:10:15",
    participants: 267400,
  },
];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  // getCheckboxProps: (record: DataType) => ({
  //   disabled: record.name === "Disabled User", // Column configuration not to be checked
  //   name: record.name,
  // }),
};

const PopUpList = () => {
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

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <p>Dashboard</p>
        <FiChevronRight />
        <p>Pop Up</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Pop Up</h4>
        <div className="flex gap-3">
          <Link to="/pop-up/add" className="btn btn-secondary">
            Add New
          </Link>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>
      <div className="flex justify-between items-center mt-6 my-4  gap-[10px] ">
        <div className="flex gap-[10px]">
          <Select
            defaultValue="Bulk Action"
            style={{ width: 120 }}
            options={[
              { value: "lucy", label: "Lucy" },
              { value: "mizan", label: "Mizan" },
            ]}
          />

          <button className="border py-[3px] px-[15px] rounded-[4px]">
            Apply
          </button>

          <Select
            defaultValue="All Dates"
            style={{ width: 120 }}
            options={[
              { value: "lucy", label: "Lucy" },
              { value: "mizan", label: "Mizan" },
            ]}
          />

          <Select
            defaultValue="All Categories"
            style={{ width: 140 }}
            options={[
              { value: "lucy", label: "Lucy" },
              { value: "mizan", label: "Mizan" },
            ]}
          />

          <Select
            defaultValue="All Source"
            style={{ width: 140 }}
            options={[
              { value: "lucy", label: "Lucy" },
              { value: "mizan", label: "Mizan" },
            ]}
          />

          <button className="border py-[3px] px-[15px] rounded-[4px]">
            Filter
          </button>
        </div>

        <div className="w-3/12 relative">
          <Input
            type="text"
            // prefix={<BiSearch size={18} />}
            name=""
            id=""
            placeholder="Search Posts"
            className="border pl-8 pr-5 py-1 rounded-[4px] w-full"
          />
          <BiSearch
            size={18}
            className="absolute top-[50%]  translate-y-[-50%] left-2"
          />
        </div>
      </div>
      <div>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          pagination={paginationOptions}
        />
      </div>
    </div>
  );
};

export default PopUpList;
