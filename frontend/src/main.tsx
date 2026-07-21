import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { EnsayosProvider } from "./contexts/EnsayosContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <EnsayosProvider>
        <App />
    </EnsayosProvider>

  </React.StrictMode>
);