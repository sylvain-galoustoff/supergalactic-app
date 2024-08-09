import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WebFont from "webfontloader";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Routes/Layout.tsx";

WebFont.load({
  google: {
    families: ["Overpass:400,900"],
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </StrictMode>
);
