import { margin } from "@mui/system";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { AuthContext, AuthContextProps } from "../context/AuthContext";
export default function SignIn() {
  const { Login, Logout, signInWithEmail } = useContext<AuthContextProps>(AuthContext);
  const [displayedErr, setDisplayedError] = useState("Please enter credentials");
  const nav = useNavigate();
  const loginWithGmail = async () => {
    await Login().then(() => {
      nav('/profile');
    });
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email || email === "") {
      setDisplayedError("Please enter an email!");
      return;
    }

    if (!password || password === "") {
      setDisplayedError("Please enter a password!");
      return;
    }
    setError("");
    try {
      await signInWithEmail(email, password).then(() => {
        console.log("User logged in");
        nav('/profile')
      });
    } catch (err: any) {
      setDisplayedError(err.message);
      setError(err.message);
      console.log(err.message);
    }
    
  };
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign In</h1>
          <div
            className="warning"
            style={{
              backgroundColor: "#FEEFB3",
              color: "#9F6000",
              padding: "1rem",
              margin: "1rem",
              // display: 'none'
            }}
          >
            {displayedErr}
          </div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
          />

          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#cf8f24",
              color: "white",
              borderRadius: "5px",
              padding: "0.5rem",
            }}
          >
            Log In
          </button>
          <span>or</span>

          <button
            onClick={loginWithGmail}
            style={{
              backgroundColor: "red",
              color: "white",
              borderRadius: "5px",
              padding: "0.5rem",
            }}
            className="mx-4"
          >
            Login with Google
          </button>

          {/* <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div> */}
          <div className="text-grey-dark mt-6">
            Already have an account?
            <a
              className="mx-4 no-underline border-b border-blue text-blue"
              href="../login/"
            >
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
