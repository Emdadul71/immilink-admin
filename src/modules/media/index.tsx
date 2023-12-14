import { Dropdown, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useGetMediasQuery } from "@/appstore/media/media_api";
import { useState } from "react";
import { FiFile } from "react-icons/fi";
import MediaAdd from "./@components/add_new";
import CreateFolder from "./@components/create_folder";
import MediaFilter from "./@components/filter";
import MediaFolders from "./@components/folders";

import moment from "moment";
import MediaActionView from "./@components/action_view";
import MediaActionsDropdown from "./@components/actions_dropdown";
import { formatBytes } from "@/helpers/utils";
import { useSelector } from "react-redux";

const MediaList = () => {
  const selectedFolder = useSelector((state: any) => state.mediaSlice);

  const [alignment, setAlignment] = useState("list"); // grid, list
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [open, setOpen] = useState(false);

  const [filtered, setFiltered] = useState<any>({
    searchString: "",
    startDate: "",
    endDate: "",
    category: "",
    type: null,
  });
  const { data, isFetching, isError, error } = useGetMediasQuery({
    page: page,
    limit: limit,
    title: filtered.searchString,
    type:
      filtered.type === null || filtered.type === undefined
        ? ""
        : filtered.type,
    libraryId: selectedFolder?.parentId,
    startDate: filtered?.startDate,
    endDate: filtered?.endDate,
  });
  const dataMedia = data?.data;

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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: ColumnsType<any> = [
    {
      title: "Image",
      dataIndex: "name",
      render: (_, record) => {
        let content;
        if (record?.type === "image") {
          content = (
            <img
              crossOrigin="anonymous"
              src={record.path}
              className="w-full h-full object-contain"
              alt={record.title}
            />
          );
        } else if (record?.type === "application") {
          content = (
            <img
              crossOrigin="anonymous"
              src="/images/misc/pdf-icon.png"
              className="w-full h-full object-contain"
              alt={record.title}
            />
          );
        } else {
          content = <></>;
        }
        return (
          <div className="w-[60px] h-[60px] flex items-center justify-center">
            {content}
          </div>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "title",
      ellipsis: true,
    },
    {
      title: "Alt",
      dataIndex: "alt",
      ellipsis: true,
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Type",
      dataIndex: "fileSize",
      render: (_, record) => {
        return <span>{formatBytes(record?.fileSize)}</span>;
      },
    },
    {
      title: "Last Updated",
      render: (record) => {
        return (
          <span className="">{moment(record.updatedAt).format("LL")}</span>
        );
      },
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <div className="flex items-center justify-center gap-3 text-lg">
            <MediaActionView data={record} />
            <MediaActionsDropdown record={record} />
          </div>
        );
      },
    },
  ];
  const columnsGrid: ColumnsType<any> = [
    {
      title: "Image",
      dataIndex: "name",
      render: (_, record) => {
        let content;
        if (record?.type === "image") {
          content = (
            <img
              crossOrigin="anonymous"
              src={record.path}
              className="w-full h-full object-contain"
              alt={record.title}
            />
          );
        } else if (record?.type === "application") {
          content = (
            <img
              crossOrigin="anonymous"
              src="/images/misc/pdf-icon.png"
              className="w-full h-full object-contain"
              alt={record.title}
            />
          );
        } else {
          content = <></>;
        }
        return (
          <div className="w-full group relative bg-greylight rounded-lg h-[150px] p-3 pb-6 flex flex-col items-center justify-center cursor-pointer">
            <div className="absolute cursor-default left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-white drop-shadow-lg rounded-md pl-4 pr-3 py-2 hidden group-hover:flex items-center justify-center gap-3 text-lg">
              <MediaActionView data={record} />
              <MediaActionsDropdown record={record} />
            </div>
            {content}
          </div>
        );
      },
    },
  ];

  return (
    <div className="mt-3 pb-[60px]">
      <div className="flex justify-between items-center mt-4">
        <h5 className="text-primary">Media Library</h5>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>

      {/* list design */}
      <div className="grid grid-cols-[330px_1fr] gap-8 pt-8">
        {/* left side */}
        <div className="border p-5 rounded-md">
          <Dropdown
            // placement="top"
            open={open}
            trigger={["click"]}
            onOpenChange={() => setOpen(!open)}
            dropdownRender={() => (
              <div className="bg-white rounded-md py-2 drop-shadow-xl">
                <div onClick={() => setOpen(false)}>
                  <CreateFolder />
                </div>
                <div onClick={() => setOpen(false)}>
                  <MediaAdd>
                    <button
                      type="button"
                      className="flex items-center gap-2 text-sm py-1.5 px-7 hover:bg-greylight hover:text-inherit w-full"
                    >
                      <FiFile />
                      <span>File Upload</span>
                    </button>
                  </MediaAdd>
                </div>
              </div>
            )}
          >
            <button type="button" className="btn btn-secondary w-full">
              Add Files
            </button>
          </Dropdown>

          {/* tree */}
          <div className="py-4">
            <MediaFolders />
          </div>
        </div>

        {/* right side */}
        <div className="border p-5 rounded-md">
          <MediaFilter
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            filtered={filtered}
            setFiltered={setFiltered}
            alignment={alignment}
            setAlignment={setAlignment}
          />

          <div>
            {selectedFolder?.title && (
              <div className="font-medium mb-3">{selectedFolder?.title}</div>
            )}

            {alignment == "list" ? (
              <Table
                rowKey={`id`}
                rowSelection={rowSelection}
                dataSource={dataMedia}
                columns={columns}
                className="table_media"
                loading={isFetching}
                pagination={paginationOptions}
              />
            ) : null}
            {alignment == "grid" ? (
              <>
                <Table
                  rowKey={`id`}
                  rowSelection={rowSelection}
                  dataSource={dataMedia}
                  columns={columnsGrid}
                  className="table_media table_media_grid"
                  loading={isFetching}
                  pagination={paginationOptions}
                />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaList;
