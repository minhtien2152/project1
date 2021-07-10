import Header2 from "./admin/Header";
import Sidebar from "./admin/Sidebar";
import Header1 from "./Header";
import styles from "../styles/layout.module.scss";
import MessengerCustomerChat from "react-messenger-customer-chat";
const Layout = ({ children, admin }) => {
  return (
    <>
      {!admin ? (
        <>
          <Header1 />
          <main>
            {children}{" "}
            <MessengerCustomerChat
              pageId="111868124482369"
              appId="643431190383753"
              htmlRef="mybot"
            />
          </main>
        </>
      ) : (
        <div className={styles.adminLayout}>
          <Sidebar />
          <main>
            <Header2 />
            {children}
          </main>
        </div>
      )}
    </>
  );
};
export default Layout;
