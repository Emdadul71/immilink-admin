import {
  useCreateTeamLevelMutation,
  useGetTeamLevelQuery,
  useUpdateTeamLevelMutation,
} from "@/appstore/team/team_level/team_level";
import { teamLevelValidationSchema } from "@/modules/team/helper";
import { Select, Spin, message } from "antd";
import { Field, Form, Formik } from "formik";

const TeamLevelForm = ({ handleCancel, editData, singleLoading }: any) => {
  const [createTeamLevel, { isLoading }] = useCreateTeamLevelMutation();
  const [updateData] = useUpdateTeamLevelMutation();

  const { data } = useGetTeamLevelQuery({
    name: "",
    page: 1,
    limit: 20,
  });

  const parentOptions = data?.data?.map((item: any) => {
    return {
      value: item?.id,
      label: item?.name,
    };
  });
  const formInt = { name: "", parentId: undefined, orderPosition: "" };

  const createHandler = async (values: any, actions: any) => {
    let res: any;
    if (editData === null) {
      res = await createTeamLevel({
        name: values.name,
        parentId: values.parentId,
        orderPosition:
          values.orderPosition !== "" ? parseInt(values.orderPosition) : null,
        status: "ACTIVE",
      });
    } else {
      res = await updateData({
        id: editData?.id,
        name: values.name,
        parentId: values.parentId,
        orderPosition: parseInt(values.orderPosition),
        status: "ACTIVE",
      });
    }

    if (!res?.error) {
      message.success(
        `Category ${editData ? "update" : "create"} successfully.`
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
    <>
      <Formik
        initialValues={editData ?? formInt}
        enableReinitialize={true}
        validationSchema={teamLevelValidationSchema}
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
                    placeholder="Name"
                  />
                  {errors?.name && touched?.name ? (
                    <div className="error">{errors?.name}</div>
                  ) : null}
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="slug">Parent Level</label>
                <Select
                  placeholder="Parent Level"
                  style={{ width: "100%", borderRadius: 0 }}
                  className="py-1"
                  options={parentOptions}
                  value={
                    values?.parentId && values?.parentId !== undefined
                      ? values?.parentId
                      : undefined
                  }
                  onChange={(val: any) => setFieldValue("parentId", val)}
                />
              </div>
              <div className="w-full">
                <label htmlFor="">
                  Order position <span className="text-danger">*</span>
                </label>
                <div>
                  <Field
                    name="orderPosition"
                    type="number"
                    className=" border px-3 py-1 w-full"
                    placeholder="Order position"
                    value={
                      values?.orderPosition && values.orderPosition !== null
                        ? values?.orderPosition
                        : ""
                    }
                    onChange={(e: any) => {
                      setFieldValue("orderPosition", e.target.value);
                    }}
                  />
                  {errors?.orderPosition && touched?.orderPosition ? (
                    <div className="error">{errors?.orderPosition}</div>
                  ) : null}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancel}
                  type="button"
                  className="btn btn-grey"
                >
                  Cancel
                </button>
                {!isLoading ? (
                  <button
                    className="btn btn-secondary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    {editData ? "UPDATE" : "ADD"} TEAM LEVEL
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
    </>
  );
};

export default TeamLevelForm;
