import { Drawer } from "antd";
import React, { useState } from "react";
import { CgMenu } from "react-icons/cg";
import { Link } from "react-router-dom";
import ProfileDropdown from "../profileDropdown";
import SidebarComponent from "../sidebar";
import useWindowDimensions from "@/hooks/use_window_dimensions";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { GrMenu } from "react-icons/gr";

interface propTypes {
  toggled: boolean;
  setToggled?: Function | any;
}

export const Header = ({ toggled, setToggled }: propTypes) => {
  return (
    <>
      <div className="sticky top-0 bg-white px-8 py-4 border-b flex items-center justify-between z-50">
        <div>
          <button
            onClick={() => setToggled(!toggled)}
            className="block lg:hidden"
          >
            <GrMenu />
          </button>
        </div>
        <div className="font-bold flex items-center gap-3">
          <a href={"#"} target="_blank">
            <BsBoxArrowUpRight size={17} />
          </a>

          <ProfileDropdown />
        </div>
      </div>
    </>
  );
};

export default Header;
