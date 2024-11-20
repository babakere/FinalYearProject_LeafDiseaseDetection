import React, { useRef } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

export default function Instructions() {
  const steps = [
    {
      step: 1,
      text: "1. Navigate to the 'Upload' page via the main menu or the button below.",
    },
    {
      step: 2,
      text: "2. Click the 'Select Image' button to choose an image file of your vine leaf.",
    },
    {
      step: 3,
      text: "3. Ensure the image is clear and the leaf is fully visible for accurate classification.",
    },
    {
      step: 4,
      text: "4. Once an image is selected, the upload will begin automatically.",
    },
    {
      step: 5,
      text: "5. Wait for the analysis to complete. This may take a few moments.",
    },
    {
      step: 6,
      text: "6. Review the prediction result displayed on the screen along with the accuracy percentage.",
    },
    {
      step: 7,
      text: "7. If you're satisfied with the prediction, click the 'Save' button to store the result in your profile.",
    },
    {
      step: 8,
      text: "8. Access saved results anytime from your profile to track the health of your vines over time.",
    },
  ];

  const imageUploaderRef = useRef(null);

  const handleScrollToImageUploader = () => {
    imageUploaderRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Card>
      <div className="my-4">
        <div className="block text-3xl text-left pb-3">
          How to upload and classify vine leaves
        </div>
      </div>

      <div className="p-m-3">
        {steps.map((step, index) => (
          <div key={index} className="p-my-2 text-left mx-3">
            <div>{step.text}</div>

            {index !== steps.length + 1 && <hr className="my-3" />}
          </div>
        ))}
      </div>
      <div className="p-mt-4 my-5 p-divider">
        <Button
          label="Start Uploading"
          className="p-button-primary mr-2"
          onClick={handleScrollToImageUploader}
          aria-label="Start Uploading"
        />
        <Link to="/profile">
          <Button
            label="Go to Profile"
            className="p-button-secondary"
            aria-label="Go to Profile"
          />
        </Link>
      </div>

      <div ref={imageUploaderRef} className="p-mt-4"></div>
    </Card>
  );
}
