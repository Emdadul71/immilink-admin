import { Popconfirm, Select, Spin, message } from "antd";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { FiChevronRight, FiEdit, FiTrash2 } from "react-icons/fi";
import * as Yup from "yup";
import { useGetModulesQuery } from "../../../appstore/user/role_management/module/module_api";
import {
  useCreatePermissionMutation,
  useDeletePermissionMutation,
  useGetPermissionsQuery,
  useSinglePermissionQuery,
  useUpdatePermissionMutation,
} from "../../../appstore/user/role_management/permission/permission_api";

const UserPermissions = () => {
  const [responseErrors, setResponseErrors] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [perId, setPerId] = useState(null);
  const { data, isFetching } = useGetModulesQuery({});

  const { data: singleData, isLoading: singleLoading } =
    useSinglePermissionQuery({ id: perId }, { skip: perId ? false : true });
  const { data: allPermissions, isLoading } = useGetPermissionsQuery({});
  const [permissionData, { isLoading: createLoading }] =
    useCreatePermissionMutation();
  const [updateData, { isLoading: updateLoading }] =
    useUpdatePermissionMutation();

  const [deletId] = useDeletePermissionMutation();

  const moduleOption = data?.map((item: any) => {
    return {
      label: item?.title,
      value: item?.id.toString(),
    };
  });

  const mergedData =
    allPermissions &&
    allPermissions?.reduce((result: any, obj: any) => {
      const key = obj.moduleId;
      if (!result[key]) {
        result[key] = {
          moduleName: obj.module.title,
          moduleId: obj.moduleId,
          permissions: [],
        };
      }
      result[key].permissions.push(obj);

      return result;
    }, {});

  const permissionList = mergedData && Object.values(mergedData);
  console.log(permissionList);

  const createHanler = async (values: any, actions: any) => {
    const res: any = await permissionData({
      name: values?.name,
      moduleId: parseInt(values.moduleId),
    });

    setResponseErrors(res?.error?.data.message);
    if (!res?.error) {
      message.success("Permission create successfully.");
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
      }
    }
  };

  const updateHanler = async (values: any) => {
    const res: any = await updateData({
      id: perId,
      name: values?.name,
      moduleId: values.moduleId,
    });

    if (!res?.error) {
      message.success("Permission update successfully.");
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
        message.success("Permission delete successfully.");
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
        <p>Permissions </p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Permissions Management</h4>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>
      <div className="grid grid-cols-[1030px_550px] gap-5 mb-8 mt-4">
        <div className="flex flex-col gap-4">
          <div className="">
            {!isLoading ? (
              <>
                {permissionList?.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {permissionList.map((item: any, i: any) => {
                      return (
                        <div className="p-[14px] bg-[#F6F7FA] rounded" key={i}>
                          <p className="text-base font-semibold mb-[10px]">
                            {item?.moduleName}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {item?.permissions?.map((item: any, i: any) => (
                              <div
                                key={i}
                                className="flex rounded cursor-pointer action_wrapper items-center gap-[10px] px-[10px] py-[5px] bg-[#FFFFFF] text-black  hover:bg-primary hover:text-white transition-all"
                              >
                                <span> {item?.name}</span>
                                <div className="flex gap-2 action_btn">
                                  <button
                                    onClick={() => {
                                      setEditMode(true);
                                      setPerId(item?.id);
                                    }}
                                  >
                                    <FiEdit className="hover:text-secondary cursor-pointer" />
                                  </button>

                                  <Popconfirm
                                    placement="topLeft"
                                    title={
                                      <span>
                                        Are you sure to delete this task?
                                      </span>
                                    }
                                    description=" "
                                    onConfirm={() => confirm(item?.id)}
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    <FiTrash2 className="hover:text-secondary cursor-pointer" />
                                  </Popconfirm>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-2xl text-gray-500 text-center py-4">
                    Permission not found !
                  </p>
                )}
              </>
            ) : (
              <div className="text-center py-4">
                <Spin size="large" />
              </div>
            )}
          </div>
        </div>
        <div>
          {!editMode ? (
            <Formik
              initialValues={{ name: "", moduleId: undefined }}
              enableReinitialize={true}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Name is required"),
                moduleId: Yup.string().required("Module is required"),
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
                  <div className="">
                    <div className="flex items-center justify-between bg-[#F6F7FA] px-[14px] py-2">
                      <h5 className="uppercase ">New Permissions</h5>
                      {!createLoading ? (
                        <button
                          onClick={(e) => {
                            handleSubmit();
                            e.preventDefault();
                          }}
                          className="btn btn-primary"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className={`btn btn-secondary  disabled w-[64px]`}
                        >
                          <Spin className="h-5 w-5" />
                        </button>
                      )}
                    </div>

                    <div className="px-[14px] py-2 h-[calc(100vh-200px)] overflow-auto user_role_rules">
                      <div className="mb-4 mt-5">
                        <label htmlFor="" className="text-base font-semibold">
                          Permission Name
                          <span className="text-danger">*</span>
                        </label>
                        <div>
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
                      </div>
                      <div className="gap-[30px]">
                        <label htmlFor="" className="font-medium mr-1 block">
                          Modules<span className="text-danger">*</span>
                        </label>

                        <div>
                          <Select
                            placeholder="Modules"
                            className="w-full"
                            options={moduleOption}
                            value={
                              values?.moduleId && values?.moduleId !== ""
                                ? values?.moduleId
                                : undefined
                            }
                            onChange={(val) => setFieldValue("moduleId", val)}
                          />
                          {errors?.moduleId && touched?.moduleId ? (
                            <div className="error">{errors?.moduleId}</div>
                          ) : null}
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <Formik
              initialValues={singleData}
              enableReinitialize={true}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Name is required"),
                moduleId: Yup.string().required("Module is required"),
              })}
              onSubmit={(values: any, actions: any) => {
                updateHanler(values);
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
                    <div className="">
                      <div className="flex items-center justify-between bg-[#F6F7FA] px-[14px] py-4">
                        <h5 className="uppercase ">Update Permission</h5>
                        {!updateLoading ? (
                          <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={(e) => {
                              handleSubmit();
                              e.preventDefault();
                            }}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className={`btn btn-secondary mt-5 disabled w-[134px]`}
                          >
                            <Spin className="h-5 w-5" />
                          </button>
                        )}
                        {/* <button className="btn btn-primary">Save</button> */}
                      </div>
                      <div className="px-[14px] py-2 h-[calc(100vh-200px)] overflow-auto user_role_rules">
                        <div className="mb-4 mt-5">
                          <label htmlFor="" className="text-base font-semibold">
                            Permission Name
                            <span className="text-danger">*</span>
                          </label>
                          <div>
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
                        </div>
                        <div className="gap-[30px]">
                          <label htmlFor="" className="font-medium mr-1 block">
                            Modules<span className="text-danger">*</span>
                          </label>

                          <div>
                            <Select
                              defaultValue={values?.moduleId?.toString()}
                              placeholder="Modules"
                              className="w-full"
                              options={moduleOption}
                              value={
                                values?.moduleId && values?.moduleId !== ""
                                  ? values?.moduleId?.toString()
                                  : undefined
                              }
                              onChange={(val) => setFieldValue("moduleId", val)}
                            />
                            {errors?.moduleId && touched?.moduleId ? (
                              <div className="error">{errors?.moduleId}</div>
                            ) : null}
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="min-h-[300px] flex justify-center items-center">
                      <Spin size="large" />
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPermissions;
