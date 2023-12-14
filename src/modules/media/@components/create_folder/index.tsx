import { useState } from "react";
import { message } from "antd";
import { Modal } from "antd";
import { FiFolder } from "react-icons/fi";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAddFoldersMutation } from "@/appstore/media/media_api";
import { useSelector, useDispatch } from "react-redux";
import { mediaFolderParentInfo } from "@/appstore/media/media_slice";

interface propTypes {
  children?: any;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});
const init = {
  title: "",
};

const CreateFolder = ({ children }: propTypes) => {
  const dispatch = useDispatch();
  const folderParentInfo = useSelector((state: any) => state.mediaSlice);
  const [addFolter, { data, isLoading, isError, error }] =
    useAddFoldersMutation();

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

  const addFolderHandler = async (values: any, resetForm: any) => {
    try {
      const res: any = await addFolter({
        title: values.title,
        parentId: folderParentInfo?.parentId ? folderParentInfo?.parentId : 0,
      });
      if (!res?.error) {
        resetForm();
        message.success(`Folder created successfully!`);
        handleCancel();
      } else {
        message.error(
          res?.error?.data?.message ??
            "Something went wrong. Try reload the page"
        );
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
      <div onClick={showModal} className="cursor-pointer">
        {children ? (
          children
        ) : (
          <div className="flex items-center gap-2 text-sm py-1.5 px-7 hover:bg-greylight hover:text-inherit w-full">
            <FiFolder />
            <span>Create Folder</span>
          </div>
        )}
      </div>

      <Modal
        title={<div className="px-4 py-3.5 border-b">Create Folder</div>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={"100%"}
        style={{ maxWidth: "500px", padding: "20px" }}
      >
        <div className="p-5">
          <Formik
            validationSchema={validationSchema}
            initialValues={init}
            enableReinitialize={false}
            onSubmit={(values: any, { resetForm }) => {
              addFolderHandler(values, resetForm);
            }}
          >
            {({
              handleSubmit,
              setFieldValue,
              errors,
              values,
              touched,
            }: any) => (
              <Form>
                <div className="mb-8">
                  {folderParentInfo && (
                    <div className="mb-2 text-base font-medium">
                      Directory:{" "}
                      <span
                        className="cursor-pointer"
                        onClick={() =>
                          dispatch(
                            mediaFolderParentInfo({ title: "", parentId: null })
                          )
                        }
                      >
                        Root
                      </span>
                      <span className="text-xs">
                        {folderParentInfo?.title ? " / " : ""}
                      </span>
                      <span>{folderParentInfo?.title}</span>
                    </div>
                  )}

                  <div>
                    <label htmlFor="title" className="text-sm">
                      Folder Name <span className="text-danger">*</span>
                    </label>
                    <Field
                      name="title"
                      type="text"
                      placeholder="Folder Name"
                      className="w-full border rounded px-3 py-2 placeholder:text-sm"
                    />
                    {errors?.title && touched?.title ? (
                      <div className="error">{errors?.title}</div>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 ">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    type="button"
                    className="btn btn-grey uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-secondary uppercase"
                  >
                    Create
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default CreateFolder;
