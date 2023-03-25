import Home from "./pages/Home";
import NavBar from "./components/home/Navbar";
import TeamPage from "./components/TeamPage";
import Footer from "./components/home/Footer";
import BookingEngine from "./pages/BookingEngine";
import OldBookingEngine from './pages/OldBookingEngine';
import Packages from "./pages/Packages";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";
import Blog from "./pages/Blog";
import SinglePost from "./pages/SinglePost.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsCondition from "./pages/TermsCondition";
import RefundPolicy from "./pages/RefundPolicy";
import GeneralPolicy from "./pages/GeneralPolicy";
import FAQ from "./pages/Faq";
import Confirmation from "./pages/Confirmation";
import AboutUs from "./pages/AboutUs";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./app/store";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";

import "./index.scss";
import "./styles/fonts/kraftan.otf";

import { WhatsAppWidget } from "react-whatsapp-widget";
import "react-whatsapp-widget/dist/index.css";
import { ReactComponent as Logo } from "./images/user.svg";
import Hotels from "./pages/Hotels";
import AllHotels from "./pages/AllHotels";
import { createContext, useState } from "react";
import React from "react";

export const ValueContext = createContext<any>(null);
export const checkInContext = createContext<any>(null);
export const checkOutContext = createContext<any>(null);

export function App() {
  const [numValue, setnumValue] = useState(0);
  const [checkInGlobal, setcheckInGlobal] = useState(new Date());
  const [checkOutGlobal, setcheckOutGlobal] = useState(new Date());
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <ValueContext.Provider value={[numValue, setnumValue]}>
            <checkInContext.Provider value={[checkInGlobal, setcheckInGlobal]}>
              <checkOutContext.Provider
                value={[checkOutGlobal, setcheckOutGlobal]}
              >
                <NavBar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/packages" element={<Packages />} />
                  <Route path="/contactus" element={<ContactUs />} />
                  <Route path="/blogs" element={<Blog />} />
                  <Route path="/blogs/:slug" element={<SinglePost />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                  <Route path="/termscondition" element={<TermsCondition />} />
                  <Route path="/FAQ" element={<FAQ />} />
                  <Route path="/refundpolicy" element={<RefundPolicy />} />
                  <Route path="/generalpolicy" element={<GeneralPolicy />} />
                  <Route path="/:slug" element={<OldBookingEngine />} />
                  <Route path="/hotel/google/list/:hotelId/:searchParams" element={<BookingEngine />} />
                  {/* <Route path="/:slug/:bookInDate/:bookOutDate" element={<BookingEngine />} /> */}
                  <Route path="/hotels/:slug" element={<Hotels />} />
                  <Route path="/hotels" element={<AllHotels />} />
                  <Route path="/hotelbookingconfirmation" element={<Confirmation />}/>
                  <Route path="/aboutus" element={<AboutUs />} />
                  <Route path="/team" element={<TeamPage />} />
                  <Route path="/signUp" element={<SignUp />} />
                  <Route path="/login" element={<SignIn />} />
                </Routes>
                <Footer />
                <WhatsAppWidget CompanyIcon={Logo} phoneNumber="918527703312" />
              </checkOutContext.Provider>
            </checkInContext.Provider>
          </ValueContext.Provider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}
