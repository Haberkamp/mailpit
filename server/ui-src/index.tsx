import "./styles/global.css";
import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return <h1>Hello, React!</h1>;
}

// Ensure there's an element with id="root" in your HTML
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
