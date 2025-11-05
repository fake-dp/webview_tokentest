import React from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

// 성능 측정이 필요 없으면 아래 라인은 제거해도 됩니다.
reportWebVitals();
