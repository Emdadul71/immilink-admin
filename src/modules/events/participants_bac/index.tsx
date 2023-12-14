import { DatePicker, Input, Modal, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactNode, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronRight, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

interface DataType {
  key: React.Key;
  name?: string;
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
    render: (emdad, record) => {
      return (
        <Link to="/user/29" className="flex items-center gap-4">
          <span className="line-clamp-1">{record?.events?.name}</span>
        </Link>
      );
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    width: "250px",
    render: (_, record) => {
      return (
        <Link to="/user/29" className="flex items-center gap-4">
          <span className="line-clamp-1">{record?.email}</span>
        </Link>
      );
    },
  },
  {
    title: "Country",
    dataIndex: "country",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
    render: (emdad, record) => {
      return (
        <Link to="/user/29" className="flex items-center gap-[5px]">
          <div className="w-[16px] h-[16px] rounded-full shrink-0	">
            <img
              src={record?.mobile?.avatar}
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className="line-clamp-1">{record?.mobile?.contact}</span>
        </Link>
      );
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
    title: "Intake",
    dataIndex: "intake",
  },
  {
    title: "Study Level",
    dataIndex: "studyLevel",
  },
  {
    title: "Funding",
    dataIndex: "funding",
  },
  {
    title: "Subject",
    dataIndex: "subject",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
  },
];

const data: DataType[] = [
  {
    key: "1",
    events: {
      name: "Emdad Khan ",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=81",
      designation: "Admin",
    },
    name: "Savannah Nguyen",
    email: "deanna.curtis@example.com ",
    country: "Japan",
    mobile: {
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      contact: "(684) 555-0102",
    },
    preferredCountry: "Austria",
    intake: "Jan",
    studyLevel: "Undergraduate",
    funding: "Parents",
    subject: "BBS",
    createdAt: "2020-05-03",
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
    country: "Japan",
    mobile: {
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      contact: "(684) 555-0102",
    },
    preferredCountry: "Austria",
    intake: "May",
    studyLevel: "Undergraduate",
    funding: "Education Loans",
    subject: "BBS",
    createdAt: "2020-05-03",
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
    country: "Kenya",
    preferredCountry: "Austria",
    intake: "May",
    mobile: {
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      contact: "(684) 555-0102",
    },
    studyLevel: "Undergraduate",
    funding: "Self-funded",
    subject: "BBS",
    createdAt: "2020-05-03",
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
    country: "Botswana",
    preferredCountry: "Austria",
    intake: "May",
    mobile: {
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      contact: "(684) 555-0102",
    },
    studyLevel: "Undergraduate",
    funding: " Self-funded",
    subject: "BBS",
    createdAt: "2020-05-03",
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
    country: "Botswana",
    preferredCountry: "Austria",
    intake: "May",
    mobile: {
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      contact: "(684) 555-0102",
    },
    studyLevel: "Undergraduate",
    funding: " Self-funded",
    subject: "BBS",
    createdAt: "2020-05-03",
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
    country: "Botswana",
    preferredCountry: "Austria",
    intake: "May",
    mobile: {
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      contact: "(684) 555-0102",
    },
    studyLevel: "Undergraduate",
    funding: " Self-funded",
    subject: "BBS",
    createdAt: "2020-05-03",
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
    country: "Botswana",
    preferredCountry: "Austria",
    intake: "May",
    mobile: {
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      contact: "(684) 555-0102",
    },
    studyLevel: "Undergraduate",
    funding: " Self-funded",
    subject: "BBS",
    createdAt: "2020-05-03",
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
    country: "Botswana",
    preferredCountry: "Austria",
    intake: "May",
    mobile: {
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      contact: "(684) 555-0102",
    },
    studyLevel: "Undergraduate",
    funding: " Self-funded",
    subject: "BBS",
    createdAt: "2020-05-03",
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
    country: "Botswana",
    preferredCountry: "Austria",
    intake: "May",
    mobile: {
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      contact: "(684) 555-0102",
    },
    studyLevel: "Undergraduate",
    funding: " Self-funded",
    subject: "BBS",
    createdAt: "2020-05-03",
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
    country: "Botswana",
    preferredCountry: "Austria",
    intake: "May",
    mobile: {
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      contact: "(684) 555-0102",
    },
    studyLevel: "Undergraduate",
    funding: " Self-funded",
    subject: "BBS",
    createdAt: "2020-05-03",
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
    country: "Botswana",
    preferredCountry: "Austria",
    intake: "May",
    mobile: {
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      contact: "(684) 555-0102",
    },
    studyLevel: "Undergraduate",
    funding: " Self-funded",
    subject: "BBS",
    createdAt: "2020-05-03",
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
    country: "Botswana",
    preferredCountry: "Austria",
    intake: "May",
    mobile: {
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      contact: "(684) 555-0102",
    },
    studyLevel: "Undergraduate",
    funding: " Self-funded",
    subject: "BBS",
    createdAt: "2020-05-03",
  },
];

const Participants = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        <p>Events</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Total Participants</h4>
        <div className="flex gap-3">
          <button onClick={showModal} className="btn btn-secondary">
            Export
          </button>
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
          columns={columns}
          dataSource={data}
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

export default Participants;
