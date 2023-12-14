import { Spin, message } from "antd";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useSignInMutation } from "../../../appstore/auth/auth_api";

const Login = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [signIn, { isLoading }] = useSignInMutation();

  const signinHandler = async (values: any) => {
    try {
      const res: any = await signIn({
        username: values.username,
        password: values.password,
      });
      if (res.error) {
        if (res.error.status === 401) {
          message.error(res.error.data.message);
        } else {
          message.error("Something went wront. Please try again!");
        }
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {}
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("User Name or Email is required"),
    password: Yup.string().required("Password is required"),
  });
  return (
    <div className="p-8 min-h-screen overflow-auto grid place-content-center">
      <div className="auth_h_screen grid lg:grid-cols-[1fr_550px] xl:grid-cols-[1fr_650px] lg:gap-6 xl:gap-12">
        <div className="hidden lg:flex lg:items-center xl:items-end justify-center bg-[#F8F7FA] rounded-2xl pt-10">
          <img src="/images/misc/login.webp" alt="login" />
        </div>

        <div className="flex flex-col h-full items-center justify-center p-5 md:p-12 md:px-[70px] lg:p-12">
          <div className="mb-10 text-center">
            <div className="mb-8 flex justify-center">
              <img src="/images/misc/logo.png" alt="Moves International Logo" />
            </div>
            <h4 className="mb-2">Welcome to Immi Link</h4>
          </div>

          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              signinHandler(values);
            }}
          >
            {({ handleSubmit, errors, values, touched }) => (
              <Form className="w-full">
                <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                  <div className="form_group col-span-2">
                    <label htmlFor="">
                      User Name
                      <span className="astrisk">*</span>
                    </label>
                    <Field
                      type="text"
                      name="username"
                      className={
                        errors?.username && touched?.username && "error"
                      }
                      placeholder="User Name"
                      value={values?.username ?? ""}
                    />
                    {errors?.username && touched?.username ? (
                      <div className="error">{errors?.username}</div>
                    ) : null}
                  </div>
                  <div className="form_group col-span-2 relative">
                    <label htmlFor="">
                      Password <span className="astrisk">*</span>
                    </label>
                    <Link
                      to="/forgot-password"
                      className="font-normal text-sm  text-[#7367f0] absolute right-0 top-[-20px]  hover:underline"
                    >
                      Forgot Password?
                    </Link>
                    <div className="relative">
                      <Field
                        type={`${type}`}
                        name="password"
                        className={`${
                          errors?.password && touched?.password ? "error" : ""
                        } !pr-11`}
                        placeholder="Password"
                        value={values?.password ?? ""}
                      />
                      <div
                        className="password_view"
                        onClick={() =>
                          setType(type == "password" ? "text" : "password")
                        }
                      >
                        {type === "password" ? (
                          <AiOutlineEyeInvisible className="text-xl" />
                        ) : (
                          <AiOutlineEye className="text-xl" />
                        )}
                      </div>
                    </div>
                    {errors?.password && touched?.password ? (
                      <div className="error">{errors?.password}</div>
                    ) : null}
                  </div>
                </div>

                {!isLoading ? (
                  <button
                    onClick={() => handleSubmit}
                    type="submit"
                    className="btn btn-primary w-full mt-5 mb-4 py-3.5  rounded-lg"
                  >
                    Sign In
                  </button>
                ) : (
                  <button className="btn btn-primary w-full mt-5 mb-4 py-3 rounded-lg disabled">
                    <Spin />
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
