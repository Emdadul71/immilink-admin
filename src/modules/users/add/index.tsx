import { useCreateUserMutation } from "@/appstore/user/user_api";
import { Select, Spin } from "antd";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiChevronRight, FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
const createLoading = false;
const UserAdd = () => {
  const [type, setType] = useState("password");
  const [userData] = useCreateUserMutation();

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <p>Dashboard</p>
        <FiChevronRight />
        <p>Add New User</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">ADD NEW USER</h4>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>

      <div className="max-w-[1000px] w-full">
        <Formik
          initialValues={{ initialValue: "" }}
          enableReinitialize={true}
          // validationSchema={validationSchema}
          onSubmit={(values: any, actions: any) => {
            console.log(values, actions);
          }}
        >
          {({ handleSubmit, setFieldValue, errors, values, touched }: any) => (
            <Form>
              <div className="grid grid-cols-1 gap-x-8 gap-y-5 mt-8">
                <div className="col-span-1">
                  <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                    <label htmlFor="">Name</label>
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
                </div>

                <div className="col-span-1">
                  <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                    <label htmlFor="">Username</label>
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
                </div>

                <div className="col-span-1">
                  <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                    <label htmlFor="email">Email</label>

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
                </div>
                <div className="col-span-1">
                  <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                    <label htmlFor="password">Password</label>

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
                      {errors?.password && touched?.password ? (
                        <div className="error">{errors?.password}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              {!createLoading ? (
                <button
                  type="submit"
                  className={`btn btn-secondary mt-5`}
                  onClick={handleSubmit}
                >
                  Save changes
                </button>
              ) : (
                <button className={`btn btn-secondary mt-5 disabled w-[134px]`}>
                  <Spin className="h-5 w-5" />
                </button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserAdd;
