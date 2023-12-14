import {
  useGetAppoinmentListQuery,
  useGetParticipantedUserQuery,
} from "@/appstore/event/event_api";
import { DatePicker, Modal, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactNode, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useParams } from "react-router-dom";

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
  team?: any;
}

const AppionmentList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);

  const { data, isFetching } = useGetAppoinmentListQuery({
    page,
    limit,
  });

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
      width: "250px",
      render: (_, record) => {
        return (
          <span className="line-clamp-1">{`${record?.firstName} ${record?.lastName}`}</span>
        );
      },
    },
    {
      title: "Team Name",
      dataIndex: "team",
      width: "250px",
      render: (_, record) => {
        return <div>{record?.team?.name}</div>;
      },
    },
    {
      title: "Team Email",
      dataIndex: "email",
      width: "250px",
      render: (_, record) => {
        return <span className="line-clamp-1">{record?.team?.email}</span>;
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

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <p>Dashboard</p>
        <FiChevronRight />
        <p>Appionment</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Appoinment</h4>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>
      <div className="flex justify-between items-center mt-6 my-4  gap-[10px] "></div>
      <div className="overflow-auto">
        <Table
          rowKey={`id`}
          columns={columns}
          dataSource={data?.data}
          loading={isFetching}
          pagination={paginationOptions}
        />
      </div>
    </div>
  );
};

export default AppionmentList;
