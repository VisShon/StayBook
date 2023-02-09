import React, { useState, useEffect, useContext } from 'react'
import ProfileHistory from '../components/home/ProfileHistory'
import '../styles/home/Profile.scss'
import { AuthContext, AuthContextProps } from '../context/AuthContext'
import { useJwt } from 'react-jwt'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Helmet} from 'react-helmet'

function Profile() {
    const { Login, Logout } = useContext<AuthContextProps>(AuthContext)
    const userToken = sessionStorage.getItem('user')
    const { decodedToken, isExpired }: any = useJwt(userToken!)
    const [history, setHistory] = useState<string[]>([])

    const nav = useNavigate()
    useEffect(() => {
        const checkAuth = async () => {
            if (!userToken) {
                nav('/signup')
            }
            const result = await axios
                .post('/api/getAllReservations', {
                    email: sessionStorage.getItem('email'),
                })
                .then((response) => setHistory(response.data))
        }
        checkAuth()
    }, [])


    const logout = async () => {
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('email')
        Logout()
        nav('/')
    }

    return (
        <>
        <Helmet>
            <title>StayBook Profile</title>
            <meta name="description" content="StayBook Booking engine for Hotels enabled with high speed wifi throughout. There are different wifi connections on different floors. The guest can find the wifi passwords on the wifi cards inside of their rooms we have a specialized work station for our guests with high speed cables. Delhi hotels" />
        </Helmet>
            {!decodedToken && <div>Reload again</div>}
            {decodedToken && (
                <div className="profileBody">
                <h1>Profile</h1>    
                <div className="userInfo">
                    <img src={decodedToken.picture} alt={'Staybook Hotels'}/>
                    <h2>{decodedToken.email}</h2>
                    <p>{decodedToken.name}</p>
                    <div onClick={logout} className="button">
                        Logout
                    </div>
                    {/* <div className="credits">Credits: 700</div> */}
                </div>

                <h2>Your Registrations</h2>

                <div className="historyContainer">
                    {history.map((item, index) => (
                        <ProfileHistory hotel={item} key={index} />
                    ))}
                </div>
            </div>
            )}
        </>
    )
}

export default Profile
