import React, { useState, useRef, useEffect } from "react";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import axios from "axios";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

function ImageUploader() {
  const toast = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [predictionResult, setPredictionResult] = useState("");
  const [accuracy, setAccuracy] = useState(null);
  const [user, setUser] = useState(null);
  const fileUploadRef = useRef(null);

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(setUser);
  }, []);

  const onSave = async () => {
    if (!user) {
      toast.current.show({
        severity: "warn",
        summary: "Login Required",
        detail: "Please log in to save images.",
      });
      return;
    }

    if (!imageFile || !predictionResult) {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail:
          "You need to upload an image and get a prediction result before saving.",
      });
      return;
    }

    try {
      const storage = getStorage();
      const fileRef = storageRef(storage, `PredictionImages/${imageFile.name}`);
      const fileSnapshot = await uploadBytes(fileRef, imageFile);
      const imageUrl = await getDownloadURL(fileSnapshot.ref);

      const db = getFirestore();
      const predictionId = uuidv4();
      await setDoc(doc(db, "users", user.uid, "predictions", predictionId), {
        imageName: imageFile.name,
        imageUrl: imageUrl,
        predictionResult: predictionResult,
        accuracy: accuracy,
        predictionId: predictionId,
        timestamp: serverTimestamp(),
        userId: user.uid,
      });
      onCancel();
      // Clear the uploaded file and reset the state
      if (fileUploadRef.current) {
        fileUploadRef.current.clear();
      }

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Image and prediction data saved successfully!",
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail:
          "Failed to save the image and prediction data: " + error.message,
      });
    }
  };

  const onUpload = (event) => {
    const file = event.files[0];
    setImageFile(file);

    const reader = new FileReader();

    reader.onload = () => setImageUrl(reader.result);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:5001/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        if (response.data.success) {
          setPredictionResult(response.data.prediction);
          setAccuracy(response.data.accuracy); // Assuming accuracy is returned here
          window.scrollTo({
            left: 0,
            top: document.body.scrollHeight,
            behavior: "smooth", // For a smooth scroll
          });
          toast.current.show({
            severity: "success",
            summary: "Prediction Success",
            detail:
              "Predicted Label: " +
              response.data.prediction +
              ", Accuracy: " +
              response.data.accuracy.toFixed(2) +
              "%",
          });
        } else {
          throw new Error(response.data.error || "Failed to get prediction");
        }
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Prediction Error",
          detail:
            "Error during prediction: " +
            (error.response?.data?.detail || error.message),
        });
      });
  };

  const onCancel = () => {
    setImageUrl("");
    setImageFile(null);
    setPredictionResult("");
    setAccuracy(null);
  };

  return (
    <Card>
      <div className=" text-3xl m-3 ">Image Upload and Detection</div>

      <Toast ref={toast} />
      {imageUrl && (
        <div className="p-shadow-3  ">
          <p className="mb-2 text-xl">Image Name: {imageFile.name}</p>{" "}
          {/* Display image name */}
          <img
            src={imageUrl}
            alt="Uploaded Image"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
            className="p-shadow-2 my-3"
          />
        </div>
      )}
      {predictionResult && (
        <div className="p-mt-2 my-3 p-2">
          <strong>Result:</strong> {predictionResult}
          <div className="my-3">
            <strong>Accuracy:</strong>{" "}
            {accuracy ? `${accuracy.toFixed(2)}%` : "N/A"}
          </div>
        </div>
      )}
      <div className="shadow-3">
        <FileUpload
          ref={fileUploadRef}
          name="file"
          accept="image/*"
          customUpload
          uploadHandler={onUpload}
          maxFileSize={5000000}
          emptyTemplate={
            <p className="my-3">Drag and drop files here to upload.</p>
          }
          chooseLabel="Select Image"
          uploadLabel="Start Detection"
          cancelLabel="Abort Upload"
          onClear={onCancel}
          onRemove={onCancel}
        />
      </div>
      <Button
        label="Save"
        icon="pi pi-save"
        onClick={onSave}
        className=" my-2 "
      />
    </Card>
  );
}

export default ImageUploader;
