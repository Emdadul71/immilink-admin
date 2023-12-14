import React from "react";
import ContactNav from "../_components/nav";
import { Outlet } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const ContactLayout = () => {
  return (
    <div>
      <div className="flex items-center gap-2 pb-8 pt-3">
        <p>Dashboard</p>
        <FiChevronRight />
        <p>Contact</p>
      </div>
      <div className="grid grid-cols-[250px_1fr] gap-4 h-[calc(100vh-144px)]">
        <ContactNav />

        <Outlet />
      </div>
    </div>
  );
};

export default ContactLayout;
