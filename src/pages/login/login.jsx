import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const toast = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDialogShown, setIsDialogShown] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/profile");
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Login Failed",
          detail: error.message,
          life: 3000,
        });
      });
  };

  const handleForgotPassword = () => {
    setIsDialogShown(true);
  };

  const sendResetEmail = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "Reset Link Sent",
          detail: "A password reset link has been sent to your email.",
          life: 5000,
        });
        setIsDialogShown(false); // Close the dialog after sending the email
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Failed to Send Reset Link",
          detail: error.message,
          life: 5000,
        });
      });
  };

  return (
    <div
      className="p-d-flex p-jc-center p-ai-center p-flex-column "
      style={{ height: "82vh" }}
    >
      <Card className="w-5 mx-auto my-8 p-5 shadow-8">
        <Toast ref={toast} />
        <h1>Login to Vine Leaf Classifier</h1>
        <p>
          Enter your details to continue using our AI-powered Image recognition
          tool or sign up.
        </p>
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="username">Email Address</label>
            <InputText
              id="username"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              aria-label="Email Address"
            />
          </div>
          <div className="p-field my-4">
            <label htmlFor="password">Password</label>
            <Password
              id="password"
              value={password}
              onChange={handlePasswordChange}
              feedback={false}
              placeholder="Enter your password"
              toggleMask
              aria-label="Password"
            />
          </div>
          <Button
            label="Login"
            onClick={handleLogin}
            className="w-5"
            aria-label="Login Button"
          />
        </div>
        <div>
          <Button
            label="Forgot Password?"
            className="my-3 w-5"
            onClick={handleForgotPassword}
            aria-label="Forgot Password Button"
          />
        </div>
      </Card>
      <Dialog
        header="Reset Your Password"
        visible={isDialogShown}
        style={{ width: "450px" }}
        modal
        onHide={() => setIsDialogShown(false)}
      >
        <div>
          <p>
            Please enter your email address to receive a password reset link:
          </p>
          <InputText
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            autoFocus
            aria-label="Email Address for Password Reset"
          />
          <Button
            label="Send Reset Email"
            onClick={sendResetEmail}
            className="p-mt-2 mx-2"
            aria-label="Send Reset Email Button"
          />
        </div>
      </Dialog>
    </div>
  );
}

export default Login;
