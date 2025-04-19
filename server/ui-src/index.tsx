import "./styles/global.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";

const container = document.getElementById("app");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Could not find root element to mount React app.");
}
