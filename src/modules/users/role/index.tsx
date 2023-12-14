import { useGetPermissionsQuery } from "@/appstore/user/role_management/permission/permission_api";
import { Popconfirm, Table, message, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Field, Form, Formik } from "formik";
import React, { ReactNode, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FiChevronRight, FiEdit, FiTrash2 } from "react-icons/fi";
import * as Yup from "yup";
import {
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useGetRolesQuery,
  useGetSingleRoleQuery,
  useUpdateRoleMutation,
} from "../../../appstore/user/role_management/role/role_api";

const forminit = { name: "", permissions: [] };

interface DataType {
  key: React.Key;
  id: any;
  name: string;
  action?: ReactNode;
}

const UserRole = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const { data, isFetching } = useGetRolesQuery({});
  const [rolId, setRolId] = useState(null);
  const { data: allPermissions, isLoading: perLoading } =
    useGetPermissionsQuery({});
  const { data: singleData, isLoading: singleLoading } = useGetSingleRoleQuery(
    { id: rolId },
    { skip: rolId ? false : true }
  );

  const [roleData, { isLoading }] = useCreateRoleMutation();
  const [updateData, { isLoading: updateLoading }] = useUpdateRoleMutation();

  const [deletId] = useDeleteRoleMutation();
  //permission data perpire
  const mergedData =
    allPermissions &&
    allPermissions?.reduce((result: any, obj: any) => {
      const key = obj.moduleId;
      if (!result[key]) {
        result[key] = {
          moduleId: obj.moduleId,
          moduleName: obj.module.title,
          permissions: [],
        };
      }
      result[key].permissions.push(obj);

      return result;
    }, {});

  const permissionList = mergedData && Object.values(mergedData);

  // **pagination** \\
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
    total: data?.length,
    showTotal: (total: number, range: any) =>
      `${range[0]} to ${range[1]} of ${total}`,
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Role Name",
      dataIndex: "user",

      render: (_, record) => {
        return <span className="line-clamp-1">{record?.name}</span>;
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      align: "right",
      render: (_, record) => {
        return (
          <div className="flex items-center justify-end gap-3">
            <button onClick={() => setRolId(record.id)}>
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
              <FiTrash2 className="hover:text-secondary cursor-pointer" />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const createHanler = async (values: any, actions: any) => {
    let res: any;

    if (rolId) {
      res = await updateData({
        id: rolId,
        name: values?.name,
        permissionIds: values?.permissions.map((ids: any) => parseInt(ids)),
      });
    } else {
      res = await roleData({
        name: values?.name,
        permissionIds: values?.permissions.map((ids: any) => parseInt(ids)),
      });
    }
    console.log(res);

    if (!res?.error) {
      message.success(`Role ${rolId ? "update" : "create"} successfully.`);
      if (!rolId) {
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
  };
  const confirm = async (id: any) => {
    try {
      const res: any = await deletId({
        id: id,
      });
      if (!res?.error) {
        message.success("Role delete successfully.");
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

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <p>Dashboard</p>
        <FiChevronRight />
        <p>Users Role</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Users Role</h4>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>
      <div className="grid grid-cols-[650px_930px] gap-5 mb-8 mt-4">
        <div>
          <Table
            rowKey={`id`}
            columns={columns}
            dataSource={data}
            loading={isFetching}
            pagination={paginationOptions}
            className="user_role_table border"
          />
        </div>
        <div className="border">
          <Formik
            initialValues={singleData ?? forminit}
            enableReinitialize={true}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required"),
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
                        {rolId ? "Update" : "New"} Rules
                      </h5>
                      {!isLoading ? (
                        <button
                          onClick={(e) => {
                            handleSubmit();
                            e.preventDefault();
                          }}
                          className="btn btn-primary"
                        >
                          {rolId ? "Update" : "Save"}
                        </button>
                      ) : (
                        <button
                          className={`btn btn-secondary  disabled w-[64px]`}
                        >
                          <CgSpinner className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    <div className="px-[14px] py-2 h-[calc(100vh-280px)] overflow-auto user_role_rules mb-4">
                      <div className="mb-4 mt-5">
                        <label htmlFor="" className="text-base font-semibold">
                          Role Name <span className="text-danger">*</span>
                        </label>
                        <Field
                          type="text"
                          name="name"
                          placeholder="Add Title"
                          className="border mt-1 px-2 py-1"
                        />
                        {errors?.name && touched?.name ? (
                          <div className="error">{errors?.name}</div>
                        ) : null}
                      </div>
                      {permissionList?.map((item: any, i: number) => {
                        return (
                          <div className=" mb-4" key={i}>
                            <p className="text-base font-semibold">
                              {item?.moduleName}
                            </p>
                            <div className="flex items-center gap-[5px] flex-wrap">
                              <div
                                className="flex items-center gap-2 flex-wrap"
                                role="group"
                                aria-labelledby="checkbox-group"
                              >
                                {item?.permissions?.map(
                                  (permission: any, i: number) => {
                                    return (
                                      <div
                                        className="border py-[5px] px-2 mt-[5px]"
                                        key={i}
                                      >
                                        <label className="flex gap-1 text-gray-500 text-[14px] cursor-pointer">
                                          <Field
                                            defaultChecked={
                                              values?.permissions &&
                                              values?.permissions.includes(
                                                item?.id
                                              )
                                                ? true
                                                : false
                                            }
                                            type="checkbox"
                                            name="permissions"
                                            value={permission?.id.toString()}
                                          />
                                          {permission?.name}
                                        </label>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="h-[100vh] flex justify-center items-center">
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

export default UserRole;
