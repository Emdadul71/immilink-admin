import { BiOutline } from "react-icons/bi";
import { BsCalendar4Event } from "react-icons/bs";
import { FiBook, FiCalendar, FiTag, FiUsers } from "react-icons/fi";
import { IoIosMusicalNotes } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

interface propTypes {
  collapsed: boolean;
  toggled: boolean;
  setCollapsed?: Function | any;
  setToggled?: Function | any;
}

const SidebarComponent = ({ collapsed, toggled, setToggled }: propTypes) => {
  const { pathname } = useLocation();
  const targetPath = pathname.split("/")[1];

  return (
    <Sidebar
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="lg"
      className="shrink-0 h-screen overflow-auto scroll custom"
    >
      <div className="flex justify-center sticky top-0 z-50 bg-white p-2 !bg-[#FEEFE7]">
        {!collapsed ? (
          <div className="relative px-4 py-2 w-[150px]">
            <Link to="/dashboard">
              <img src="/images/misc/logo.png" alt="Moves International Logo" />
            </Link>
          </div>
        ) : (
          <div className="relative px-2 py-1 w-[120px]">
            <Link to="/dashboard">
              <img src="/images/misc/logo.png" alt="Moves International Logo" />
            </Link>
          </div>
        )}
      </div>

      <Menu className="">
        <MenuItem
          className={pathname == "/dashboard" ? "" : ""}
          component={<Link to="/dashboard" />}
          icon={<MdOutlineDashboard className="text-xl" />}
        >
          <span className="text-sm font-medium">Dashboard</span>
        </MenuItem>

        {/* sub menu */}

        <SubMenu
          className={`text-sm font-medium ${targetPath == "posts" ? "" : ""}`}
          label="Posts"
          icon={<FiTag className="text-xl" />}
        >
          <MenuItem
            className={pathname == "/posts" ? "active" : ""}
            component={<Link to="/posts" />}
          >
            <span className="text-sm font-medium">All Posts</span>
          </MenuItem>
          <MenuItem
            className={pathname == "/posts/add" ? "active" : ""}
            component={<Link to="/posts/add" />}
          >
            <span className="text-sm font-medium">Add New</span>
          </MenuItem>
          <MenuItem
            className={pathname == "/categories/list" ? "active" : ""}
            component={<Link to="/categories/list" />}
          >
            <span className="text-sm font-medium">Categories</span>
          </MenuItem>
          <MenuItem
            className={pathname == "/tags/list" ? "active" : ""}
            component={<Link to="/tags/list" />}
          >
            <span className="text-sm font-medium">Tags</span>
          </MenuItem>
        </SubMenu>

        {/* Media */}

        <MenuItem
          className={pathname == "/media/list" ? "active" : ""}
          component={<Link to="/media/list" />}
          icon={<IoIosMusicalNotes className="text-xl" />}
        >
          <span className="text-sm font-medium">Media</span>
        </MenuItem>

        <SubMenu
          className={`text-sm font-medium ${targetPath == "user" ? "" : ""}`}
          label="Users"
          icon={<FiCalendar className="text-xl" />}
        >
          <MenuItem
            className={pathname == "/user/list" ? "active" : ""}
            component={<Link to="/user/list" />}
          >
            <span className="text-sm font-medium">User List</span>
          </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
