import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";

import "./index.css";
import ContextProviders from "./context";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <HashRouter>
    <ContextProviders>
      <App />
    </ContextProviders>
  </HashRouter>
);
