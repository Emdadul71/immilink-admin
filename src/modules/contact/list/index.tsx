import { useState } from "react";
import { FiChevronRight, FiSend } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineEnvelope } from "react-icons/hi2";
import Inbox from "../@component/inbox";
import { BsExclamationLg } from "react-icons/bs";
import { HiOutlineDocumentRemove } from "react-icons/hi";
import { TbTrash } from "react-icons/tb";
import LeadExport from "../@component/export";

const Contact = () => {
  const [exportDrawer, setExportDrawer] = useState(false);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const [emdad, setEmdad] = useState(0);

  const test = [
    {
      icon: <HiOutlineEnvelope />,
      title: "Inbox",
      itemCount: 24,
    },
    {
      icon: <FaRegStar />,
      title: "Marked",
      itemCount: 2,
    },
    {
      icon: <FiSend />,
      title: "Sent",
    },
    {
      icon: <BsExclamationLg />,
      title: "Spam",
    },
    {
      icon: <HiOutlineDocumentRemove />,
      title: "Draft",
      itemCount: 2,
    },
    {
      icon: <TbTrash />,
      title: "Trash",
    },
  ];

  console.log(emdad);

  const renderedTable = () => {
    switch (emdad) {
      case 1:
        return <>1</>;
      case 2:
        return <>2</>;
      default:
        return <>1</>;
    }
  };

  const comp = [
    <Inbox />,
    <div>test2</div>,
    <div>test3</div>,
    <div>test4</div>,
  ];

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <p>Dashboard</p>
        <FiChevronRight />
        <p>All Posts</p>
      </div>

      {/* <div className="flex justify-between items-center mt-6 my-4  gap-[10px] ">
        <div className="w-3/12 relative">
          <Input
            type="text"
            // prefix={<BiSearch size={18} />}
            name=""
            id=""
            placeholder="Search Posts"
            className="border pl-8 pr-5 py-1 rounded-[4px] w-full"
          />
          <BiSearch
            size={18}
            className="absolute top-[50%]  translate-y-[-50%] left-2"
          />
        </div>
      </div> */}

      <div className="grid grid-cols-[250px_1fr] gap-4 mt-8">
        <div className="flex flex-col gap-2 border p-4 rounded">
          {test?.map((item, i) => {
            return (
              <div
                className={`${
                  emdad == i ? "bg-[#FEFBF0]" : ""
                } flex justify-between items-center px-4 rounded`}
              >
                <div className="flex items-center gap-2 py-1.5 ">
                  <span className="text-base">{item?.icon}</span>
                  <div onClick={() => setEmdad(i)} className="text-base">
                    {item?.title}
                  </div>
                </div>

                {item?.itemCount && (
                  <div className="flex justify-center items-center w-[30px] h-[30px] bg-[#FEFBF0]">
                    {item?.itemCount}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div>{comp[emdad]}</div>
        <div>
          <LeadExport
            exportDrawer={exportDrawer}
            setExportDrawer={setExportDrawer}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
