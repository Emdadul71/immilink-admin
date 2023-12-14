import { useGetParticipantedUserQuery } from "@/appstore/event/event_api";
import { DatePicker, Input, Modal, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactNode, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronRight, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface DataType {
  key: React.Key;
  firstName?: string;
  lastName?: string;
  preferredStudyLevel?: string;
  email?: string;
  country?: string;
  preferredCountry?: any;
  intake?: any;
  action?: ReactNode;
  mobile?: any;
  events?: any;
  subject?: any;
  studyLevel?: any;
  funding?: any;
  createdAt?: any;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "events",
    width: "180px",
    render: (_, record) => {
      return (
        <span
          className="line-clamp-1"
          title={`${record?.firstName} ${record?.lastName}`}
        >{`${record?.firstName} ${record?.lastName}`}</span>
      );
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    width: "250px",
    render: (_, record) => {
      return <span className="line-clamp-1">{record?.email}</span>;
    },
  },
  {
    title: "Country",
    dataIndex: "country",
    render: (_, record) => {
      return <span className="line-clamp-1">{record?.preferredCountry}</span>;
    },
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
    render: (_, record) => {
      return <span className="line-clamp-1">{record?.mobile}</span>;
    },
  },
  {
    title: "Preferred Country",
    dataIndex: "preferredCountry",
    render: (_, record) => {
      return <span className="line-clamp-1">{record?.preferredCountry}</span>;
    },
  },
  {
    title: "Study Level",
    dataIndex: "studyLevel",
    render: (_, record) => {
      return (
        <span className="line-clamp-1">{record?.preferredStudyLevel}</span>
      );
    },
  },
  {
    title: "Funding",
    dataIndex: "funding",
    render: (_, record) => {
      return <span className="line-clamp-1">{record?.funding}</span>;
    },
  },
];

const ParticipantedUser = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const params = useParams();

  const { slug } = params;

  const { data, isFetching } = useGetParticipantedUserQuery({
    slug,
    leadType: "Event",
    page,
    limit,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
    total: data?.totalCount,
    showTotal: (total: number, range: any) =>
      `${range[0]} to ${range[1]} of ${total}`,
  };

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <p>Dashboard</p>
        <FiChevronRight />
        <p>Events </p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">{data?.eventName?.title}</h4>
        <div className="flex gap-3">
          <button className="btn btn-secondary">Export</button>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>
      <div className="flex justify-between items-center mt-6 my-4  gap-[10px] ">
        <div className="w-3/12 relative">
          <Input
            type="text"
            placeholder="Search Posts"
            className="border pl-8 pr-5 py-1 rounded-[4px] w-full"
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
          columns={columns}
          dataSource={data?.data}
          loading={isFetching}
          pagination={paginationOptions}
        />
      </div>
      <div>
        <Modal
          title={
            <div className="flex items-center gap-2 px-6 py-4 border-b">
              <span>Export Leads</span>
            </div>
          }
          open={isModalOpen}
          width={"100%"}
          style={{ maxWidth: 512, width: "100%", padding: 0 }}
          onCancel={handleCancel}
          footer={false}
        >
          <div className="px-6 py-4">
            <form action="#">
              <div className="grid grid-cols-1 gap-x-8 gap-y-5">
                <div className="w-full">
                  <label htmlFor="">Name</label>
                  <DatePicker.RangePicker style={{ width: "100%" }} />
                </div>

                <div className="w-full">
                  <label htmlFor="slug">Offset</label>

                  <input
                    name="slug"
                    type="text"
                    className=" border px-3 py-1 w-full"
                    placeholder="0"
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="slug">Limit</label>

                  <input
                    name="slug"
                    type="text"
                    className=" border px-3 py-1 w-full"
                    placeholder="100"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button className="btn btn-grey" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button
                    className="btn btn-secondary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Export
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ParticipantedUser;
