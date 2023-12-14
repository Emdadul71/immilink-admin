import { useGetContactsQuery } from "@/appstore/contact/contact_api";
import { DatePicker, Input, Modal, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";
import LeadExport from "../@component/export";

interface DataType {
  key: React.Key;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: any;
  subject?: any;
  message?: any;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    width: "250px",
    render: (_, record) => {
      return (
        <span className="line-clamp-1">{`${record?.firstName} ${record?.lastName}`}</span>
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
    title: "Subject",
    dataIndex: "subject",
    width: "250px",
    render: (_, record) => {
      return <span className="line-clamp-1">{record?.subject}</span>;
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
    title: "Message",
    dataIndex: "message",
    render: (_, record) => {
      return <span className="line-clamp-1">{record?.message}</span>;
    },
  },
];

const ContactList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [searchString, setSearchString] = useState();

  const { data, isFetching } = useGetContactsQuery({
    page,
    limit,
    email: searchString,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exportDrawer, setExportDrawer] = useState(false);

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
        <p>Contacts</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4></h4>
        <div className="flex gap-3">
          <button
            onClick={() => setExportDrawer(true)}
            className="btn btn-secondary"
          >
            Export
          </button>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>
      <div className="flex justify-between items-center mt-6 my-4  gap-[10px] ">
        <div className="w-full md:w-6/12 lg:w-3/12 relative">
          <Input
            type="text"
            placeholder="Search contacts by Email"
            className="border pl-8 pr-5 py-1 rounded-[4px] w-full"
            onChange={(e: any) => {
              setSearchString(e?.target?.value);
            }}
            value={searchString ?? ""}
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
      {/* <div>
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
      </div> */}

      <div>
        <LeadExport
          exportDrawer={exportDrawer}
          setExportDrawer={setExportDrawer}
        />
      </div>
    </div>
  );
};

export default ContactList;
