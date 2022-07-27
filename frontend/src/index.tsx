import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import App from './pages/BookingEngine';
import {store} from './app/store'
import { Provider } from 'react-redux'
const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </StrictMode>
);
