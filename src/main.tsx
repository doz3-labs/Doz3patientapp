import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ToastProvider } from "./components/Toast";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <ToastProvider>
      <App />
    </ToastProvider>
  </HashRouter>
);
