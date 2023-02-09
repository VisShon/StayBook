import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, AuthContextProps } from "../context/AuthContext";
export default function SignUp() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [displayedErr, setDisplayedError] = useState("Please enter credentials");
  const { Login, Logout, createUserWithEmail, addName } = useContext<AuthContextProps>(AuthContext);
  const loginWithGmail = async () => {
    await Login().then(() => { 
      nav('/profile')
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError("");
    if (!userName || userName === "") {
      setDisplayedError("Please enter a name!");
      return;
    }
    if (!email || email === "") {
      setDisplayedError("Please enter an email!");
      return;
    }

    if (!password || password === "") { 
      setDisplayedError("Please enter a password!");
      return;
    }
    if (password !== confirmpassword) {
      setDisplayedError("Passwords do not match!");
      return;
     }

    try {
      await createUserWithEmail(email, password).then(() => {
        console.log("User created")
      });
    
    } catch (err: any) {
      setDisplayedError(err.message);
      setError(err.message);
      console.log(err.message);
      return;
    }
    try {
      await addName(userName).then(() => {
        console.log("Name added");
        console.log(userName);
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
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
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
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Full Name"
          />

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
          <input
            onChange={(e) => setconfirmPassword(e.target.value)}
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
          />

          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#cf8f24",
              color: "white",
              borderRadius: "5px",
              padding: "0.5rem",
            }}
            // type="submit"
          >
            Create Account
          </button>
          <button
            onClick={loginWithGmail}
            style={{
              backgroundColor: "#cf8f24",
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
