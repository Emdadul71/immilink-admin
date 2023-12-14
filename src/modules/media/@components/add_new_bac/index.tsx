import { ReactNode, useState } from "react";
import { Modal } from "antd";
import { MdCloudUpload } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import { FiFile } from "react-icons/fi";
import { useSelector } from "react-redux";
import CreateFolder from "../create_folder";
import { formatBytes, splitNameWithLastDot } from "@/helpers/utils";
import { useAddFilesMutation } from "@/appstore/media/media_api";

interface propTypes {
  children?: ReactNode;
}

const MediaAddNew = ({ children }: propTypes) => {
  const parentFolderInfo = useSelector((state: any) => state.mediaSlice);
  const [submit, { data, isLoading, isError, error }] = useAddFilesMutation();
  const [fileState, setFileState] = useState<any>([]);
  // file state handler
  const onFileChange = (event: any) => {
    const files = event.target.files;
    setFileState([...files]);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async () => {
    const formData = new FormData();
    if (fileState.length > 0) {
      fileState.map((f: any) => {
        formData.append("file", f);
        formData.append("title", f.title);
        formData.append("name", f.name);
        formData.append("alt", f.alt);
        formData.append("type", f.type);
        formData.append("libraryId ", parentFolderInfo.parentId);
      });
    }

    try {
      const res = await submit(formData);
    } catch (error) {}
  };

  return (
    <>
      <div onClick={showModal}>
        {children ? (
          children
        ) : (
          <button className="btn btn-secondary">Add New</button>
        )}
      </div>

      <Modal
        title={<div className="p-4 border-b">Add Media</div>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={"100%"}
        style={{ maxWidth: "1150px", padding: "20px" }}
      >
        {parentFolderInfo?.parentId == null ? (
          <CreateFolder>
            <div className="cursor-default relative">
              <div
                onClick={(e) => e.stopPropagation()}
                className="p-4 text-center text-lg font-medium h-[150px]"
              >
                You don't have created folder yet. Please add a folder first!
              </div>
              <div className="p-4 pt-[50px] text-center absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
                <button className="btn btn-secondary">Add Folder</button>
              </div>
            </div>
          </CreateFolder>
        ) : (
          <div className="p-5 text-sm">
            <div className="mb-7">
              <label
                htmlFor="upload_field"
                className="cursor-pointer border-s-black relative"
              >
                <input
                  type="file"
                  multiple={true}
                  id="upload_field"
                  className="opacity-0 absolute w-full h-full cursor-pointer"
                  onChange={onFileChange}
                />
                <div className="border-dashed border-2 border-greylight py-[20px] px-[40px] grid place-items-center">
                  <div className="text-[50px] text-primary mb-2">
                    <MdCloudUpload />
                  </div>
                  <div className="text-[20px] font-medium text-black">
                    Drop files to upload
                  </div>
                  <div className="text-[20px] font-medium mb-1 text-black">
                    or
                  </div>
                  <div>
                    <button type="button" className="btn btn-grey uppercase">
                      Browse files
                    </button>
                  </div>
                </div>
              </label>
            </div>
            {fileState && fileState?.length > 0 && (
              <>
                <div className="overflow-auto mb-7">
                  <table className="w-full text-center">
                    <thead className="bg-grey">
                      <tr>
                        <td className="p-3 border">Image</td>
                        <td className="p-3 border">New Name</td>
                        <td className="p-3 border">Alt Tag</td>
                        <td className="p-3 border">File Name</td>
                        <td className="p-3 border">Type</td>
                        <td className="p-3 border">Size</td>
                        <td className="p-3 border">Action</td>
                      </tr>
                    </thead>
                    <tbody>
                      {fileState?.map((item: any, i: any) => {
                        const [name, extension] = splitNameWithLastDot(
                          item.name
                        );
                        const objectUrl = URL.createObjectURL(item);
                        return (
                          <tr key={i}>
                            <td className="py-1 px-2 border">
                              <div className="flex items-center justify-center w-[50px] h-[40px]">
                                <img
                                  className="w-full h-full object-contain"
                                  src={objectUrl}
                                  alt="image"
                                />
                              </div>
                            </td>
                            <td className="py-0 px-2 border">
                              <input
                                type="text"
                                placeholder="Top-laptop-brands-in-India"
                                className="border py-1 px-2"
                                value="Top-laptop-brands-in-India"
                              />
                            </td>
                            <td className="py-0 px-2 border">
                              <input
                                type="text"
                                placeholder="Top-laptop-brands-in-India"
                                className="border py-1 px-2"
                                value="Top-laptop-brands-in-India"
                              />
                            </td>
                            <td className="p-3 border">{name}</td>
                            <td className="p-3 border">{item?.type}</td>
                            <td className="p-3 border">
                              <div className="whitespace-nowrap">
                                {formatBytes(item?.size)}
                              </div>
                            </td>
                            <td className="p-3 border">
                              <button
                                onClick={() =>
                                  setFileState((prev: any) =>
                                    prev.filter((d: any) => d.name != item.name)
                                  )
                                }
                                type="button"
                                className="text-lg hover:text-danger"
                              >
                                <HiOutlineTrash />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-end gap-3 ">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    type="button"
                    className="btn btn-grey uppercase"
                  >
                    Cancel
                  </button>
                  <button type="button" className="btn btn-secondary uppercase">
                    Upload
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default MediaAddNew;
