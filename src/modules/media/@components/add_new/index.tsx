import { useAddFilesMutation } from "@/appstore/media/media_api";
import { formatBytes } from "@/helpers/utils";
import { Modal, message, Spin } from "antd";
import { ReactNode, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { MdCloudUpload } from "react-icons/md";
import { useSelector } from "react-redux";
import { allowFormate, allowed_size } from "../../helper";
import CreateFolder from "../create_folder";

interface propTypes {
  children?: ReactNode;
}

const MediaAddNew = ({ children }: propTypes) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const parentFolderInfo = useSelector((state: any) => state.mediaSlice);
  const [submit, { data, isLoading, isError, error }] = useAddFilesMutation();
  const [fileState, setFileState] = useState<any>([]);

  const [title, setTitle] = useState<any>([]);
  const [altName, setAltName] = useState<any>([]);
  const [type, setType] = useState<any>([]);

  // file state handler
  const onFileChange = (event: any) => {
    let titleArr = [...title];
    let typeArr: any = [...type];
    let fileArr: any = [...fileState];

    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        if (
          allowFormate.includes(event.target.files[i].type) &&
          event.target.files[i].size / 1000 <= allowed_size
        ) {
          let fname = event.target.files[i].name;
          let title = fname.split(".").slice(0, -1).join(".");
          titleArr.push(title);

          let typeName = event.target.files[i].type.split("/")[0];
          typeArr.push(typeName);

          fileArr.push(event.target.files[i]);
        } else {
          //  error message
        }
      }
      setFileState(fileArr);
      setTitle(titleArr);
      setAltName(titleArr);
      setType(typeArr);
    }
  };

  const handleRemove = (index: any) => {
    let fileArr = [...fileState];
    let titleArr = [...title];
    let typeArr = [...type];
    let altNameArr = [...altName];
    if (index !== -1) {
      fileArr.splice(index, 1);
      titleArr.splice(index, 1);
      typeArr.splice(index, 1);
      altNameArr.splice(index, 1);
      setFileState(fileArr);
      setTitle(titleArr);
      setAltName(altNameArr);
      setType(typeArr);
    }
  };

  const changeName = (e: any) => {
    let index = e.target.name.replace("file_name_", "");
    let titleArr = [...title];
    titleArr[index] = e.target.value;
    setTitle(titleArr);
  };

  const changeAlt = (e: any) => {
    let index = e.target.name.replace("alt_name_", "");
    let altNameArr = [...altName];
    altNameArr[index] = e.target.value;
    setAltName(altNameArr);
  };

  const createTable = () => {
    let table = [];
    if (fileState && fileState.length > 0) {
      for (let i = 0; i < fileState.length; i++) {
        if (allowFormate.indexOf(fileState[i].type) > -1) {
          const reader = new FileReader();

          // Read the image file as a data URL
          reader.readAsDataURL(fileState[i]);

          // Define the function to be executed when the reader has finished reading the file
          // reader.onloadend = () => {
          //   console.log(reader.result);
          // };
          // console.log("objectUrl", objectUrl);
          // console.log("objectUrl", fileState[i]);

          table.push(
            <tr key={i}>
              <td className="py-1 px-2 border">
                <span>{i + 1}</span>
              </td>
              <td className="py-0 px-2 border">
                <input
                  title={title[i]}
                  name={`file_name_${i}`}
                  className="border py-1 px-2 w-full"
                  key={i}
                  onChange={changeName}
                  value={title[i]}
                />
              </td>
              <td className="py-1 px-2 border">
                <input
                  title={altName[i]}
                  name={`alt_name_${i}`}
                  className="border py-1 px-2 w-full"
                  key={i}
                  onChange={changeAlt}
                  value={altName[i]}
                />
              </td>
              <td className="py-1 px-2 border">
                <span className="shorter">{fileState[i].name}</span>
              </td>
              <td className="py-0 px-2 border">
                <span className="shorter">
                  {fileState[i].type.split("/")[0]}
                </span>
              </td>
              <td className="py-0 px-2 border">
                <span> {formatBytes(fileState[i].size)}</span>
              </td>
              <td className="py-0 px-2 border">
                <button
                  value={i}
                  onClick={() => handleRemove(i)}
                  type="button"
                  className="text-lg hover:text-danger"
                >
                  <HiOutlineTrash />
                </button>
              </td>
            </tr>
          );
        } else {
          //remove state
          //show alert
          //  error message
        }
      }
    }
    return table;
  };

  const saveFile = async () => {
    const formData = new FormData();
    if (fileState.length > 0) {
      fileState.map((file: any, index: any) => {
        formData.append(`files[${index}]`, file);
      });
    }
    if (title.length > 0) {
      title.map((item: any, index: any) => {
        formData.append(`info[${index}][title]`, item);
        formData.append(`info[${index}][name]`, item);
        formData.append(
          `info[${index}][libraryId]`,
          parentFolderInfo?.parentId
        );
      });
    }
    if (altName.length > 0) {
      altName.map((alt: any, index: any) => {
        formData.append(`info[${index}][alt]`, alt);
      });
    }
    if (type.length > 0) {
      type.map((item: any, index: any) => {
        formData.append(`info[${index}][type]`, item);
      });
    }

    const res: any = await submit(formData);
    if (!res?.error) {
      message.success(`Media created successfully!`);
      setIsModalOpen(false);
      setFileState([]);
      setTitle([]);
      setAltName([]);
      setType([]);
    } else {
      message.error(
        res?.error?.data?.message ?? "Something went wrong. Try reload the page"
      );
    }
  };

  return (
    <>
      <div onClick={() => setIsModalOpen(true)}>
        {children ? (
          children
        ) : (
          <button className="btn btn-secondary">Add New</button>
        )}
      </div>

      <Modal
        title={<div className="p-4 border-b">Add Media</div>}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={"100%"}
        style={{ maxWidth: "1150px", padding: "20px" }}
      >
        <>
          {parentFolderInfo && (
            <div className="pl-5 pt-2 mb-[-10px]">
              <div>Directory: {parentFolderInfo?.title}</div>
            </div>
          )}

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
                    accept="image/*,.pdf,.txt"
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
                          <td className="py-2 px-3 border">SL</td>
                          <td className="py-2 px-3 border">New Name</td>
                          <td className="py-2 px-3 border">Alt Tag</td>
                          <td className="py-2 px-3 border">File Name</td>
                          <td className="py-2 px-3 border">Type</td>
                          <td className="py-2 px-3 border">Size</td>
                          <td className="py-2 px-3 border">Action</td>
                        </tr>
                      </thead>
                      <tbody>{createTable()}</tbody>
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
                    {isLoading ? (
                      <button
                        type="button"
                        className="min-w-[90px] disabled h-[38px] btn btn-secondary uppercase"
                      >
                        <Spin className="pt-1" size="default" />
                      </button>
                    ) : (
                      <button
                        onClick={saveFile}
                        type="button"
                        className="btn btn-secondary uppercase"
                      >
                        Upload
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </>
      </Modal>
    </>
  );
};

export default MediaAddNew;
