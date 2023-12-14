import { Input, Modal, Popconfirm, Select, Spin, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Field, Form, Formik } from "formik";
import React, { ReactNode, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronRight, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import * as Yup from "yup";
import {
  useCreateTagMutation,
  useDeleteTagMutation,
  useGetTegsQuery,
  useLazyGetSingleTagQuery,
  useUpdateTagMutation,
} from "../../../../appstore/post/tag/tag_api";

interface DataType {
  key: React.Key;
  id: any;
  title: ReactNode;
  slug: string;
  action: ReactNode;
}

const TagList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [searchString, setSearchString] = useState();
  const [editData, setEditData] = useState<any>(null);
  const { data, isFetching } = useGetTegsQuery({
    page,
    limit,
    title: searchString,
  });
  const [createtag, { isLoading: createLoading }] = useCreateTagMutation();
  const [deletId] = useDeleteTagMutation();
  const [tagId, { data: singletag, isFetching: singleLoading }] =
    useLazyGetSingleTagQuery();

  const [updateTag, { isLoading: updateLoading }] = useUpdateTagMutation();

  const createHandler = async (values: any, actions: any) => {
    let res: any;
    if (editData === null) {
      res = await createtag({
        title: values?.title,
        slug: values?.slug,
      });
    } else {
      res = await updateTag({
        id: editData?.id,
        title: values?.title,
        slug: values?.slug,
      });
    }

    if (!res?.error) {
      message.success(`Tag ${editData ? "update" : "create"} successfully.`);
      setIsModalOpen(false);
      actions.resetForm();
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
        setIsModalOpen(false);
      }
    }
  };

  const confirm = async (id: any) => {
    try {
      const res: any = await deletId({
        type: "soft",
        id: id,
      });
      if (!res?.error) {
        message.success("Tag delete successfully.");
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

  const getSingleTag = async (id: any) => {
    tagId({ id: id })
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
    // total: data?.totalItems,
    showTotal: (total: number, range: any) =>
      `${range[0]} to ${range[1]} of ${total}`,
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "title",
      width: "440px",
      render: (_, record) => {
        return (
          <span className="inline-flex items-center gap-1.5 bg-[#E2EDF9] px-3 py-1.5 rounded-full text-[#4E92DF]">
            <RxCross1 className="text-md" />
            <span>{record?.title}</span>
          </span>
        );
      },
    },

    {
      title: "Slug",
      dataIndex: "slug",
      render: (_, record) => {
        return <span className="">{record?.slug}</span>;
      },
    },

    {
      title: "Action",
      dataIndex: "action",

      render: (_, record) => {
        return (
          <div className="flex items-center gap-3">
            <button onClick={() => getSingleTag(record?.id)}>
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
        <p>Tags</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Tags</h4>
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
            placeholder="Search Tags"
            onChange={(e: any) => setSearchString(e?.target?.value)}
            className="border pl-8 pr-5 py-1 rounded-[4px] w-full"
          />
          <BiSearch
            size={18}
            className="absolute top-[50%]  translate-y-[-50%] left-2"
          />
        </div>
      </div>
      <div>
        <Table
          rowKey={`id`}
          columns={columns}
          loading={isFetching}
          dataSource={data?.data}
          pagination={paginationOptions}
        />
      </div>
      <Modal
        title={
          <div className="flex items-center gap-2 px-6 py-4 border-b">
            <span>{editData ? "EDIT TAG" : "ADD NEW TAG"} </span>
          </div>
        }
        open={isModalOpen}
        width={"100%"}
        style={{ maxWidth: 825, width: "100%", padding: 0 }}
        onCancel={handleCancel}
        footer={false}
      >
        <div className="px-6 py-4">
          <Formik
            initialValues={editData ?? { title: "", slug: "" }}
            enableReinitialize={true}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("Title is required"),
            })}
            onSubmit={(values: any, actions: any) => {
              createHandler(values, actions);
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
                {!singleLoading ? (
                  <div className="grid grid-cols-1 gap-x-8 gap-y-5">
                    <div className="w-full">
                      <label htmlFor="">
                        Title <span className="text-danger">*</span>
                      </label>
                      <Field
                        type="text"
                        name="title"
                        placeholder="Tag title"
                        className=" border px-3 py-1 w-full"
                      />
                      {errors?.title && touched?.title ? (
                        <div className="error">{errors?.title}</div>
                      ) : null}
                    </div>
                    <div className="w-full">
                      <label htmlFor="">Slug</label>
                      <Field
                        type="text"
                        name="slug"
                        placeholder="Tag slug"
                        className=" border px-3 py-1 w-full"
                      />
                      {errors?.slug && touched?.slug ? (
                        <div className="error">{errors?.slug}</div>
                      ) : null}
                    </div>

                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        className="btn btn-grey"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      {!createLoading || updateLoading ? (
                        <button
                          className="btn btn-secondary"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          {editData ? "UPDATE" : "ADD"} TAG
                        </button>
                      ) : (
                        <button className={`btn btn-primary w-[96px] disabled`}>
                          <Spin className="h-4 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="h-[300px] flex justify-center items-center">
                    <Spin size="large" />
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

export default TagList;
