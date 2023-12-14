import {
  useDeleteTeamLevelMutation,
  useGetTeamLevelQuery,
  useLazyGetSingleTeamLevelQuery,
} from "@/appstore/team/team_level/team_level";
import { Input, Modal, Popconfirm, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactNode, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronRight, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { useDeleteCategoryMutation } from "../../../../appstore/post/categories/categories_api";
import TeamLevelForm from "../components/create_form";

interface DataType {
  key: React.Key;
  id?: any;
  name: string;
  orderPosition: any;
  action: ReactNode;
}

const TeamLevelList = () => {
  const [keyword, setKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [editData, setEditData] = useState<any>(null);
  const [TeamId, { isFetching: singleLoading }] =
    useLazyGetSingleTeamLevelQuery();

  const { data, isFetching } = useGetTeamLevelQuery({
    name: keyword,
    page,
    limit,
  });

  const [deletId] = useDeleteTeamLevelMutation();

  const confirm = async (id: any) => {
    try {
      const res: any = await deletId({
        id: id,
      });
      if (!res?.error) {
        message.success("Team level delete successfully.");
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

  const getSingleTeamLevel = async (id: any) => {
    TeamId({ id: id })
      .then((res: any) => {
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
      render: (_, record) => {
        return <span>{record?.name}</span>;
      },
    },

    {
      title: "Order Position",
      dataIndex: "orderPosition",
      render: (_, record) => <span>{record?.orderPosition}</span>,
    },

    {
      title: "Action",
      dataIndex: "action",
      align: "right",
      render: (_, record) => {
        return (
          <div className="flex items-center justify-end gap-3">
            <button onClick={() => getSingleTeamLevel(record?.id)}>
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
        <p>Team Level</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Team Level</h4>

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
            <span>{editData ? "EDIT" : "ADD NEW"} TEAM LEVEL</span>
          </div>
        }
        open={isModalOpen}
        width={"100%"}
        style={{ maxWidth: 825, width: "100%", padding: 0 }}
        onCancel={handleCancel}
        footer={false}
      >
        <div className="px-6 py-4">
          <TeamLevelForm
            handleCancel={handleCancel}
            editData={editData}
            singleLoading={singleLoading}
          />
        </div>
      </Modal>
    </div>
  );
};

export default TeamLevelList;
