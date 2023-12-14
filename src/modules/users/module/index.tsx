import { Popconfirm, Select, Spin, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Field, Form, Formik } from "formik";
import React, { ReactNode, useState } from "react";
import { FiChevronRight, FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {
  useCreateModuleMutation,
  useDeleteModuleMutation,
  useGetModulesQuery,
  useSingleModuleQuery,
  useUpdateModuleMutation,
} from "../../../appstore/user/role_management/module/module_api";

interface DataType {
  key: React.Key;
  id: any;
  title: string;
  action?: ReactNode;
}

const formInitVal = { title: "", parentId: undefined };

const UserModule = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [modId, setModId] = useState(null);
  const { data, isFetching } = useGetModulesQuery({});
  const [moduleData, { isLoading: createLoading }] = useCreateModuleMutation();
  const [moduleUpData, { isLoading: updateLoading }] =
    useUpdateModuleMutation();
  const { data: singleData, isLoading: singleLoading } = useSingleModuleQuery(
    { id: modId },
    { skip: modId ? false : true }
  );
  const [deletId] = useDeleteModuleMutation();

  const createHanler = async (values: any, actions: any) => {
    try {
      let res: any;
      if (modId === null) {
        res = await moduleData({
          title: values?.title,
          parentId: parseInt(values?.parentId),
        });
      } else {
        res = await moduleUpData({
          id: modId,
          title: values?.title,
          parentId: parseInt(values?.parentId),
        });
      }

      if (!res?.error) {
        message.success(`Module ${modId ? "update" : "create"} successfully.`);
        if (modId === null) {
          actions.resetForm();
        }
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

  const moduleOption = data?.map((item: any) => {
    return {
      label: item?.title,
      value: item?.id.toString(),
    };
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
    // total: data?.totalItems,
    showTotal: (total: number, range: any) =>
      `${range[0]} to ${range[1]} of ${total}`,
  };

  const confirm = async (id: any) => {
    try {
      const res: any = await deletId({
        id: id,
      });
      if (!res?.error) {
        message.success("Module delete successfully.");
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

  const columns: ColumnsType<DataType> = [
    {
      title: "Module Name",
      dataIndex: "user",
      render: (_, record) => {
        return (
          <Link to="/user/29" className="flex items-center gap-4">
            <span className="line-clamp-1">{record?.title}</span>
          </Link>
        );
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      align: "right",
      render: (_, record) => {
        return (
          <div className="flex items-center justify-end gap-3">
            <button onClick={() => setModId(record?.id)}>
              <FiEdit className="text-base" />
            </button>
            <Popconfirm
              placement="topLeft"
              title={<span>Are you sure to delete this task?</span>}
              description=" "
              onConfirm={() => confirm(record?.id)}
              okText="Yes"
              cancelText="No"
            >
              <button>
                <FiTrash2 className="hover:text-secondary cursor-pointer" />
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
        <p>Users Module </p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Users Role</h4>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>
      <div className="grid grid-cols-2 xl:grid-cols-[650px_930px] gap-5 mb-8 mt-4">
        <div>
          <Table
            rowKey={`id`}
            columns={columns}
            dataSource={data}
            pagination={paginationOptions}
            className="user_role_table border"
            loading={isFetching}
          />
        </div>
        <div className="border">
          <Formik
            initialValues={singleData ?? formInitVal}
            enableReinitialize={true}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("Title is required"),
            })}
            onSubmit={(values: any, actions: any) => {
              createHanler(values, actions);
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
                  <div>
                    <div className="flex items-center justify-between bg-[#F6F7FA] px-[14px] py-2">
                      <h5 className="uppercase ">
                        {modId ? "Update" : "New"} Module
                      </h5>
                      <div className="">
                        {!createLoading ? (
                          <button
                            type="submit"
                            className={`btn btn-primary`}
                            onClick={handleSubmit}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className={`btn btn-primary w-[65px] disabled`}
                          >
                            <Spin className="h-4 w-5" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="mb-4 mt-5  px-[14px] py-2">
                      <label htmlFor="" className="text-base font-semibold">
                        Title
                        <span className="text-danger">*</span>
                      </label>
                      <Field
                        type="text"
                        name="title"
                        placeholder="Module title"
                        className="border mt-1 px-2 py-1"
                      />
                      {errors?.title && touched?.title ? (
                        <div className="error">{errors?.title}</div>
                      ) : null}
                    </div>
                    <div className="px-[14px] py-2">
                      <label htmlFor="" className="text-base font-semibold">
                        Parent Module
                      </label>
                      <Select
                        defaultValue={values?.parentId?.toString()}
                        placeholder="Parent Module"
                        className="w-full"
                        options={moduleOption}
                        value={
                          values?.parentId && values?.parentId !== ""
                            ? values?.parentId.toString()
                            : undefined
                        }
                        onChange={(val) => setFieldValue("parentId", val)}
                      />
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
      </div>
    </div>
  );
};

export default UserModule;
