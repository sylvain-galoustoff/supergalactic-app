import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WebFont from "webfontloader";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Routes/Layout.tsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

WebFont.load({
  google: {
    families: ["Overpass:400,900"],
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
