import Sidebar from "./admin/Sidebar";
import Header from "./Header";

const Layout = ({ children, admin }) => {
  return (
    <div>
      {!admin ? <Header /> : <Sidebar />}
      <main>{children}</main>
    </div>
  );
};
export default Layout;
