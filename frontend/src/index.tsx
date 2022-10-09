import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {store} from './app/store'
import { AuthProvider } from "./context/AuthContext"
import { Provider } from 'react-redux'

import './index.css';
import './styles/fonts/kraftan.otf'

import Home from './pages/Home';
import NavBar from './components/home/Navbar'
import Footer from './components/home/Footer'
import BookingEngine from './pages/BookingEngine';
import Packages from './pages/Packages';
import ContactUs from './pages/ContactUs';
import Profile from './pages/Profile';
import Blog from './pages/Blog';
import SinglePost from './pages/SinglePost.jsx';

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);


root.render(
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/packages" element={<Packages/>}/>
            <Route path="/contactus" element={<ContactUs/>}/>
            <Route path="/blogs" element={<Blog/>}/>
            <Route path="/blogs/:slug" element={<SinglePost/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/*" element={<BookingEngine/>}/>
          </Routes>
          <Footer/>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
);
