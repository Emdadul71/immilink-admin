import { useLazyLeadExportQuery } from "@/appstore/excel_export/excel_export";
import { exportToXLSX } from "@/helpers/xlsxExport";
import { DatePicker, Modal } from "antd";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
const { RangePicker } = DatePicker;

export const validationSchema = Yup.object().shape({
  startDate: Yup.string().required("Date is required"),
});

const LeadExport = ({ exportDrawer, setExportDrawer }: any) => {
  const [filteredData] = useLazyLeadExportQuery();
  const formIni = {
    skip: null,
    limit: null,
    startDate: null,
    endDate: null,
  };

  const exportHandler = async (values: any) => {
    filteredData({
      page: values.skip,
      limit: values.limit,
      startDate: values.startDate,
      endDate: values.endDate,
      leadType: "Lead",
    }).then((res: any) => {
      console.log("res", res);
      exportToXLSX(res?.data);
      setExportDrawer(false);
    });
  };
  return (
    <div>
      <Modal
        title={
          <div className="flex items-center gap-2 px-6 py-4 border-b">
            <span>Export Leads</span>
          </div>
        }
        open={exportDrawer}
        width={"100%"}
        style={{ maxWidth: 512, width: "100%", padding: 0 }}
        onCancel={() => setExportDrawer(false)}
        footer={false}
      >
        <div className="p-4">
          <Formik
            initialValues={formIni}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              exportHandler(values);
            }}
          >
            {({ handleSubmit, setFieldValue, errors, values, touched }) => (
              <Form className="w-full">
                <div className="">
                  <div className="mb-4">
                    <label htmlFor="" className="input_label block">
                      Dates
                    </label>
                    <div>
                      <RangePicker
                        className="media_search_date"
                        onChange={(data: any, dateString) => {
                          setFieldValue("startDate", dateString[0]);
                          setFieldValue("endDate", dateString[1]);
                          console.log(dateString[0]);
                        }}
                      />
                    </div>
                    {errors?.startDate && touched?.startDate ? (
                      <div className="error">{errors?.startDate}</div>
                    ) : null}
                  </div>
                  <div className="mb-5">
                    <label htmlFor="" className="input_label block">
                      Data limit
                    </label>
                    <div className="flex gap-2">
                      <Field
                        type="number"
                        name="skip"
                        id="skip"
                        placeholder="skip"
                        className="input_field"
                      />

                      <Field
                        type="number"
                        name="limit"
                        id="limit"
                        placeholder="Limit"
                        className="input_field"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-5">
                    <button
                      onClick={() => setExportDrawer(false)}
                      type="button"
                      className="btn btn-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) => {
                        handleSubmit();
                        e.preventDefault();
                      }}
                      type="submit"
                      className="btn btn-primary"
                    >
                      {/* {isLoading && (
                      <Spin
                        className="custom_spinner h-6"
                        style={{ color: "#fff" }}
                      />
                    )} */}
                      Export
                    </button>
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

export default LeadExport;
