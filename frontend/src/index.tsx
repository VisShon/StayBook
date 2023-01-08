import { createRoot } from "react-dom/client";
import "./index.scss";
import "./styles/fonts/kraftan.otf";
import { WhatsAppWidget } from "react-whatsapp-widget";
import "react-whatsapp-widget/dist/index.css";
import React from "react";
import { App } from "./App";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);
root.render(<App />);
