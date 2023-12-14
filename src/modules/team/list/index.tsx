import {
  useDeleteTeamMutation,
  useGetTeamQuery,
} from "@/appstore/team/team_api";
import { Input, Popconfirm, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactNode, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronRight, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

interface DataType {
  key: React.Key;
  id: any;
  slug: string;
  name: string;
  level: any;
  profileImage: string;
  email: string;
  phone: string;
  action: ReactNode;
}

const TeamList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchString, setSearchString] = useState("");

  const { data, isFetching } = useGetTeamQuery({
    name: searchString,
    page: page,
    limit: limit,
  });

  const [deletId] = useDeleteTeamMutation<any>();

  const confirm = async (id: any) => {
    try {
      const res: any = await deletId({
        type: "soft",
        id: id,
      });
      if (!res?.error) {
        message.success("Team delete successfully.");
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
    total: data?.totalCount,
    showTotal: (total: number, range: any) =>
      `${range[0]} to ${range[1]} of ${total}`,
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) => {
        return (
          <div className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] overflow-hidden rounded-full shrink-0	">
              <img
                crossOrigin="anonymous"
                src={
                  record.profileImage
                    ? record.profileImage
                    : "/images/misc/user-avatar.png"
                }
                alt=""
                className="w-full h-full rounded object-contain"
              />
            </div>
            <span className="line-clamp-1">{record?.name}</span>
          </div>
        );
      },
    },

    {
      title: "Email",
      dataIndex: "email",
      render: (_, record) => {
        return <span className="line-clamp-1">{record?.name}</span>;
      },
    },
    {
      title: "Level",
      dataIndex: "email",
      render: (_, record) => {
        return <span className="line-clamp-1">{record?.level?.name}</span>;
      },
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
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
            <Link to={`/team/${record?.id}/edit`}>
              <FiEdit className="text-base" />
            </Link>
            <a target="_blank" href={`${frontendUrl}/team/${record.slug}`}>
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
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <p>Dashboard</p>
        <FiChevronRight />
        <p>Team</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Team</h4>

        <Link to="/team/add" className="btn btn-secondary">
          <span>ADD NEW</span>
        </Link>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>
      <div className="flex justify-between items-center mt-6 my-4  gap-[10px] ">
        <div className="w-full md:6/12 lg:w-3/12 relative">
          <Input
            type="text"
            placeholder="Search Teams"
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
          rowKey={`id`}
          columns={columns}
          dataSource={data?.data}
          pagination={paginationOptions}
          loading={isFetching}
        />
      </div>
    </div>
  );
};

export default TeamList;
