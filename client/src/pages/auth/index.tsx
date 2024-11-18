import {
  SignedOut,
  SignUpButton,
  SignInButton,
  SignedIn,
} from "@clerk/clerk-react";
import logo from "../../assets/logo.png";
import "./auth-style.css";
import { Navigate } from "react-router-dom";

export const Auth = () => {
  return (
    <div className="sign-in-container">
      <div className="auth-header">
        <img src={logo} alt="FinBud logo" className="logo"></img>
        <h1>FinBud</h1>
      </div>
      <p>Your Personal Finance Tracking Buddy</p>
      <SignedOut>
        <div className="auth-button">
          <SignUpButton mode="modal" />
          <SignInButton mode="modal" />
        </div>
      </SignedOut>
      <SignedIn>
        <Navigate to="/" />
      </SignedIn>
    </div>
  );
};
