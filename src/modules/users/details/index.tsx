import { Select } from "antd";
import { useState } from "react";
import { FiChevronRight, FiEdit } from "react-icons/fi";
import { useGetProfileQuery } from "../../../appstore/auth/auth_api";

const UserDetails = () => {
  const { data: profileData } = useGetProfileQuery({});
  const [edit, setEdit] = useState(false);

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <p>Dashboard</p>
        <FiChevronRight />
        <p>{profileData?.name}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h4 className="text-primary py-1">{profileData?.name}</h4>
        {!edit && (
          <button className="btn btn-secondary" onClick={() => setEdit(true)}>
            Edit
          </button>
        )}
      </div>
      <div className="w-full h-[1px] bg-[#E5E7EB] mt-4"></div>

      {edit ? (
        <>
          <div className="max-w-[1000px] w-full">
            <form action="#">
              <div className="grid grid-cols-1 gap-x-8 gap-y-5 mt-8">
                <div className="col-span-1">
                  <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                    <div></div>
                    <div className="w-[125px] h-[125px] rounded-full relative cursor-pointer">
                      <img
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                        alt="user"
                        className="w-full h-full rounded-full"
                      />
                      <div className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#3699FF] absolute right-3 bottom-0">
                        <FiEdit className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                    <label htmlFor="">Name</label>
                    <input
                      name="mobile"
                      type="text"
                      className=" border px-3 py-1"
                      placeholder="Savannah Nguyen"
                    />
                  </div>
                </div>

                <div className="col-span-1">
                  <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                    <label htmlFor="email">Email</label>

                    <input
                      name="email"
                      type="email"
                      className=" border px-3 py-1"
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                    <label htmlFor="number">Mobile Number</label>

                    <input
                      name="number"
                      type="number"
                      className=" border px-3 py-1"
                      placeholder="01818******"
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                    <label htmlFor="slug">Role</label>
                    <Select
                      defaultValue="Administration"
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

              <div className="flex gap-3">
                <button type="button" className="btn btn-secondary mt-5">
                  Save changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary mt-5"
                  onClick={() => setEdit(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="max-w-[1000px] w-full">
            <div className="grid grid-cols-1 gap-x-8 gap-y-5 mt-8">
              <div className="col-span-1">
                <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                  <div></div>
                  <div className="w-[125px] h-[125px] rounded-full">
                    <img
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                      alt="user"
                      className="w-full h-full rounded-full"
                    />
                  </div>
                </div>
              </div>
              {profileData?.name && (
                <div className="col-span-1">
                  <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                    <p>Name</p>
                    <p className="bg-[#F6F7FA] py-2 px-3">
                      {profileData?.name}
                    </p>
                  </div>
                </div>
              )}

              {profileData?.email && (
                <div className="col-span-1">
                  <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                    <p>Email</p>
                    <p className="bg-[#F6F7FA] py-2 px-3">
                      {profileData?.email}
                    </p>
                  </div>
                </div>
              )}

              {profileData?.mobile && (
                <div className="col-span-1">
                  <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                    <p>Mobile Number</p>
                    <p className="bg-[#F6F7FA] py-2 px-3">
                      {profileData?.mobile}
                    </p>
                  </div>
                </div>
              )}

              <div className="col-span-1">
                <div className="grid grid-cols-[200px_1fr] items-center gap-[44px]">
                  <p>Role</p>
                  <p className="bg-[#F6F7FA] py-2 px-3">Administration</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetails;
