import {
  useDeleteDesignationMutation,
  useGetAllDesignationQuery,
  useLazyGetSingleDesignationQuery,
} from "@/appstore/user/designation/designation_api";
import { Input, Modal, Popconfirm, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactNode, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronRight, FiEdit, FiTrash2 } from "react-icons/fi";
import DesignationForm from "../@components/designation_form";

interface DataType {
  key: React.Key;
  name: string;
  title: string;
  description: string;
  group: ReactNode;
  slug: string;
  totalCount: number;
  action: ReactNode;
  id?: any;
}

const DesignationList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);

  const [editData, setEditData] = useState<any>(null);
  const [designationId, {}] = useLazyGetSingleDesignationQuery();

  const { data, isFetching } = useGetAllDesignationQuery({
    title: keyword,
    page,
    limit,
  });
  useEffect(() => {
    if (isModalOpen == false) {
      setEditData(null);
    }
  }, [isModalOpen]);
  const [deletId] = useDeleteDesignationMutation();

  const confirm = async (id: any) => {
    try {
      const res: any = await deletId({
        id: id,
      });
      if (!res?.error) {
        message.success("Designation delete successfully.");
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

  const getSingleDesignation = async (id: any) => {
    designationId({ id: id })
      .then((res) => {
        if (res?.data) {
          setEditData(res?.data);
          setIsModalOpen(true);
        }
      })
      .catch((e) => console.log(e));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen === false) {
      setEditData(null);
    }
  }, [isModalOpen]);

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
    total: data?.totalItems,
    showTotal: (total: number, range: any) =>
      `${range[0]} to ${range[1]} of ${total}`,
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "title",
      width: "50%",
      render: (_, record) => <span>{record?.title}</span>,
    },

    {
      title: "Designation Slug",
      dataIndex: "slug",
      render: (_, record) => <span>{record?.slug}</span>,
    },

    {
      title: "Action",
      dataIndex: "action",
      align: "right",
      render: (_, record) => {
        return (
          <div className="flex items-center justify-end gap-3">
            <button onClick={() => getSingleDesignation(record?.id)}>
              <FiEdit className="text-base" />
            </button>
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
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <p>Dashboard</p>
        <FiChevronRight />
        <p>Designations</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Designations</h4>

        <button className="btn btn-secondary" type="button" onClick={showModal}>
          ADD NEW
        </button>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>
      <div className="flex justify-between items-center mt-6 my-4  gap-[10px] ">
        <div className="w-3/12 relative">
          <Input
            type="text"
            name=""
            id=""
            placeholder="Search Posts"
            className="border pl-8 pr-5 py-1 rounded-[4px] w-full"
            onChange={(e: any) => setKeyword(e.target.value)}
          />
          <BiSearch
            size={18}
            className="absolute top-[50%] translate-y-[-50%] left-2"
          />
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={data?.data}
          loading={isFetching}
          pagination={paginationOptions}
        />
      </div>

      <Modal
        title={
          <div className="flex items-center gap-2 px-6 py-4 border-b">
            <span>{editData ? "EDIT" : "ADD NEW"} DESIGNATIONS</span>
          </div>
        }
        open={isModalOpen}
        width={"100%"}
        style={{ maxWidth: 825, width: "100%", padding: 0 }}
        onCancel={handleCancel}
        footer={false}
      >
        <DesignationForm editData={editData} handleCancel={handleCancel} />
      </Modal>
    </div>
  );
};

export default DesignationList;
