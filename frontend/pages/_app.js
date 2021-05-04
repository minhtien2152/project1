import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "@fortawesome/fontawesome-free/css/all.css";
import "../styles/scss/volt.scss";
import Layout from "../components/layout";
import "tailwindcss/tailwind.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
