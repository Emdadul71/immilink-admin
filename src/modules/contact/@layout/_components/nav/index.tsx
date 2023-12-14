import { useState } from "react";
import { FiChevronRight, FiSend } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { BsExclamationLg } from "react-icons/bs";
import { HiOutlineDocumentRemove } from "react-icons/hi";
import { TbTrash } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ContactNav = () => {
  let location = useLocation();
  const pathName = location?.pathname;

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const [emdad, setEmdad] = useState(0);

  const test = [
    {
      icon: <HiOutlineEnvelope />,
      title: "Inbox",
      itemCount: 24,
      slug: "/contact/inbox",
    },
    {
      icon: <FaRegStar />,
      title: "Marked",
      itemCount: 2,
      slug: "/contact/marked",
    },
    {
      icon: <FiSend />,
      title: "Sent",
      slug: "/contact/sent",
    },
    {
      icon: <BsExclamationLg />,
      title: "Spam",
      slug: "/contact/spam",
    },
    {
      icon: <HiOutlineDocumentRemove />,
      title: "Draft",
      itemCount: 2,
      slug: "/contact/draft",
    },
    {
      icon: <TbTrash />,
      title: "Trash",
      slug: "/contact/trash",
    },
  ];

  // const renderedTable = () => {
  //   switch (emdad) {
  //     case 1:
  //       return <>1</>;
  //     case 2:
  //       return <>2</>;
  //     default:
  //       return <>1</>;
  //   }
  // };

  return (
    <div className="flex flex-col gap-2 border p-4 rounded  mb-3 h-full overflow-auto contact_menu">
      {test?.map((item, i) => {
        // if (item.type === "button") {
        //   return (
        //     <Link to="#" className="mt-auto">
        //       button
        //     </Link>
        //   );
        // } else {
        return (
          <Link
            to={`${item?.slug}`}
            className={`${
              pathName === item?.slug ? "bg-[#FEFBF0]" : ""
            } flex justify-between items-center px-4 rounded`}
          >
            <div className="flex items-center gap-2 py-1.5">
              <span className="text-base">{item?.icon}</span>
              <div className="text-base">{item?.title}</div>
            </div>

            {item?.itemCount && (
              <div className="flex justify-center items-center w-[30px]  bg-[#FEFBF0]">
                {item?.itemCount}
              </div>
            )}
          </Link>
        );
        // }
      })}

      <div className="mt-auto btn btn-secondary">NEW MESSAGE</div>
    </div>
  );
};

export default ContactNav;
