import { createRoot } from "react-dom/client";
import "./index.scss";
import "./styles/fonts/kraftan.otf";
import "react-whatsapp-widget/dist/index.css";
import { App } from "./App";
import { HotelContextProvider } from "./context/HotelContext";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);
root.render(
  <HotelContextProvider>
    <App />
  </HotelContextProvider>
);
