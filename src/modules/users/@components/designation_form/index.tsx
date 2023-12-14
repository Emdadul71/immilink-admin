import { Select, Spin, message } from "antd";
import { Field, Form, Formik } from "formik";
import { validationSchema } from "../../helper";
import {
  useCreateDesignationMutation,
  useGetAllDesignationQuery,
  useUpdateDesignationMutation,
} from "@/appstore/user/designation/designation_api";

const DesignationForm = ({ editData, handleCancel }: any) => {
  const [createDesignation, { isLoading: createLoading }] =
    useCreateDesignationMutation();
  const [updateDesignation, {}] = useUpdateDesignationMutation();
  const { data } = useGetAllDesignationQuery({
    page: 1,
    limit: 100,
  });

  const parentDesignation = data?.data?.map((item: any) => {
    return {
      label: item?.title,
      value: item?.id,
    };
  });

  const formInit = { title: "", slug: "", parentId: undefined };

  const createHandler = async (values: any, actions: any) => {
    let res: any;
    if (editData === null) {
      res = await createDesignation({
        title: values.title,
        slug: values.slug,
        parentId: values.parentId,
      });
    } else {
      res = await updateDesignation({
        id: editData?.id,
        title: values?.title,
        slug: values?.slug,
        parentId: values.parentId,
      });
    }
    if (!res?.error) {
      message.success(
        `Designation ${editData ? "update" : "create"} successfully.`
      );
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
        initialValues={editData ?? formInit}
        enableReinitialize={true}
        validationSchema={validationSchema}
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
                    name="title"
                    type="text"
                    className=" border px-3 py-1 w-full"
                    placeholder="Enter Name"
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
                <label htmlFor="slug">Parent Designation</label>
                <Select
                  placeholder="Parent Designation"
                  style={{ width: "100%", borderRadius: 0 }}
                  className="py-1"
                  options={parentDesignation}
                  value={
                    values?.parentId && values?.parentId !== undefined
                      ? values?.parentId
                      : undefined
                  }
                  onChange={(val: any) => setFieldValue("parentId", val)}
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
                    {editData ? "UPDATE" : "ADD"} DESIGNATION
                  </button>
                ) : (
                  <button className={`btn btn-primary w-[162px] disabled`}>
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

export default DesignationForm;
