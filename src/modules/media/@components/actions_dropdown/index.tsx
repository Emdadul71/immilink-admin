import {
  useBulkDeleteMediaMutation,
  useDeleteMediaMutation,
} from "@/appstore/media/media_api";
import { Dropdown, message, Popconfirm } from "antd";
import { FiDownload, FiLink2, FiTrash2 } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";

const MediaActionsDropdown = ({ record }: any) => {
  const [deletId] = useDeleteMediaMutation();

  const confirm = async (id: any) => {
    try {
      const res: any = await deletId({
        id: id,
      });
      if (!res?.error) {
        message.success("Media delete successfully.");
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

  const copyHandler = (record: any) => {
    navigator.clipboard.writeText(record?.path);
    message.success("Link has been copied!");
  };
  return (
    <Dropdown
      dropdownRender={() => (
        <div className="bg-white rounded-md py-2 drop-shadow-xl">
          <a
            href={record?.path}
            download
            // onClick={() => handleDownload(record?.path)}
            className="flex items-center gap-2 text-sm py-1.5 px-7 hover:bg-greylight hover:text-inherit"
          >
            <FiDownload />
            <span>Download</span>
          </a>
          <button
            type="button"
            className="flex items-center gap-2 text-sm py-1.5 px-7 hover:bg-greylight hover:text-inherit w-full"
            onClick={() => copyHandler(record)}
          >
            <FiLink2 />
            <span>Copy</span>
          </button>
          <Popconfirm
            placement="top"
            title={<span>Are you sure to delete this file?</span>}
            description=" "
            onConfirm={() => confirm(record?.id)}
            okText={"Yes"}
            cancelText="No"
          >
            <button
              type="button"
              className="flex items-center gap-2 text-sm py-1.5 px-7 hover:bg-greylight hover:text-inherit w-full"
            >
              <FiTrash2 />
              <span>Delete</span>
            </button>
          </Popconfirm>
        </div>
      )}
      trigger={["click"]}
    >
      <button type="button">
        <HiDotsVertical />
      </button>
    </Dropdown>
  );
};

export default MediaActionsDropdown;
