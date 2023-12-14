import { Radio, RadioChangeEvent, Select, Space, Switch, Tabs } from "antd";
import { useState } from "react";
import { FiChevronRight, FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

const Settings = () => {
  const [value, setValue] = useState(1);
  const [value1, setValue1] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  const onChange2 = (e: RadioChangeEvent) => {
    setValue1(e.target.value);
  };
  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <p>Dashboard</p>
        <FiChevronRight />
        <p>Settings</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Settings</h4>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>

      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: "General",
            key: "1",
            children: (
              <form>
                <div className="max-w-[1000px] w-full">
                  <form action="#">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-5 mt-4">
                      {/* <div className="col-span-1">
                        <div className="grid grid-cols-[200px_1fr] items-start gap-[44px] ">
                          <label htmlFor="" className="font-medium">
                            Logo
                          </label>
                          <div className="w-[125px] h-[125px] rounded-full relative cursor-pointer">
                            <img
                              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                              alt="user"
                              className="w-full h-full rounded-full"
                            />
                            <div className="flex justify-center items-start w-[30px] h-[30px] rounded-full bg-[#3699FF] absolute right-3 bottom-0">
                              <FiEdit className="text-white" />
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <div className="col-span-1">
                        <div className="grid grid-cols-[200px_1fr] items-start gap-[44px]">
                          <label htmlFor="" className="font-medium">
                            Site Title
                          </label>
                          <input
                            name="title"
                            type="text"
                            className=" border px-3 py-1"
                            placeholder="RPL Finder Recognition of Prior Learning"
                          />
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="grid grid-cols-[200px_1fr] items-start gap-[44px]">
                          <label htmlFor="" className="font-medium">
                            Tagline
                          </label>
                          <input
                            name="tagline"
                            type="text"
                            className=" border px-3 py-1"
                            placeholder="In a few words, explain what this site is about."
                          />
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="grid grid-cols-[200px_1fr] items-start gap-[44px]">
                          <label htmlFor="" className="font-medium">
                            Administration Email Address
                          </label>
                          <div>
                            <input
                              name="tagline"
                              type="text"
                              className=" border px-3 py-1 w-full"
                              placeholder="bd.freelancer.mmh@gmail.com"
                            />
                            <p className="text-xs  mt-1">
                              This address is used for admin purposes. If you
                              change this, we will send you an email at your new
                              address to confirm it. The new address will not
                              become active until confirmed.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="grid grid-cols-[200px_1fr] items-start gap-[44px]">
                          <label htmlFor="" className="font-medium">
                            Membership
                          </label>
                          <div className="flex items-center gap-3 text-sm">
                            <Switch size="small" defaultChecked />
                            <p>Anyone can register</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                          <label htmlFor="slug" className="font-medium">
                            New User Default Role
                          </label>
                          <Select
                            defaultValue="Subscriber"
                            style={{ width: "100%", borderRadius: 0 }}
                            className="py-1"
                            options={[
                              { value: "admin", label: "Admin" },
                              { value: "modarator", label: "Modarator" },
                            ]}
                          />
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                          <label htmlFor="slug" className="font-medium ">
                            Site Language
                          </label>
                          <Select
                            defaultValue="English (United States)"
                            style={{ width: "100%", borderRadius: 0 }}
                            className="py-1"
                            options={[
                              { value: "lucy", label: "Lucy" },
                              { value: "mizan", label: "Mizan" },
                            ]}
                          />
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                          <label htmlFor="slug" className="font-medium">
                            Time Zone
                          </label>

                          <Select
                            defaultValue="UCT+0"
                            style={{ width: "100%", borderRadius: 0 }}
                            className="py-1"
                            options={[
                              { value: "lucy", label: "Lucy" },
                              { value: "mizan", label: "Mizan" },
                            ]}
                          />
                        </div>
                        <div className="grid grid-cols-[200px_1fr] items-start gap-[44px]">
                          <div></div>
                          <span className="text-xs">
                            Choose either a city in the same timezone as you or
                            a UTC (Coordinated Universal Time) time offset.
                          </span>
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                          <label htmlFor="slug" className="font-medium">
                            Date Format
                          </label>
                          <Select
                            defaultValue="MM-DD-YYYY"
                            style={{ width: "100%", borderRadius: 0 }}
                            className="py-1"
                            options={[
                              { value: "lucy", label: "Lucy" },
                              { value: "mizan", label: "Mizan" },
                            ]}
                          />
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                          <label htmlFor="slug" className="font-medium">
                            Time Format
                          </label>
                          <Select
                            defaultValue="9:40 AM"
                            style={{ width: "100%", borderRadius: 0 }}
                            className="py-1"
                            options={[
                              { value: "lucy", label: "Lucy" },
                              { value: "mizan", label: "Mizan" },
                            ]}
                          />
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                          <label htmlFor="slug" className="font-medium">
                            Week Starts On
                          </label>
                          <Select
                            defaultValue="Monday"
                            style={{ width: "100%", borderRadius: 0 }}
                            className="py-1"
                            options={[
                              { value: "sunday", label: "Sunday" },
                              { value: "monday", label: "Monday" },
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-secondary mt-5">
                      Save changes
                    </button>
                  </form>
                </div>
              </form>
            ),
          },

          {
            label: "Writing",
            key: "3",
            children: (
              <form>
                <div className="max-w-[1000px] w-full">
                  <form action="#">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-5 mt-8">
                      <div className="col-span-1">
                        <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                          <label htmlFor="slug" className="font-medium">
                            Default Post Category
                          </label>
                          <Select
                            defaultValue="Uncategorized"
                            style={{ width: "100%", borderRadius: 0 }}
                            className="py-1"
                            options={[
                              { value: "lucy", label: "Lucy" },
                              { value: "mizan", label: "Mizan" },
                            ]}
                          />
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                          <label htmlFor="slug" className="font-medium">
                            Default Post Format
                          </label>
                          <div>
                            <Select
                              defaultValue="Standard"
                              style={{ width: "100%", borderRadius: 0 }}
                              className="py-1"
                              options={[
                                { value: "lucy", label: "Lucy" },
                                { value: "mizan", label: "Mizan" },
                              ]}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="grid grid-cols-[200px_1fr] items-start gap-[44px]">
                          <label htmlFor="" className="font-medium">
                            Default editor for all users
                          </label>
                          <input
                            name="tagline"
                            type="text"
                            className=" border px-3 py-1"
                            placeholder="https://rplfinder.com"
                          />
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="grid grid-cols-[200px_1fr] items-start gap-[44px]">
                          <label htmlFor="slug" className="font-medium">
                            Allow users to switch editors
                          </label>
                          <Radio.Group onChange={onChange} value={value}>
                            <Space direction="vertical">
                              <Radio value={1}>Classic editor</Radio>
                              <Radio value={2}>Block editor</Radio>
                            </Space>
                          </Radio.Group>
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="grid grid-cols-[200px_1fr] items-start gap-[44px]">
                          <label htmlFor="slug" className="font-medium">
                            Administration Email Address
                          </label>
                          <Radio.Group onChange={onChange2} value={value1}>
                            <Space direction="vertical">
                              <Radio value={1}>Yes</Radio>
                              <Radio value={2}>No</Radio>
                            </Space>
                          </Radio.Group>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-secondary mt-5">
                      Save changes
                    </button>
                  </form>
                </div>
              </form>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Settings;
