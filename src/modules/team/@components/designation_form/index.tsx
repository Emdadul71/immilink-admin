import {
  useCreateTeamDesignationMutation,
  useGetAllTeamDesignationQuery,
  useUpdateTeamDesignationMutation,
} from "@/appstore/team/designation/designation_api";
import { Select, Spin, message } from "antd";
import { Field, Form, Formik } from "formik";
import { designationValidationSchema } from "../../helper";

const DesignationForm = ({ editData, handleCancel }: any) => {
  const [createDesignation, { isLoading: createLoading }] =
    useCreateTeamDesignationMutation();
  const [updateDesignation, {}] = useUpdateTeamDesignationMutation();
  const { data } = useGetAllTeamDesignationQuery({
    page: 1,
    limit: 100,
  });

  const parentDesignation = data?.data?.map((item: any) => {
    return {
      label: item?.name,
      value: item?.id,
    };
  });

  const formInit = {
    name: "",
    slug: "",
    parentId: undefined,
    orderPosition: null,
  };

  const createHandler = async (values: any, actions: any) => {
    let res: any;
    if (editData === null) {
      res = await createDesignation({
        name: values.name,
        slug: values.slug,
        orderPosition: parseInt(values.orderPosition) ?? 0,
        parentId: values.parentId,
        status: "ACTIVE",
      });
    } else {
      res = await updateDesignation({
        id: editData?.id,
        name: values.name,
        slug: values.slug,
        orderPosition: parseInt(values.orderPosition) ?? 0,
        parentId: values.parentId,
        status: "ACTIVE",
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
        validationSchema={designationValidationSchema}
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
                    name="name"
                    type="text"
                    className=" border px-3 py-1 w-full"
                    placeholder="Enter Name"
                  />
                  {errors?.name && touched?.name ? (
                    <div className="error">{errors?.name}</div>
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
              <div className="w-full">
                <label htmlFor="slug">Order Position</label>
                <div>
                  <Field
                    name="orderPosition"
                    type="number"
                    className=" border px-3 py-1 w-full"
                    placeholder="Order Position"
                    value={
                      values?.orderPosition && values.orderPosition !== null
                        ? values?.orderPosition
                        : ""
                    }
                    onChange={(e: any) => {
                      setFieldValue("orderPosition", e.target.value);
                    }}
                  />
                </div>
                {errors?.orderPosition && touched?.orderPosition ? (
                  <div className="error">{errors?.orderPosition}</div>
                ) : null}
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
