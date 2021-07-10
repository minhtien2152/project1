import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import Link from "next/link";

const nav = [
  ["Người dùng", "/users", "fas fa-user-friends"],
  ["Khóa học", "/courses", "fas fa-book-open"],
  ["Trang khóa học", "/pages", "fas fa-bookmark"],
  ["Giảng viên", "/instructors", "fas fa-chalkboard-teacher"],
  ["Danh mục", "/categories", "fas fa-align-justify"],
];
const basePath = "/admin";
const Sidebar = () => {
  return (
    <ProSidebar breakPoint="md" image="/images/sidebar_bg.jpg">
      <SidebarHeader>
        <div
          style={{
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          Admin Panel
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="circle">
          {nav.map((item) => (
            <MenuItem icon={<i className={item[2]}></i>}>
              <Link href={basePath + item[1]}>
                <a>{item[0]}</a>
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </SidebarContent>
      <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px",
          }}
        ></div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
