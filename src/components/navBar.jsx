import React, { useEffect, useState } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import "primeflex/primeflex.css";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function NavBar() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      className: "shadow-2 mx-2",
      command: () => navigate("/"),
      ariaLabel: "Home Page",
    },
    {
      label: "About",
      icon: "pi pi-star",
      className: " shadow-2 mx-2",
      command: () => navigate("/about"),
      ariaLabel: "About Page",
    },
    isLoggedIn && {
      label: "Detection",
      icon: "pi pi-cloud-upload",
      className: " shadow-2 mx-2",
      command: () => navigate("/detection"),
      ariaLabel: "Detection Page",
    },
    isLoggedIn && {
      label: "Profile",
      icon: "pi pi-user",
      className: " shadow-2 mx-2",
      command: () => navigate("/profile"),
      ariaLabel: "Profile Page",
    },
  ].filter(Boolean);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/"); // Redirect to home page after logout
      })
      .catch((error) => {
        // An error happened.
        console.error("Sign out error", error);
      });
  };

  const end = isLoggedIn ? (
    <Button
      label="Log Out"
      icon="pi pi-sign-out"
      onClick={handleLogout}
      className=" shadow-2 mx-2"
      aria-label="Log Out"
    />
  ) : (
    <div className="flex align-items-center gap-3 ">
      <Button
        label="Login"
        icon="pi pi-sign-in"
        className=" shadow-2 mx-2"
        onClick={() => navigate("/login")}
        aria-label="Login Page"
      />
      <Button
        label="Sign Up"
        icon="pi pi-user-plus"
        className=" shadow-2 mx-2"
        onClick={() => navigate("/signup")}
        aria-label="Sign Up Page"
      />
    </div>
  );

  return (
    <div className="nav shadow-5">
      <Menubar model={items} end={end} />
    </div>
  );
}

export default NavBar;
