import { Divider, Input, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactNode, useState } from "react";
import { BiComment, BiSearch } from "react-icons/bi";
import { FiChevronRight, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

interface DataType {
  key: React.Key;
  title: ReactNode;
  author: string;
  categories: string;
  publishDate: string;
  action: ReactNode;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "title",
    width: "416px",
  },
  {
    title: "Author",
    dataIndex: "author",
  },
  {
    title: "Album Categories",
    dataIndex: "categories",
  },
  {
    title: "Published Date",
    dataIndex: "publishDate",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const data: DataType[] = [
  {
    key: "1",
    title: (
      <Link to="#" className="flex items-center gap-4">
        <div className="w-[30px] h-[30px] rounded shrink-0	">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt=""
            className="w-full h-full rounded object-cover"
          />
        </div>
        <span className="line-clamp-1">
          How to design a product that can grow itself 10x in year: ow to design
          a product that can grow itself 10x in year: design a product that can
          grow itself 10x in year: How to design a product that can grow itself
          10x in year: How to design a product that can grow itself 10x in year
        </span>
      </Link>
    ),
    author: "Author",
    categories: "Hospitality",
    publishDate: "2020-05-02 07:10:15",
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
  },
  {
    key: "2",
    title: (
      <Link to="#" className="flex items-center gap-4">
        <div className="w-[30px] h-[30px] rounded">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt=""
            className="w-full h-full rounded object-cover"
          />
        </div>
        <span>Savannah Nguyen</span>
      </Link>
    ),
    author: "Author",
    categories: "Commercial Cookery",
    publishDate: "2020-05-02 07:10:15",
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
  },
  {
    key: "3",
    title: (
      <Link to="#" className="flex items-center gap-4">
        <div className="w-[30px] h-[30px] rounded">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt=""
            className="w-full h-full rounded object-cover"
          />
        </div>
        <span>Savannah Nguyen</span>
      </Link>
    ),
    author: "Author",
    categories: "Hospitality",
    publishDate: "2020-05-02 07:10:15",
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
  },
  {
    key: "4",
    title: (
      <Link to="#" className="flex items-center gap-4">
        <div className="w-[30px] h-[30px] rounded">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt=""
            className="w-full h-full rounded object-cover"
          />
        </div>
        <span>Savannah Nguyen</span>
      </Link>
    ),
    author: "Author",
    categories: "Commercial Cookery",
    publishDate: "2020-05-02 07:10:15",
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
  },
  {
    key: "5",
    title: (
      <Link to="#" className="flex items-center gap-4">
        <div className="w-[30px] h-[30px] rounded">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt=""
            className="w-full h-full rounded object-cover"
          />
        </div>
        <span>Savannah Nguyen</span>
      </Link>
    ),
    author: "Author",
    categories: "Hospitality",
    publishDate: "2020-05-02 07:10:15",
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
  },
  {
    key: "6",
    title: (
      <Link to="#" className="flex items-center gap-4">
        <div className="w-[30px] h-[30px] rounded">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt=""
            className="w-full h-full rounded object-cover"
          />
        </div>
        <span>Savannah Nguyen</span>
      </Link>
    ),
    author: "Author",
    categories: "Commercial Cookery",
    publishDate: "2020-05-02 07:10:15",
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
  },
  {
    key: "7",
    title: (
      <Link to="#" className="flex items-center gap-4">
        <div className="w-[30px] h-[30px] rounded">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt=""
            className="w-full h-full rounded object-cover"
          />
        </div>
        <span>Savannah Nguyen</span>
      </Link>
    ),
    author: "Author",
    categories: "Hospitality",
    publishDate: "2020-05-02 07:10:15",
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
  },
  {
    key: "8",
    title: (
      <Link to="#" className="flex items-center gap-4">
        <div className="w-[30px] h-[30px] rounded">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt=""
            className="w-full h-full rounded object-cover"
          />
        </div>
        <span>Savannah Nguyen</span>
      </Link>
    ),
    author: "Author",
    categories: "Commercial Cookery",
    publishDate: "2020-05-02 07:10:15",
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

const PhotoAlbum = () => {
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
        <p>Photo Album</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Photo Album</h4>

        <Link to="#" className="btn btn-secondary">
          <span>ADD NEW</span>
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

export default PhotoAlbum;
