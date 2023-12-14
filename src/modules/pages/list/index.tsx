import { Input, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactNode, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronRight, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

interface DataType {
  key: React.Key;
  title: string;
  source: string;
  categories: string;
  tags: string;
  date: string;
  time: string;
  align: string;
  action: ReactNode;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Title",
    dataIndex: "title",
    width: "900px",
    ellipsis: true,
    render: (text: string) => <a>{text}</a>,
  },

  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Time",
    dataIndex: "time",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const data: DataType[] = [
  {
    key: "1",
    title: "elit laborum. ",
    source: "Prothom alo",
    categories: "রাজনীতি",
    tags: "tags",
    date: "23/03/2023",
    time: "12:01 pm",
    action: (
      <div className="flex items-center gap-3">
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
    ),
    align: "right",
  },
  {
    key: "2",
    title:
      "FACEBOOK - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    source: "Prothom alo",
    categories: "রাজনীতি",
    tags: "tags",
    date: "23/03/2023",
    time: "12:01 pm",
    action: (
      <div className="flex items-center gap-3">
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
    ),
    align: "right",
  },
  {
    key: "3",
    title: "Joe Black",
    source: "Prothom alo",
    categories: "রাজনীতি",
    tags: "tags",
    date: "23/03/2023",
    time: "12:01 pm",
    action: (
      <div className="flex items-center gap-3">
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
    ),
    align: "right",
  },
  {
    key: "4",
    title: "Joe Black",
    source: "Prothom alo",
    categories: "রাজনীতি",
    tags: "tags",
    date: "23/03/2023",
    time: "12:01 pm",
    action: (
      <div className="flex items-center gap-3">
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
    ),
    align: "right",
  },
  {
    key: "5",
    title: "Joe Black",
    source: "Prothom alo",
    categories: "রাজনীতি",
    tags: "tags",
    date: "23/03/2023",
    time: "12:01 pm",
    action: (
      <div className="flex items-center gap-3">
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
    ),
    align: "right",
  },
  {
    key: "6",
    title: "Joe Black",
    source: "Prothom alo",
    categories: "রাজনীতি",
    tags: "tags",
    date: "23/03/2023",
    time: "12:01 pm",
    action: (
      <div className="flex items-center gap-3">
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
    ),
    align: "right",
  },
  {
    key: "7",
    title: "Joe Black",
    source: "Prothom alo",
    categories: "রাজনীতি",
    tags: "tags",
    date: "23/03/2023",
    time: "12:01 pm",
    action: (
      <div className="flex items-center gap-3">
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
    ),
    align: "right",
  },
  {
    key: "8",
    title: "Joe Black",
    source: "Prothom alo",
    categories: "রাজনীতি",
    tags: "tags",
    date: "23/03/2023",
    time: "12:01 pm",
    action: (
      <div className="flex items-center gap-3">
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
    ),
    align: "right",
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

const PageList = () => {
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
        <p>Pages</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Pages</h4>

        <Link to="/page/add" className="btn btn-secondary">
          ADD NEW
        </Link>
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

export default PageList;
