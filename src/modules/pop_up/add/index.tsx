import { Collapse, Select } from "antd";
import { FiChevronRight } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";

const { Panel } = Collapse;

const AddPopUp = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2 mt-3">
        <p>Dashboard</p>
        <FiChevronRight />
        <p>New Pop Up</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Add New Pop Up</h4>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>

      <div className="grid grid-cols-[1fr_300px] gap-5 mb-8 mt-4">
        <div>
          <div className="flex flex-col ">
            <label htmlFor="title" className="font-semibold">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Add Title"
              className="border mt-1 px-2 py-1"
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="title" className="font-semibold">
              Pop Up Link
            </label>
            <input
              type="text"
              name="title"
              placeholder="Add Pop Up Link"
              className="border mt-1 px-2 py-1"
            />
          </div>
        </div>
        <div>
          <div className="mb-3">
            <Collapse
              defaultActiveKey={["1"]}
              onChange={onChange}
              expandIconPosition="end"
              className="add_post"
            >
              <Panel header="Publish" key="1">
                <div className="grid grid-cols-[100px_4fr] gap-[30px]">
                  <label htmlFor="" className="font-medium mr-1">
                    Status
                  </label>

                  <Select
                    defaultValue="Draft"
                    style={{ width: 120 }}
                    options={[
                      { value: "draft", label: "Draft" },
                      { value: "public", label: "Public" },
                    ]}
                  />
                </div>

                <button className="w-full btn btn-secondary mt-3">
                  SAVE & PUBLISH
                </button>
              </Panel>
            </Collapse>
          </div>

          <div className="mb-3">
            <Collapse
              defaultActiveKey={["1"]}
              onChange={onChange}
              expandIconPosition="end"
              className="add_post"
            >
              <Panel header="Featured Image" key="1">
                <div className="relative">
                  <img
                    src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                    alt=""
                  />
                  <div className="flex justify-center items-center text-white cursor-pointer w-[34px] h-[34px] bg-secondary rounded-full absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
                    <HiPlus />
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPopUp;
