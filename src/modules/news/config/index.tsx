import React, { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import TextEditor from "../../@common/editor/bdwinners_editor";
import { Collapse, Input, Radio, RadioChangeEvent, Select } from "antd";
import { BsPlusCircleFill } from "react-icons/bs";

const { Panel } = Collapse;

const Config = () => {
  const [value, setValue] = useState(1);
  const [value1, setValue1] = useState(4);

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const onChange2 = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  const onChange3 = (e: RadioChangeEvent) => {
    setValue1(e.target.value);
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

      <div className="grid grid-cols-[1fr_590px] gap-5 mb-8 mt-4">
        <div>
          <div className="mb-5">
            <Collapse
              defaultActiveKey={["1"]}
              onChange={onChange}
              expandIconPosition="end"
              className="add_new_page"
            >
              <Panel header="Title" key="1">
                <div className="flex justify-between mb-5">
                  <Radio.Group
                    onChange={onChange2}
                    value={value}
                    className="flex items-center justify-center"
                  >
                    <Radio value={1}>ID</Radio>
                    <Radio value={2}>Tag</Radio>
                    <Radio value={3}>Class</Radio>
                  </Radio.Group>

                  <div className="flex gap-4">
                    <Input placeholder="Tag name (Ex: div, meta)" />
                    <Input placeholder="Class or ID name" />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Radio.Group
                    onChange={onChange3}
                    value={value1}
                    className="flex items-center justify-center"
                  >
                    <Radio value={4}>ID</Radio>
                    <Radio value={5}>Tag</Radio>
                    <Radio value={6}>Class</Radio>
                  </Radio.Group>

                  <div className="flex gap-4">
                    <Input placeholder="Tag name (Ex: div, meta)" />
                    <Input placeholder="Class or ID name" />
                  </div>
                </div>
                <div className="flex justify-between mt-5">
                  <div className="flex items-center gap-3 cursor-pointer">
                    <BsPlusCircleFill className="text-secondary" />
                    <p className="text-secondary">Add More</p>
                  </div>
                  <button className="btn btn-white-outline">
                    Check preview
                  </button>
                </div>
              </Panel>
            </Collapse>
          </div>

          <div className="mb-5">
            <Collapse
              defaultActiveKey={["1"]}
              onChange={onChange}
              expandIconPosition="end"
              className="add_new_page"
            >
              <Panel header="Article" key="1">
                <div className="flex justify-between mb-5">
                  <Radio.Group
                    onChange={onChange2}
                    value={value}
                    className="flex items-center justify-center"
                  >
                    <Radio value={1}>ID</Radio>
                    <Radio value={2}>Tag</Radio>
                    <Radio value={3}>Class</Radio>
                  </Radio.Group>

                  <div className="flex gap-4">
                    <Input placeholder="Tag name (Ex: div, meta)" />
                    <Input placeholder="Class or ID name" />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Radio.Group
                    onChange={onChange3}
                    value={value1}
                    className="flex items-center justify-center"
                  >
                    <Radio value={4}>ID</Radio>
                    <Radio value={5}>Tag</Radio>
                    <Radio value={6}>Class</Radio>
                  </Radio.Group>

                  <div className="flex gap-4">
                    <Input placeholder="Tag name (Ex: div, meta)" />
                    <Input placeholder="Class or ID name" />
                  </div>
                </div>
                <div className="flex justify-between mt-5">
                  <div className="flex items-center gap-3 cursor-pointer">
                    <BsPlusCircleFill className="text-secondary" />
                    <p className="text-secondary">Add More</p>
                  </div>
                  <button className="btn btn-white-outline">
                    Check preview
                  </button>
                </div>
              </Panel>
            </Collapse>
          </div>

          <div className="mb-5">
            <Collapse
              defaultActiveKey={["1"]}
              onChange={onChange}
              expandIconPosition="end"
              className="add_new_page"
            >
              <Panel header="Category" key="1">
                <div className="flex justify-between mb-5">
                  <Radio.Group
                    onChange={onChange2}
                    value={value}
                    className="flex items-center justify-center"
                  >
                    <Radio value={1}>ID</Radio>
                    <Radio value={2}>Tag</Radio>
                    <Radio value={3}>Class</Radio>
                  </Radio.Group>

                  <div className="flex gap-4">
                    <Input placeholder="Tag name (Ex: div, meta)" />
                    <Input placeholder="Class or ID name" />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Radio.Group
                    onChange={onChange3}
                    value={value1}
                    className="flex items-center justify-center"
                  >
                    <Radio value={4}>ID</Radio>
                    <Radio value={5}>Tag</Radio>
                    <Radio value={6}>Class</Radio>
                  </Radio.Group>

                  <div className="flex gap-4">
                    <Input placeholder="Tag name (Ex: div, meta)" />
                    <Input placeholder="Class or ID name" />
                  </div>
                </div>
                <div className="flex justify-between mt-5">
                  <div className="flex items-center gap-3 cursor-pointer">
                    <BsPlusCircleFill className="text-secondary" />
                    <p className="text-secondary">Add More</p>
                  </div>
                  <button className="btn btn-white-outline">
                    Check preview
                  </button>
                </div>
              </Panel>
            </Collapse>
          </div>

          <div className="mb-5">
            <Collapse
              defaultActiveKey={["1"]}
              onChange={onChange}
              expandIconPosition="end"
              className="add_new_page"
            >
              <Panel header="Image" key="1">
                <div className="flex justify-between mb-5">
                  <Radio.Group
                    onChange={onChange2}
                    value={value}
                    className="flex items-center justify-center"
                  >
                    <Radio value={1}>ID</Radio>
                    <Radio value={2}>Tag</Radio>
                    <Radio value={3}>Class</Radio>
                  </Radio.Group>

                  <div className="flex gap-4">
                    <Input placeholder="Tag name (Ex: div, meta)" />
                    <Input placeholder="Class or ID name" />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Radio.Group
                    onChange={onChange3}
                    value={value1}
                    className="flex items-center justify-center"
                  >
                    <Radio value={4}>ID</Radio>
                    <Radio value={5}>Tag</Radio>
                    <Radio value={6}>Class</Radio>
                  </Radio.Group>

                  <div className="flex gap-4">
                    <Input placeholder="Tag name (Ex: div, meta)" />
                    <Input placeholder="Class or ID name" />
                  </div>
                </div>
                <div className="flex justify-between mt-5">
                  <div className="flex items-center gap-3 cursor-pointer">
                    <BsPlusCircleFill className="text-secondary" />
                    <p className="text-secondary">Add More</p>
                  </div>
                  <button className="btn btn-white-outline">
                    Check preview
                  </button>
                </div>
              </Panel>
            </Collapse>
          </div>
          <div className="mb-5">
            <Collapse
              defaultActiveKey={["1"]}
              onChange={onChange}
              expandIconPosition="end"
              className="add_new_page"
            >
              <Panel header="Summary" key="1">
                <div className="flex justify-between mb-5">
                  <Radio.Group
                    onChange={onChange2}
                    value={value}
                    className="flex items-center justify-center"
                  >
                    <Radio value={1}>ID</Radio>
                    <Radio value={2}>Tag</Radio>
                    <Radio value={3}>Class</Radio>
                  </Radio.Group>

                  <div className="flex gap-4">
                    <Input placeholder="Tag name (Ex: div, meta)" />
                    <Input placeholder="Class or ID name" />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Radio.Group
                    onChange={onChange3}
                    value={value1}
                    className="flex items-center justify-center"
                  >
                    <Radio value={4}>ID</Radio>
                    <Radio value={5}>Tag</Radio>
                    <Radio value={6}>Class</Radio>
                  </Radio.Group>

                  <div className="flex gap-4">
                    <Input placeholder="Tag name (Ex: div, meta)" />
                    <Input placeholder="Class or ID name" />
                  </div>
                </div>
                <div className="flex justify-between mt-5">
                  <div className="flex items-center gap-3 cursor-pointer">
                    <BsPlusCircleFill className="text-secondary" />
                    <p className="text-secondary">Add More</p>
                  </div>
                  <button className="btn btn-white-outline">
                    Check preview
                  </button>
                </div>
              </Panel>
            </Collapse>
          </div>
          <div className="mb-5">
            <Collapse
              defaultActiveKey={["1"]}
              onChange={onChange}
              expandIconPosition="end"
              className="add_new_page"
            >
              <Panel header="Tags" key="1">
                <div className="flex justify-between mb-5">
                  <Radio.Group
                    onChange={onChange2}
                    value={value}
                    className="flex items-center justify-center"
                  >
                    <Radio value={1}>ID</Radio>
                    <Radio value={2}>Tag</Radio>
                    <Radio value={3}>Class</Radio>
                  </Radio.Group>

                  <div className="flex gap-4">
                    <Input placeholder="Tag name (Ex: div, meta)" />
                    <Input placeholder="Class or ID name" />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Radio.Group
                    onChange={onChange3}
                    value={value1}
                    className="flex items-center justify-center"
                  >
                    <Radio value={4}>ID</Radio>
                    <Radio value={5}>Tag</Radio>
                    <Radio value={6}>Class</Radio>
                  </Radio.Group>

                  <div className="flex gap-4">
                    <Input placeholder="Tag name (Ex: div, meta)" />
                    <Input placeholder="Class or ID name" />
                  </div>
                </div>
                <div className="flex justify-between mt-5">
                  <div className="flex items-center gap-3 cursor-pointer">
                    <BsPlusCircleFill className="text-secondary" />
                    <p className="text-secondary">Add More</p>
                  </div>
                  <button className="btn btn-white-outline">
                    Check preview
                  </button>
                </div>
              </Panel>
            </Collapse>
          </div>
        </div>

        <div>
          <Collapse
            defaultActiveKey={["1"]}
            onChange={onChange}
            expandIconPosition="end"
            className="add_new_page"
          >
            <Panel header="Publish" key="1">
              <div className="bg-[#000] w-full">
                <pre className="text-white">
                  "text:"
                  <p className="text-[#0FB301] whitespace-break-spaces p-2">
                    অধিক মুনাফার দেওয়ার লোভ দেখিয়ে সাতক্ষীরায় বাংলাদেশ
                    অ্যাসোসিয়েশন অব রুরাল অ্যান্ড সোশ্যাল অ্যাডভান্সমেন্ট (বরসা)
                    নামের একটি বেসরকারি সংস্থা (এনজিও) গ্রাহকদের কাছ থেকে কয়েক শ
                    কোটি টাকা হাতিয়ে নিয়েছে বলে অভিযোগ পাওয়া গেছে। টাকা ফেরত
                    পাওয়ার দাবিতে গ্রাহকেরা দীর্ঘ প্রায় এক বছর ধরে আন্দোলন করলেও
                    কোনো ফল হচ্ছে না।{" "}
                  </p>
                </pre>
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default Config;
