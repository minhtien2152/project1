import "bootstrap/dist/css/bootstrap.min.css";

import "@fortawesome/fontawesome-free/css/all.css";
import "../styles/scss/volt.scss";
import "tailwindcss/tailwind.css";
import Layout from "../components/layout";

import { wrapper } from "../store";
const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default wrapper.withRedux(App);
