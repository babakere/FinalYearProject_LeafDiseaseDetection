import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import TableData from "./tabledata";
import { auth } from "../firebaseConfig"; // Make sure the path matches
import DeleteUserAccount from "./deleteAccount";
import { Message } from "primereact/message";
import { Card } from "primereact/card";

export default function Profilep() {
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();
  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserDetails(user.uid);
      } else {
        console.log("Redirecting to login, no user signed in.");
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchUserDetails = (userId) => {
    const userDocRef = doc(getFirestore(), "users", userId);
    getDoc(userDocRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserDetails({
            email: capitalize(data.email || ""),
            firstName: capitalize(data.firstName || "N/A"),
            lastName: capitalize(data.lastName || "N/A"),
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  };

  const renderDialogFooter = () => (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setDisplayConfirmation(false)}
        className="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => setDisplayConfirmation(false)}
        autoFocus
      />
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <div className="p-grid p-justify-center">
        <div>
          <Card title="Profile Page" className="w-5 mx-auto my-3 shadow-6" />

          <div className="p-card p-p-4 shadow-5">
            <h3 className="p-text-center my-7 p-3">
              Welcome, <br></br>
              {userDetails.firstName} {userDetails.lastName}
            </h3>
            <div className="p-fieldset w-9 mx-auto p-4">
              <div className=" p-mt-3 text-xl">
                <label htmlFor="email">Email: </label>
                <span id="email">{userDetails.email}</span>
              </div>
              <div className=" p-mt-3 my-3 text-xl">
                <label htmlFor="firstName">First Name: </label>
                <span id="firstName">{userDetails.firstName}</span>
              </div>
              <div className=" p-mt-3 my-3 text-xl">
                <label htmlFor="lastName">Last Name: </label>
                <span id="lastName">{userDetails.lastName}</span>
              </div>
            </div>
            {auth.currentUser && (
              <DeleteUserAccount
                userId={auth.currentUser.uid}
                onDeletionComplete={() => navigate("/")}
              />
            )}
          </div>
        </div>
        <div className=" my-8">
          <TableData />
        </div>
        <div className="m-4 shadow-3 ">
          <Message
            severity="warn"
            text="Disclaimer: All images uploaded will be used to improve our disease detection algorithms and ensure better accuracy."
          />
        </div>
      </div>
      <Dialog
        visible={displayConfirmation}
        style={{ width: "450px" }}
        header="Confirm Deletion"
        modal
        footer={renderDialogFooter()}
        onHide={() => setDisplayConfirmation(false)}
        aria-labelledby="confirmation-dialog-label"
      >
        Are you sure you want to delete your account?
      </Dialog>
    </div>
  );
}
