import React, { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { format } from "date-fns";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const TableData = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData(user.uid);
      } else {
        console.log("No user signed in, redirecting to login.");
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchData = async (userId) => {
    try {
      const q = query(collection(db, "users", userId, "predictions"));
      const querySnapshot = await getDocs(q);
      const loadedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate(),
      }));
      setData(loadedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch data",
        life: 3000,
      });
    }
  };

  const deleteData = async (rowData) => {
    try {
      await deleteDoc(
        doc(db, "users", auth.currentUser.uid, "predictions", rowData.id)
      );
      setData(data.filter((item) => item.id !== rowData.id));
      toast.current.show({
        severity: "success",
        summary: "Deleted",
        detail: "Data Deleted Successfully",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Delete Failed: " + error.message,
        life: 3000,
      });
    }
    setDisplayConfirmation(false);
  };

  const confirmDelete = (rowData) => {
    setSelectedItem(rowData);
    setDisplayConfirmation(true);
  };

  const imageTemplate = (rowData) => {
    return (
      <img
        src={rowData.imageUrl}
        alt={rowData.imageName}
        className="shadow-2"
        style={{ width: 100, height: 100, borderRadius: "5px" }}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"
        onClick={() => confirmDelete(rowData)}
        tooltip="Delete Prediction"
        aria-label="Delete Prediction"
      />
    );
  };

  const accuracyBodyTemplate = (rowData) => {
    return rowData.accuracy ? `${rowData.accuracy.toFixed(2)} %` : "N/A";
  };

  const timestampTemplate = (rowData) => {
    return rowData.timestamp ? format(rowData.timestamp, "PPpp") : "N/A";
  };

  return (
    <div className="flex flex-column align-items-center justify-content-center shadow-6">
      <Toast ref={toast} position="top-right" />
      <DataTable
        value={data}
        rows={10}
        responsiveLayout="scroll"
        className="w-full"
      >
        <Column field="imageName" header="Image Name" />
        <Column field="predictionResult" header="Prediction Result" />
        <Column header="Accuracy" body={accuracyBodyTemplate} />
        <Column header="Image" body={imageTemplate} />
        <Column header="Timestamp" body={timestampTemplate} />
        <Column body={actionBodyTemplate} header="Actions" exportable={false} />
      </DataTable>

      <Dialog
        visible={displayConfirmation}
        style={{ width: "450px" }}
        header="Confirm Deletion"
        modal
        footer={
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => setDisplayConfirmation(false)}
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              className="p-button-text"
              onClick={() => deleteData(selectedItem)}
              autoFocus
            />
          </div>
        }
        onHide={() => setDisplayConfirmation(false)}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          Are you sure you want to delete this item?
        </div>
      </Dialog>
    </div>
  );
};

export default TableData;
