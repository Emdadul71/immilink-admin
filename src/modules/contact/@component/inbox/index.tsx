import { Input, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

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
    key: "2",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "3",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "4",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "5",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "6",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "7",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "8",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "9",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "10",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "11",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "12",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "13",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "14",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
  {
    key: "15",
    title: "elit laborum. ",
    description:
      "Practise Exam Papers - Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    time: "5:45 am",
  },
];

const Inbox = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);

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
    // total: allPosts?.meta?.total,
    showTotal: (total: number, range: any) =>
      `${range[0]} to ${range[1]} of ${total}`,
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="relative h-full overflow-auto">
      {selectedRowKeys?.length > 0 && (
        <div className="w-[36px] h-[36px] hover:bg-[#FFE835] transition-all	  flex items-center justify-center rounded-full absolute top-[10px] left-[50px] z-[50] cursor-pointer">
          <RiDeleteBin6Line />
        </div>
      )}

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
        rowSelection={rowSelection}
        className="border contact_table"
        columns={columns}
        dataSource={data}
        pagination={paginationOptions}
      />
    </div>
  );
};

export default Inbox;
