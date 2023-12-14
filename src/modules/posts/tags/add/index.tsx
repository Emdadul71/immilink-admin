import { Select } from "antd";
import { FiChevronRight } from "react-icons/fi";

const TagAdd = () => {
  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <p>Dashboard</p>
        <FiChevronRight />
        <p>Add New Tag</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary">Add New Tag</h4>
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>

      <div className="max-w-[1000px] w-full">
        <form action="#">
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 mt-8">
            <div className="col-span-1">
              <div className="grid grid-cols-[180px_1fr] items-center gap-[44px]">
                <label htmlFor="">Name</label>
                <input
                  name="mobile"
                  type="text"
                  className=" border px-3 py-1"
                  placeholder="RPL Finder Recognition of Prior Learning"
                />
              </div>
            </div>

            <div className="col-span-1">
              <div className="grid grid-cols-[180px_1fr] items-center gap-[44px]">
                <label htmlFor="slug">Slug</label>

                <input
                  name="slug"
                  type="text"
                  className=" border px-3 py-1"
                  placeholder="Add slug"
                />
              </div>
            </div>
            <div className="col-span-1">
              <div className="grid grid-cols-[180px_1fr] items-center gap-[44px]">
                <label htmlFor="slug">Parent Category</label>
                <Select
                  defaultValue="Parent Category"
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
              <div className="grid grid-cols-[180px_1fr] items-start gap-[44px]">
                <label htmlFor="slug">Description</label>

                <textarea
                  name="slug"
                  className=" border px-3 py-1"
                  placeholder="Add slug"
                  rows={6}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-secondary mt-5">
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default TagAdd;
