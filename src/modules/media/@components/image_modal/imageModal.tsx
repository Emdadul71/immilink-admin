import { Dropdown, Modal, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useGetMediasQuery } from "@/appstore/media/media_api";
import { Fragment, useState } from "react";
import { FiFile } from "react-icons/fi";

import { TableRowSelection } from "antd/es/table/interface";
import { useSelector } from "react-redux";
import MediaAdd from "../add_new";
import CreateFolder from "../create_folder";
import MediaFilter from "../filter";
import MediaFolders from "../folders";
import { AiOutlineDelete } from "react-icons/ai";

const ImageInput = ({ onChange, type, imageUrl }: any) => {
  const selectedFolder = useSelector((state: any) => state.mediaSlice);

  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mediaData, setMediaData] = useState();

  const [filtered, setFiltered] = useState<any>({
    searchString: "",
    startDate: null,
    endDate: null,
    category: "",
    type: "image",
  });
  const { data, isFetching, isError, error } = useGetMediasQuery({
    page: page,
    limit: limit,
    title: filtered.searchString,
    type: "image",
    libraryId: selectedFolder?.parentId,
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
    pageSizeOptions: [12, 24, 36, 60],
    total: data?.totalCount,
    showTotal: (total: number, range: any) =>
      `${range[0]} to ${range[1]} of ${total}`,
  };

  const onSelectChange = (newSelectedRowKeys: any, data: any) => {
    setMediaData(data[0]);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<any> = {
    type: "radio",
    selectedRowKeys,
    onChange: onSelectChange,
  };

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
              className="w-full h-full object-cover"
              alt={record.title}
            />
          );
        } else if (record?.type === "application") {
          content = (
            <img
              crossOrigin="anonymous"
              src="/images/misc/pdf-icon.png"
              className="w-full h-full object-cover"
              alt={record.title}
            />
          );
        } else {
          content = <></>;
        }
        return (
          <div className="w-full group relative bg-greylight rounded-lg h-[150px] p-3 pb-6 flex flex-col items-center justify-center cursor-pointer">
            {content}
          </div>
        );
      },
    },
  ];
  const handleRowClick = (record: any) => {
    setMediaData(record);
    setSelectedRowKeys([record?.id]);
  };

  const rowEventHandlers = (record: any) => {
    return {
      onClick: () => handleRowClick(record), // Call your custom row click handler
    };
  };

  const renderItem = () => {
    return (
      <div className="grid grid-cols-[330px_1fr] gap-8 pt-8 px-4">
        {/* left side */}
        <div className="border p-5 rounded-md">
          <Dropdown
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
            alignment={"grid"}
            showDelete={false}
            showType={false}
            showDate={false}
            showGrid={false}
          />

          <div>
            {selectedFolder?.title && (
              <div className="font-medium mb-3">{selectedFolder?.title}</div>
            )}
            <Table
              rowKey={`id`}
              rowSelection={rowSelection}
              dataSource={dataMedia}
              columns={columnsGrid}
              className="table_media table_media_grid"
              loading={isFetching}
              pagination={paginationOptions}
              onRow={rowEventHandlers}
            />
          </div>
        </div>
      </div>
    );
  };

  const PreviewImage = () => {
    return (
      <div>
        <img
          crossOrigin="anonymous"
          src={imageUrl ? imageUrl : "/images/misc/image-upload.png"}
          className="w-full h-full object-cover"
        />
      </div>
    );
  };

  const handleInsert = () => {
    if (onChange) {
      onChange({ data: mediaData });
    }
  };

  return (
    <Fragment>
      <div style={{ position: "relative" }}>
        <button type="button" onClick={() => setModalOpen(true)}>
          <PreviewImage />
        </button>
        {mediaData && imageUrl && (
          <div style={{ position: "absolute", top: "0", right: "0" }}>
            <button
              onClick={() => {
                setMediaData(undefined);
                if (onChange) {
                  onChange(undefined);
                }
              }}
              className="p-1 rounded"
              style={{ background: "#ACACA6" }}
            >
              <AiOutlineDelete style={{ fontSize: "25px", color: "#ffffff" }} />
            </button>
          </div>
        )}
      </div>

      <Modal
        title={<div className="p-4 border-b">Media Library</div>}
        width={"100%"}
        style={{ maxWidth: "1350px", width: "100%", padding: 0 }}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setMediaData(undefined);
          selectedRowKeys([]);
        }}
        footer={[
          <button
            onClick={() => {
              setModalOpen(false);
              setMediaData(undefined);
              selectedRowKeys([]);
            }}
            className={`btn btn-grey text-black `}
          >
            Cancel
          </button>,
          <button
            onClick={() => {
              handleInsert();
              setModalOpen(false);
            }}
            className="btn btn-secondary mt-0 mx-5 my-4"
          >
            Insert
          </button>,
        ]}
      >
        {renderItem()}
      </Modal>
    </Fragment>
  );
};

export default ImageInput;
