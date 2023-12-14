import React from "react";
import TextEditor from "../../@common/editor/bdwinners_editor";
import { FiChevronRight } from "react-icons/fi";
import { Collapse, Select } from "antd";
import { HiPlus } from "react-icons/hi";
import { Field } from "formik";

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const PageAdd = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <p>Dashboard</p>
        <FiChevronRight />
        <p>Add New Page</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Add New Page</h4>
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
              placeholder="Add title"
              className="border mt-1 px-2 py-1"
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="title" className="font-semibold">
              Sub Headding
            </label>
            <input
              type="text"
              name="title"
              placeholder="Add Sub Heading"
              className="border mt-1 px-2 py-1"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="title" className="font-semibold inline-block mb-2">
              Description
            </label>
            <TextEditor />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="title" className="font-semibold">
              Keywords
            </label>
            <input
              type="text"
              name="title"
              placeholder="Keywords"
              className="border mt-1 px-2 py-1"
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="title" className="font-semibold">
              Meta Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Meta Title"
              className="border mt-1 px-2 py-1"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="title" className="font-semibold">
              Meta Description
            </label>
            <textarea
              name="title"
              rows={8}
              placeholder="Type here"
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
              className="add_new_page"
            >
              <Panel header="Publish" key="1">
                <div className="grid grid-cols-[100px_4fr] gap-[30px]">
                  <label htmlFor="" className="font-semibold mr-1">
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

                <div className="flex justify-center">
                  <button className="btn btn-secondary mt-3">
                    SAVE & PUBLISH
                  </button>
                </div>
              </Panel>
            </Collapse>
          </div>
          <div className="mb-3">
            <Collapse
              defaultActiveKey={["1"]}
              onChange={onChange}
              expandIconPosition="end"
              className="add_new_page"
            >
              <Panel header="Post Attributes" key="1">
                <div className="grid grid-cols-[57px_1fr] items-center gap-[30px] mb-3">
                  <label htmlFor="" className="font-semibold mr-1">
                    Parent
                  </label>

                  <Select
                    defaultValue="Draft"
                    style={{ width: "100%" }}
                    options={[
                      { value: "draft", label: "Draft" },
                      { value: "public", label: "Public" },
                    ]}
                  />
                </div>
                <div className="grid grid-cols-[57px_1fr] items-center gap-[30px] mb-3">
                  <label htmlFor="" className="font-semibold mr-1">
                    Template
                  </label>

                  <Select
                    defaultValue="Default template"
                    style={{ width: "100%" }}
                    options={[
                      { value: "draft", label: "Draft" },
                      { value: "public", label: "Public" },
                    ]}
                  />
                </div>
                <div className="grid grid-cols-[57px_1fr] items-center gap-[30px] mb-3">
                  <label htmlFor="" className="font-semibold mr-1">
                    Order
                  </label>

                  <input
                    type="text"
                    name="title"
                    placeholder="0"
                    className="border mt-1 px-2 py-1 w-full"
                  />
                </div>
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
              <Panel header="Page Template" key="1">
                <div className="grid grid-cols-[60px_1fr] items-center gap-[30px]">
                  <label htmlFor="" className="font-medium mr-1">
                    Template
                  </label>

                  <Select
                    defaultValue="Default template"
                    style={{ width: "100%" }}
                    options={[
                      { value: "Default template", label: "Default template" },
                      { value: "public", label: "Public" },
                    ]}
                  />
                </div>
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

export default PageAdd;
