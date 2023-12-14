import {
  DatePicker,
  Input,
  Modal,
  Popconfirm,
  Select,
  Table,
  message,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { Form, Formik } from "formik";
import moment from "moment";
import React, { ReactNode, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronRight, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  useDeleteEventMutation,
  useGetEventsQuery,
} from "../../../appstore/event/event_api";
const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

const { RangePicker } = DatePicker;
const rangePresets: {
  label: string;
  value: [Dayjs, Dayjs];
}[] = [
  { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
  { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
  { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
  { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
];

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  let customDate = moment().subtract(90, "days").format("YYYY-MM-DD");
  return current && current < moment(customDate);
};

interface DataType {
  key: React.Key;
  id: any;
  title: string;
  slug: string;
  featureImage: string;
  eventDate: string;
  publishDate: string;
  eventEndDate: string;
  _count?: any;
  action?: ReactNode;
  events?: any;
}

const Events = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [keyword, setKeyword] = useState<any>(null);
  const [filtered, setFiltered] = useState({
    startDate: null,
    endDate: null,
    status: "ACTIVE",
  });

  const { data, isFetching } = useGetEventsQuery({
    title: keyword,
    startDate: filtered?.startDate,
    endDate: filtered?.endDate,
    page: page,
    limit: limit,
    status: filtered?.status,
  });
  const [deletId] = useDeleteEventMutation();

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
  const confirm = async (id: any) => {
    try {
      const res: any = await deletId({
        type: "soft",
        id: id,
      });
      if (!res?.error) {
        message.success("Event delete successfully.");
      } else {
        if (res?.error?.status >= 500) {
          message.error("Somthing went wrong.");
        } else {
          message.error(
            `${
              res?.error?.data?.message
                ? res?.error?.data?.message
                : "Somthing went wrong"
            }`
          );
        }
      }
    } catch (err) {}
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "events",
      width: "520px",
      render: (_, record) => {
        return (
          <div className="flex items-center">
            <div className="w-[53px] h-[30px] rounded shrink-0	mr-1">
              <img
                src={record?.featureImage ?? "/images/misc/image-upload.png"}
                alt=""
                className="w-full h-full rounded object-contain"
                crossOrigin="anonymous"
              />
            </div>
            <span className="line-clamp-1">{record?.title}</span>
          </div>
        );
      },
    },
    {
      title: "Start Date",
      dataIndex: "publishDate",
      render: (_, record) => {
        return (
          <span className="line-clamp-1">
            {moment(record?.eventDate).format("LL")}
          </span>
        );
      },
    },
    {
      title: "End Date",
      dataIndex: "publishDate",
      render: (_, record) => {
        return (
          <span className="line-clamp-1">
            {record?.eventEndDate && moment(record?.eventEndDate).format("LL")}
          </span>
        );
      },
    },
    {
      title: "Participants",
      dataIndex: "participants",
      width: "420px",
      render: (_, record) => {
        return (
          <div>
            {record?._count?.participants > 0 ? (
              <Link
                to={`/events/${record?.slug}`}
                className="view_participant_btn line-clamp-1 px-2 py-1 inline rounded-full whatspace-nowrap"
              >
                Total participants {record?._count?.participants}
              </Link>
            ) : (
              <span className="view_participant_btn line-clamp-1 px-2 py-1 inline rounded-full whatspace-nowrap">
                Total participants {record?._count?.participants}
              </span>
            )}
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div className="flex items-center gap-3">
            <Link to={`/events/${record?.id}/edit`}>
              <FiEdit className="text-base" />
            </Link>
            <a target="_blank" href={`${frontendUrl}/events/${record.slug}`}>
              <FiEye className="text-base" />
            </a>
            <Popconfirm
              placement="top"
              title={<span>Are you sure to delete this task?</span>}
              description=" "
              onConfirm={() => confirm(record?.id)}
              okText={"Yes"}
              cancelText="No"
            >
              <button>
                <FiTrash2 className="text-base" />
              </button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <div className="mt-3 ">
      <div className="flex items-center gap-2">
        <p>Dashboard</p>
        <FiChevronRight />
        <p>Events</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Events</h4>
        <div className="flex gap-3">
          <Link to="/events/add" className="btn btn-secondary">
            Create event
          </Link>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>
      <div className="flex flex-wrap justify-between items-center mt-6 my-4  gap-[10px] ">
        <div className="flex  gap-[10px]">
          <div className="flex items-center gap-2">
            <Formik
              initialValues={{
                startDate: null,
                endDate: null,
                category: "",
              }}
              enableReinitialize={false}
              onSubmit={(values: any, actions: any) => {
                setFiltered({
                  startDate: values?.startDate,
                  endDate: values?.endDate,
                  status: values?.status,
                });
              }}
            >
              {({
                handleSubmit,
                setFieldValue,
                errors,
                values,
                touched,
              }: any) => (
                <Form>
                  <div className="flex flex-wrap gap-2">
                    <div>
                      <RangePicker
                        presets={rangePresets}
                        onChange={(_, dateString) => {
                          setFieldValue("startDate", dateString[0]);
                          setFieldValue("endDate", dateString[1]);
                        }}
                        disabledDate={disabledDate}
                        className="min-h-[35px]"
                      />
                    </div>
                    <Select
                      placeholder={"Select Status"}
                      className="min-w-[150spx]"
                      style={{ width: 120 }}
                      onChange={(val) => setFieldValue("status", val)}
                      options={[
                        { value: "ACTIVE", label: "Active" },
                        // { value: "INACTIVE", label: "Inactive" },
                        { value: "DRAFT", label: "Draft" },
                        // { value: "PUBLIC", label: "Public" },
                        // { value: "PENDING", label: "Pending" },
                        // { value: "REJECTED", label: "Rejected" },
                      ]}
                    />
                    <button className="border py-[3px] px-[15px] rounded-[4px]">
                      Filter
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <div className="w-full md:w-[50%] lg:w-3/12 relative">
          <Input
            type="text"
            placeholder="Search Keywords"
            className="border pl-8 pr-5 py-1 rounded-[4px] w-full"
            onChange={(e) => setKeyword(e.target.value)}
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
          pagination={paginationOptions}
          loading={isFetching}
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

export default Events;
