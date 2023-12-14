import { Input, Select, message, Table, Popconfirm, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactNode, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronRight, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useLazyGetSingleUserQuery,
} from "../../../appstore/user/user_api";
import UserForm from "../@components/user_form";

interface DataType {
  key: React.Key;
  id: any;
  name: string;
  email: string;
  tags: string;
  role: string;
  appointment: string;
  publishDate: string;
  publishTime: string;
  action?: ReactNode;
  user?: any;
}

const UserList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [keyword, setKeyword] = useState("");
  const { data, isFetching } = useGetUsersQuery({
    name: keyword,
    page: page,
    limit: limit,
  });

  console.log("data", data);

  const [userId, {}] = useLazyGetSingleUserQuery();

  const [deletId] = useDeleteUserMutation<any>();

  const confirm = async (id: any) => {
    try {
      const res: any = await deletId({
        type: "soft",
        id: id,
      });
      if (!res?.error) {
        message.success("User delete successfully.");
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

  useEffect(() => {
    if (isModalOpen == false) {
      setEditData(null);
    }
  }, [isModalOpen]);

  const getSingleUser = async (id: any) => {
    userId({ id: id })
      .then((res: any) => {
        if (res?.data) {
          setEditData(res?.data);
          setIsModalOpen(true);
        }
      })
      .catch((e) => console.log(e));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) => {
        return (
          <Link to="#">
            <span className="line-clamp-1">{record?.name}</span>
          </Link>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (_, record) => {
        return (
          <Link to="#">
            <span className="line-clamp-1">{record?.email}</span>
          </Link>
        );
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <div className="flex items-center gap-3">
            <button onClick={() => getSingleUser(record?.id)}>
              <FiEdit className="text-base" />
            </button>
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
        <p>Users</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Users</h4>

        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          ADD NEW
        </button>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>
      <div className="flex justify-between items-center mt-6 my-4  gap-[10px] ">
        <div className="w-3/12 relative">
          <Input
            type="text"
            id=""
            placeholder="Search Posts"
            className="border pl-8 pr-5 py-1 rounded-[4px] w-full"
            onChange={(e: any) => setKeyword(e.target.value)}
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
          loading={isFetching}
          dataSource={data?.newData}
          pagination={paginationOptions}
        />
      </div>

      <Modal
        title={
          <div className="flex items-center gap-2 px-6 py-4 border-b">
            <span>{editData ? "EDIT" : "ADD NEW"} USER</span>
          </div>
        }
        open={isModalOpen}
        width={"100%"}
        style={{ maxWidth: 825, width: "100%", padding: 0 }}
        onCancel={handleCancel}
        footer={false}
      >
        <UserForm editData={editData} handleCancel={handleCancel} />
      </Modal>
    </div>
  );
};

export default UserList;
