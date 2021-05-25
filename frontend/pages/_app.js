import "tailwindcss/tailwind.css";

import "bootstrap/dist/css/bootstrap.min.css";

import "@fortawesome/fontawesome-free/css/all.css";
import "../styles/scss/volt.scss";
import "../styles/global.scss";
import Layout from "../components/layout";

import { wrapper } from "../store";
const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(App);
