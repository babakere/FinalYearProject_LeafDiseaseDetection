import React, { useState } from "react";
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  deleteDoc,
  collection,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

function DeleteUserAccount({ userId, onDeletionComplete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const db = getFirestore(); // Ensure db is instantiated correctly here

  const handleDelete = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("No user is currently signed in.");
      setShowConfirm(false);
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, password);

    try {
      await reauthenticateWithCredential(user, credential);
      await deleteUserDocuments(userId);
      await deleteUser(user);
      alert("Your account has been successfully deleted.");
      onDeletionComplete();
    } catch (error) {
      alert(`Failed to delete account: ${error.message}`);
      console.error("Deletion error:", error);
    } finally {
      setShowConfirm(false);
    }
  };

  const deleteUserDocuments = async (userId) => {
    const userDocRef = doc(db, "users", userId);
    await deleteDoc(userDocRef); // Delete the main document

    const predictionsRef = collection(db, "users", userId, "predictions");
    const snapshot = await getDocs(predictionsRef);
    const batch = writeBatch(db); // Correctly reference batch from Firestore instance
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit(); // Commit the batch deletion
  };

  const renderFooter = () => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => setShowConfirm(false)}
          className="p-button-text"
          aria-label="Cancel Deletion"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={handleDelete}
          autoFocus
          aria-label="Confirm Deletion"
        />
      </div>
    );
  };

  return (
    <div>
      <Button
        label="Delete My Account"
        onClick={() => setShowConfirm(true)}
        className="p-button-danger my-5"
        aria-label="Delete account"
      />
      <Dialog
        header="Confirm Account Deletion"
        visible={showConfirm}
        style={{ width: "450px" }}
        footer={renderFooter()}
        onHide={() => setShowConfirm(false)}
        aria-label="Confirmation Dialog"
      >
        <div className="confirmation-content">
          <p>Please confirm your password to delete your account:</p>
          <InputText
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            autoFocus
            aria-label="Password Input"
          />
        </div>
      </Dialog>
    </div>
  );
}

export default DeleteUserAccount;
