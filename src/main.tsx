import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CostApp } from "./CostApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CostApp />
  </StrictMode>
);
