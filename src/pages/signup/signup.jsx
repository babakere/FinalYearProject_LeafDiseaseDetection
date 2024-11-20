import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

function Signup() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const toast = useRef(null);

  const validateForm = () => {
    if (!checked) {
      return "You must agree to the terms and conditions.";
    }
    if (!firstName.trim()) {
      return "First name is required.";
    }
    if (!lastName.trim()) {
      return "Last name is required.";
    }
    if (!email.includes("@")) {
      return "Email must contain '@'.";
    }
    if (email !== confirmEmail) {
      return "Email addresses do not match.";
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleSignUp = () => {
    const formError = validateForm();
    if (formError) {
      setError(formError);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: formError,
        life: 3000,
      });
      return;
    }

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        return updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        });
      })
      .then(() => {
        const user = getAuth().currentUser;

        return setDoc(doc(db, "users", user.uid), {
          firstName: firstName,
          lastName: lastName,
          email: email,
        });
      })
      .then(() => {
        navigate("/");
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "You are signed up!",
          life: 3000,
        });
      })
      .catch((error) => {
        // Handle errors
        setError(error.message);
        toast.current.show({
          severity: "error",
          summary: "Signup Error",
          detail: error.message,
          life: 3000,
        });
      });
  };

  return (
    <Card className="w-5 mx-auto my-3 h-80rem shadow-6">
      <Toast ref={toast} />
      <div className="Home">
        <div>
          <span className="text-xl font-bold">
            Sign up to Vine Leaf Classifier
          </span>
          <span className="block  my-1">
            Enter your details to start using our AI-powered Image recognition
            tool
          </span>
        </div>

        <div className="field">
          <label htmlFor="firstName" className="block my-3">
            First name
          </label>
          <InputText
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            aria-label="First Name"
          />
        </div>

        <div className="field">
          <label htmlFor="lastName" className="block my-3 ">
            last name
          </label>

          <InputText
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            aria-label="Last Name"
          />
        </div>

        <div className="field">
          <label htmlFor="email1" className="block my-3 ">
            Email address
          </label>
          <InputText
            id="email1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email Address"
          />
        </div>

        <div className="field">
          <label htmlFor="email2" className="block my-3 ">
            Confirm Email address
          </label>
          <InputText
            id="email2"
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            aria-label="Confirm Email Address"
          />
        </div>

        <div className="field">
          <label htmlFor="pass1" className="block my-3">
            Password
          </label>
          <div className="password-field">
            <Password
              id="pass1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
              aria-label="Password"
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="pass2" className="block my-3">
            Confirm Password
          </label>
          <div className="password-field">
            <Password
              id="pass2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              toggleMask
              aria-label="Confirm Password"
            />
          </div>
        </div>

        <div className="card flex justify-content-center my-4">
          <Checkbox
            onChange={(e) => setChecked(e.checked)}
            checked={checked}
            className="mx-3"
            aria-label="Agree to Terms and Conditions"
          />
          <span>Agree to terms and conditions to sign up</span>
        </div>
        <div className="my-4">
          <Message
            severity="warn"
            text="Disclaimer: All images uploaded will be used to improve our disease detection algorithms and ensure better accuracy."
          />
        </div>

        <Button onClick={handleSignUp} aria-label="Sign Up Button">
          Sign up
        </Button>
      </div>
    </Card>
  );
}

export default Signup;
