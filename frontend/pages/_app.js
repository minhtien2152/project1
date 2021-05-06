import "bootstrap/dist/css/bootstrap.min.css";

import "@fortawesome/fontawesome-free/css/all.css";
import "../styles/scss/volt.scss";
import "tailwindcss/tailwind.css";
import Layout from "../components/layout";

import { Provider } from "react-redux";
import { useStore } from "../store";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
