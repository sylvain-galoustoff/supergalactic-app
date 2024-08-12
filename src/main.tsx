import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WebFont from "webfontloader";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Routes/Layout.tsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { fr } from "date-fns/locale";
import { setDefaultOptions } from "date-fns";
import { ModalContextProvider } from "./context/ModalContext.tsx";

WebFont.load({
  google: {
    families: ["Overpass:400,900"],
  },
});

setDefaultOptions({ locale: fr });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ModalContextProvider>
            <Layout />
          </ModalContextProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
