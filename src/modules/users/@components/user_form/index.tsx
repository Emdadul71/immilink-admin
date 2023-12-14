import { useGetAllDesignationQuery } from "@/appstore/user/designation/designation_api";
import { useGetRolesQuery } from "@/appstore/user/role_management/role/role_api";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "@/appstore/user/user_api";
import { Select, Spin, message } from "antd";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { userUpdateValidationSchema, userValidationSchema } from "../../helper";

const UserForm = ({ editData, handleCancel }: any) => {
  const [type, setType] = useState("password");
  const [createUser, { isLoading: createLoading }] = useCreateUserMutation();
  const [updateUser, {}] = useUpdateUserMutation();
  const { data } = useGetAllDesignationQuery({
    page: 1,
    limit: 100,
  });
  const { data: roleList, isFetching } = useGetRolesQuery({});

  const parentDesignation = data?.data?.map((item: any) => {
    return {
      label: item?.title,
      value: item?.id,
    };
  });
  const roleOption = roleList?.map((item: any) => {
    return {
      label: item?.name,
      value: item?.id,
    };
  });

  const formInit = {
    name: editData?.name ?? "",
    username: editData?.username ?? "",
    email: editData?.email ?? "",
    password: editData?.password ?? "",
    designationId: editData?.designationId ?? undefined,
    roleIds: editData?.roles
      ? editData?.roles.map((item: any) => {
          return item?.id;
        })
      : [],
  };

  const createHandler = async (values: any, actions: any) => {
    let res: any;
    if (editData === null) {
      res = await createUser({
        name: values?.name,
        username: values?.username,
        email: values?.email,
        password: values?.password,
        designationId: values?.designationId,
        roleIds: values?.roleIds,
      });
    } else {
      res = await updateUser({
        id: editData?.id,
        name: values?.name,
        username: values?.username,
        email: values?.email,
        designationId: values?.designationId,
        roleIds: values?.roleIds,
      });
    }
    if (!res?.error) {
      message.success(`User ${editData ? "update" : "create"} successfully.`);
      handleCancel();
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

  return (
    <div className="px-6 py-4">
      <Formik
        initialValues={formInit}
        enableReinitialize={true}
        validationSchema={
          editData === null ? userValidationSchema : userUpdateValidationSchema
        }
        onSubmit={(values: any, actions: any) => {
          createHandler(values, actions);
        }}
      >
        {({ handleSubmit, setFieldValue, errors, values, touched }: any) => (
          <Form>
            <div className="grid grid-cols-1 gap-x-8 gap-y-5">
              <div className="w-full">
                <label htmlFor="">
                  Name <span className="text-danger">*</span>
                </label>
                <div>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name"
                    className=" border px-3 py-1"
                  />
                  {errors?.name && touched?.name ? (
                    <div className="error">{errors?.name}</div>
                  ) : null}
                </div>
              </div>

              <div className="w-full">
                <label htmlFor="">
                  Username <span className="text-danger">*</span>
                </label>
                <div>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter Username"
                    className=" border px-3 py-1"
                  />
                  {errors?.username && touched?.username ? (
                    <div className="error">{errors?.username}</div>
                  ) : null}
                </div>
              </div>

              <div className="w-full">
                <label htmlFor="">
                  Email <span className="text-danger">*</span>
                </label>
                <div>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    className=" border px-3 py-1"
                  />
                  {errors?.email && touched?.email ? (
                    <div className="error">{errors?.email}</div>
                  ) : null}
                </div>
              </div>

              {editData === null && (
                <div className="w-full">
                  <label htmlFor="">
                    Password <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <Field
                      type={`${type}`}
                      name="password"
                      className=" border px-3 py-1"
                      placeholder="Password"
                      value={values?.password ?? ""}
                      autoComplete="new-password"
                    />

                    <div
                      className="eye_icons"
                      onClick={() =>
                        setType(type == "password" ? "text" : "password")
                      }
                    >
                      {type === "password" && (
                        <AiOutlineEyeInvisible className="text-xl" />
                      )}
                      {type == "text" && <AiOutlineEye className="text-xl" />}
                    </div>
                  </div>
                  {errors?.password && touched?.password ? (
                    <div className="error">{errors?.password}</div>
                  ) : null}
                </div>
              )}

              <div className="w-full">
                <label htmlFor="slug">Designation</label>{" "}
                <span className="text-danger">*</span>
                <Select
                  placeholder="Designation"
                  style={{ width: "100%", borderRadius: 0 }}
                  className="py-1"
                  options={parentDesignation}
                  value={
                    values?.designationId && values?.designationId !== undefined
                      ? values?.designationId
                      : undefined
                  }
                  onChange={(val: any) => setFieldValue("designationId", val)}
                />
                {errors?.designationId && touched?.designationId ? (
                  <div className="error">{errors?.designationId}</div>
                ) : null}
              </div>

              <div className="w-full">
                <label htmlFor="slug">Role</label>
                <Select
                  mode="multiple"
                  placeholder="Designation"
                  style={{ width: "100%", borderRadius: 0 }}
                  className="py-1"
                  options={roleOption}
                  value={
                    values?.roleIds && values?.roleIds !== undefined
                      ? values?.roleIds
                      : undefined
                  }
                  onChange={(val: any) => setFieldValue("roleIds", val)}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancel}
                  type="button"
                  className="btn btn-grey"
                >
                  Cancel
                </button>
                {!createLoading ? (
                  <button
                    className="btn btn-secondary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    {editData ? "UPDATE" : "ADD"} USER
                  </button>
                ) : (
                  <button className={`btn btn-primary w-[102px] disabled`}>
                    <Spin className="h-4 w-5" />
                  </button>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
