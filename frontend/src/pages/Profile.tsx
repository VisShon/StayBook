import React, { useState, useEffect, useContext } from 'react'
import ProfileHistory from '../components/home/ProfileHistory'
import '../styles/home/Profile.scss'
import { AuthContext, AuthContextProps } from '../context/AuthContext'
import { useJwt } from 'react-jwt'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Profile() {
    const { Login, Logout } = useContext<AuthContextProps>(AuthContext)
    const userToken = sessionStorage.getItem('user')
    const { decodedToken, isExpired }: any = useJwt(userToken!)
    const [history, setHistory] = useState<string[]>([])

    useEffect(() => {
        const checkAuth = async () => {
            if (!userToken) {
                await Login()
            }
            const result = await axios
                .post('/api/getAllReservations', {
                    email: sessionStorage.getItem('email'),
                })
                .then((response) => setHistory(response.data))
        }
        checkAuth()
    }, [])

    const nav = useNavigate()

    const logout = async () => {
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('email')
        Logout()
        nav('/')
    }

    return (
        <>
            {!decodedToken && <div>Reload again</div>}
            {decodedToken && (
                <div className="profileBody">
                    <div className="userInfo">
                        <img src={decodedToken.picture} />
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
