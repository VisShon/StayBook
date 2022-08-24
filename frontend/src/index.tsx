import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {store} from './app/store'
import { Provider } from 'react-redux'
import './index.css';
import Home from './pages/Landing';
import BookingEngine from './pages/BookingEngine';
const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);


root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<BookingEngine/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
