import { Input, Modal, Popconfirm, Select, Spin, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Field, Form, Formik } from "formik";
import React, { ReactNode, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronRight, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useLazyGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../../appstore/post/categories/categories_api";
import { useUpdateTagMutation } from "../../../../appstore/post/tag/tag_api";
import { validationSchema } from "../utils";

interface DataType {
  key: React.Key;
  name: string;
  title: string;
  description: string;
  group: ReactNode;
  slug: string;
  totalCount: number;
  action: ReactNode;
  id?: any;
}

const CategoriesList = () => {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [editData, setEditData] = useState<any>(null);
  const [categoryId] = useLazyGetSingleCategoryQuery();
  const { data, isFetching } = useGetAllCategoriesQuery({
    title: keyword,
    page,
    limit,
  });

  const catOptions = data?.data?.map((item: any) => {
    return {
      label: item?.title,
      value: item?.id,
    };
  });

  const [createCategory, { isLoading: createLoading }] =
    useCreateCategoryMutation();

  const [updateCategory, { isLoading: updateLoading }] =
    useUpdateCategoryMutation();

  const createHandler = async (values: any, actions: any) => {
    let res: any;
    if (editData === null) {
      res = await createCategory({
        title: values.title,
        slug: values.slug,
      });
    } else {
      res = await updateCategory({
        id: editData?.id,
        title: values?.title,
        slug: values?.slug,
      });
    }
    if (!res?.error) {
      message.success(
        `Category ${editData ? "update" : "create"} successfully.`
      );
      setIsModalOpen(false);
      actions.resetForm();
      // navigate("/categories/list");
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
  };

  console.log("data", data);

  const formInit = { title: "", slug: "", parentId: undefined };

  const [deletId] = useDeleteCategoryMutation();

  const confirm = async (id: any) => {
    try {
      const res: any = await deletId({
        id: id,
      });
      if (!res?.error) {
        message.success("Category delete successfully.");
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

  const getSingleCategory = async (id: any) => {
    categoryId({ id: id })
      .then((res: any) => {
        if (res?.data) {
          setEditData(res?.data);
          setIsModalOpen(true);
        }
      })
      .catch((e: any) => console.log(e));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

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
    total: data?.totalCount,
    showTotal: (total: number, range: any) =>
      `${range[0]} to ${range[1]} of ${total}`,
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "title",

      render: (_, record) => <span>{record?.title}</span>,
    },

    {
      title: "Category Slug",
      dataIndex: "slug",
      render: (_, record) => <span>{record?.slug}</span>,
    },

    {
      title: "Action",
      dataIndex: "action",
      align: "right",
      render: (_, record) => {
        return (
          <div className="flex items-center justify-end gap-3">
            <button onClick={() => getSingleCategory(record?.id)}>
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
        <p>Categories</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Categories</h4>

        <button
          // to="/categories/add"
          className="btn btn-secondary"
          type="button"
          onClick={showModal}
        >
          ADD NEW
        </button>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>
      <div className="flex justify-between items-center mt-6 my-4  gap-[10px] ">
        <div className="w-full lg:w-3/12 relative">
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
      <div className="overflow-auto">
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
            <span>{editData ? "EDIT" : "ADD NEW"} CATEGORY</span>
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
            initialValues={editData ?? formInit}
            enableReinitialize={true}
            validationSchema={validationSchema}
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
                <div className="grid grid-cols-1 gap-x-8 gap-y-5">
                  <div className="w-full">
                    <label htmlFor="">
                      Name <span className="text-danger">*</span>
                    </label>
                    <div>
                      <Field
                        name="title"
                        type="text"
                        className=" border px-3 py-1 w-full"
                        placeholder="Enter Category Name"
                      />
                      {errors?.title && touched?.title ? (
                        <div className="error">{errors?.title}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="w-full">
                    <label htmlFor="slug">Slug</label>
                    <div>
                      <Field
                        name="slug"
                        type="text"
                        className=" border px-3 py-1 w-full"
                        placeholder="Add slug"
                      />
                      {errors?.slug && touched?.slug ? (
                        <div className="error">{errors?.slug}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="w-full">
                    <label htmlFor="slug">Parent Category</label>

                    <Select
                      placeholder="Parent Category"
                      style={{ width: "100%", borderRadius: 0 }}
                      className="py-1"
                      options={catOptions}
                      value={
                        values?.parentId && values?.parentId !== undefined
                          ? values?.parentId
                          : undefined
                      }
                      onChange={(val: any) => setFieldValue("parentId", val)}
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="slug">Description</label>
                    <textarea
                      name="slug"
                      className=" border px-3 py-1 w-full"
                      placeholder="Type here"
                      rows={6}
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      className="btn btn-grey"
                      type="button"
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
                        {editData ? "UPDATE" : "ADD"} CATEGORY
                      </button>
                    ) : (
                      <button className={`btn btn-primary w-[96px] disabled`}>
                        <Spin className="h-4 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

export default CategoriesList;
