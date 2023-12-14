import ForwardDirectoryTree from "antd/es/tree/DirectoryTree";
import { DownOutlined } from "@ant-design/icons";
import type { DataNode, TreeProps } from "antd/es/tree";
import {
  useDeleteFoldersMutation,
  useGetFoldersQuery,
} from "@/appstore/media/media_api";
import { useSelector, useDispatch } from "react-redux";
import { mediaFolderParentInfo } from "@/appstore/media/media_slice";
import Skeleton from "@/modules/@common/skeleton";
import { AiOutlineFolder } from "react-icons/ai";
import { FiX } from "react-icons/fi";
import { Popconfirm, message } from "antd";

const MediaFolders = () => {
  const folderParentInfo = useSelector((state: any) => state.mediaSlice);
  console.log(folderParentInfo);

  const { data, isLoading, isError, error } = useGetFoldersQuery({});
  const [deletId] = useDeleteFoldersMutation();

  const dispatch = useDispatch();
  const onSelect: TreeProps["onSelect"] = (_, info) => {
    dispatch(
      mediaFolderParentInfo({ title: info.node.title, parentId: info.node.key })
    );
  };

  const confirm = async (node: any) => {
    try {
      const res: any = await deletId({
        id: node?.key,
      });
      if (!res?.error) {
        message.success("Item delete successfully.");
      } else {
        if (res?.error?.status >= 500) {
          message.error("Somthing went wrong.");
        } else if (res?.error?.status === 400) {
          message.error("Folder contain media!");
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

  return (
    <>
      {isLoading ? (
        <>
          {new Array(8).fill(1).map((_, i) => {
            return <Skeleton key={i} height={30} className={"mb-1"} />;
          })}
        </>
      ) : (
        <ForwardDirectoryTree
          showLine
          switcherIcon={<DownOutlined />}
          defaultExpandAll
          onSelect={onSelect}
          treeData={data}
          className="text-sm"
          titleRender={(node: any) => (
            <>
              {node.title}
              <Popconfirm
                placement="top"
                title={<span>Are you sure to delete this folder?</span>}
                onConfirm={() => confirm(node)}
                okText={"Yes"}
                cancelText="No"
              >
                <FiX className="node_delete" />
              </Popconfirm>
            </>
          )}
        />
      )}
    </>
  );
};

export default MediaFolders;
