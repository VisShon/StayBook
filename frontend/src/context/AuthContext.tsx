import React, { useEffect, useState, createContext } from "react";
import {auth} from '../app/firebase';
import {GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Button from "../components/Button";

export type AuthContextProps = {
    username: string | undefined;
	profilePicture: string | undefined;
	userToken:string | undefined;
    email: string | undefined;
	phone: string | undefined;
	Login: Function;
};


type props={
	children: React.ReactNode
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)
	
export const AuthProvider = ({children}:props) =>{

	const Login = () => {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth,provider)
	}

	const[username,setUsername] = useState<string|undefined>()
	const[email,setEmail] = useState<string|undefined>()
	const[phone,setPhone] = useState<string|undefined>()
	const [profilePicture,setProfilePicture] = useState<string|undefined>()
	const [userToken,setUserToken] = useState<string|undefined>()

	useEffect(() =>{
		const unscubscribe = auth.onAuthStateChanged(user=>{
			setUsername(user?.displayName!);
			setEmail(user?.email!);
			sessionStorage.setItem('email', user?.email!);
			setPhone(user?.phoneNumber!);
			setProfilePicture(user?.photoURL!)
			user?.getIdToken().then((idToken)=>{
				setUserToken(idToken);
				sessionStorage.setItem('user', idToken);
			});
		})
		return unscubscribe;
	},[])	


	return (
		<AuthContext.Provider value={{username,email,phone,Login,profilePicture,userToken}}>
			{children}
		</AuthContext.Provider>
  )
}