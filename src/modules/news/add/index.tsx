import { Select } from "antd";
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewsAdd = () => {
  return (
    <div className="mt-3">
      <div className="flex items-center gap-2 ">
        <p>Dashboard</p>
        <FiChevronRight />
        <p>Add News</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Add News</h4>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>

      <div className="max-w-[1000px] w-full">
        <form>
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 mt-8">
            <div className="col-span-1">
              <div className="grid grid-cols-[250px_1fr] items-center gap-[44px]">
                <label htmlFor="">Title</label>
                <input
                  name="mobile"
                  type="text"
                  className=" border px-3 py-1"
                  placeholder="Prothom Alo"
                />
              </div>
            </div>

            <div className="col-span-1">
              <div className="grid grid-cols-[250px_1fr] items-start gap-[44px]">
                <label htmlFor="slug">Sitemap Link Dynamic Tag: date</label>
                <div className="flex flex-col">
                  <input
                    name="slug"
                    type="text"
                    className=" border px-3 py-1"
                    placeholder="Add link"
                  />
                  <span className="text-sm">
                    https://www.prothomalo.com/sitemap/sitemap-daily-date.xml
                  </span>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="grid grid-cols-[250px_1fr] items-center gap-[44px]">
                <label htmlFor="">Common Link</label>
                <input
                  name="mobile"
                  type="text"
                  className=" border px-3 py-1"
                  placeholder="Add link"
                />
              </div>
            </div>

            <div className="col-span-1">
              <div className="grid grid-cols-[250px_1fr] items-center gap-[44px]">
                <label htmlFor="">Source</label>
                <input
                  name="mobile"
                  type="text"
                  className=" border px-3 py-1"
                  placeholder="প্রথম আলো"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-secondary mt-5">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsAdd;
