import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LudoProvider } from "./context/LudoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LudoProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </LudoProvider>
  </BrowserRouter>
);
