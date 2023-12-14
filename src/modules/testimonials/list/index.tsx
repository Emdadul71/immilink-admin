import {
  useDeleteTestimonialMutation,
  useGetAllTestimonialQuery,
} from "@/appstore/testimonial/testimonial_api";
import { Input, Popconfirm, Select, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Form, Formik } from "formik";
import React, { ReactNode, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronRight, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { initialValue, validationSchema } from "../utils";
import { excerpt } from "@/helpers/utils";

interface DataType {
  key: React.Key;
  alt: string;
  name: string;
  message: string;
  country: string;
  picture: string;
  id?: number;
  rating?: number;
  orderPosition?: number;
}

const TestimonialList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchString, setSearchString] = useState("");

  const { data, isFetching } = useGetAllTestimonialQuery({
    page,
    limit,
    name: searchString,
  });

  const [deletId] = useDeleteTestimonialMutation();

  const confirm = async (id: any) => {
    try {
      const res: any = await deletId({
        id: id,
      });
      if (!res?.error) {
        message.success("Testimonial delete successfully.");
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

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",

      render: (_, record) => {
        return (
          <div className="flex items-center">
            <div className="w-[53px] h-[30px] rounded shrink-0	mr-1">
              <img
                src={record?.picture ?? "/images/misc/user-avatar.png"}
                alt=""
                className="w-full h-full rounded object-contain"
                crossOrigin="anonymous"
              />
            </div>
            <span className="line-clamp-1">{record?.name}</span>
          </div>
        );
      },
    },
    {
      title: "Message",
      dataIndex: "message",

      render: (_, record) => {
        return <span className="line-clamp-1">{excerpt(record?.message)}</span>;
      },
    },
    {
      title: "Country",
      dataIndex: "country",
      render: (_, record) => {
        return <span className="line-clamp-1">{record?.country}</span>;
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      render: (_, record) => {
        return <span className="line-clamp-1">{record?.rating}</span>;
      },
    },
    {
      title: "Order Position",
      dataIndex: "orderPosition",
      render: (_, record) => {
        return <span className="line-clamp-1">{record?.orderPosition}</span>;
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div className="flex items-center  gap-3">
            <Link to={`/testimonial/${record?.id}/edit`}>
              <FiEdit className="text-base" />
            </Link>
            <Popconfirm
              placement="top"
              title={<span>Are you sure to delete this task?</span>}
              description=" "
              onConfirm={() => confirm(record?.id)}
              okText="Yes"
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
    <div className="">
      <div className="pt-3 sticky top-[65px] z-10 bg-white">
        <div className="sticky top-[65px] bg-white">
          <div className="flex items-center gap-2">
            <p>Dashboard</p>
            <FiChevronRight />
            <p>Testimonials</p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <h4 className="text-primary">Testimonials</h4>

            <Link to="/testimonial/add" className="btn btn-secondary">
              ADD NEW
            </Link>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>
      </div>

      <div className="flex justify-between items-center mt-6 my-4  gap-[10px] ">
        <div className="w-full md:6/12 lg:w-3/12 relative">
          <Input
            type="text"
            placeholder="Search by Name"
            className="border pl-8 pr-5 py-1 rounded-[4px] w-full"
            onChange={(e: any) => setSearchString(e.target.value)}
          />
          <BiSearch
            size={18}
            className="absolute top-[50%]  translate-y-[-50%] left-2"
          />
        </div>
      </div>

      <div className="overflow-auto">
        <Table
          columns={columns}
          dataSource={data?.data}
          loading={isFetching}
          pagination={paginationOptions}
        />
      </div>
    </div>
  );
};

export default TestimonialList;
