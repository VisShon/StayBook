import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './app/store'
import { AuthProvider } from './context/AuthContext'
import { Provider } from 'react-redux'

import './index.scss'
import './styles/fonts/kraftan.otf'

import Home from './pages/Home'
import NavBar from './components/home/Navbar'
import Footer from './components/home/Footer'
import BookingEngine from './pages/BookingEngine'
import Packages from './pages/Packages'
import ContactUs from './pages/ContactUs'
import Profile from './pages/Profile'
import Blog from './pages/Blog'
import SinglePost from './pages/SinglePost.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsCondition from './pages/TermsCondition'
import RefundPolicy from './pages/RefundPolicy'
import GeneralPolicy from './pages/GeneralPolicy'

import { WhatsAppWidget } from 'react-whatsapp-widget'
import 'react-whatsapp-widget/dist/index.css'
import { ReactComponent as Logo } from './images/user.svg'

const rootElement = document.getElementById('root') as HTMLElement
const root = createRoot(rootElement)

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <AuthProvider>
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
                    <Route path="/refundpolicy" element={<RefundPolicy />} />
                    <Route path="/generalpolicy" element={<GeneralPolicy />} />
                    <Route path="/:slug" element={<BookingEngine />} />
                </Routes>
                <Footer />
                <WhatsAppWidget CompanyIcon={Logo} phoneNumber="9192112749" />
            </AuthProvider>
        </BrowserRouter>
    </Provider>
)
