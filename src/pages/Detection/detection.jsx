import React from "react";
import "primeflex/primeflex.css";
import Instructions from "../../components/instructions";
import ImageUploader from "./ImageUploader";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { Message } from "primereact/message";

function Detection() {
  return (
    <div>
      <Card
        title="Image Upload and Detection"
        className="w-5 mx-auto my-3 shadow-3"
      />

      <div className="">
        <div className="flex flex-row align-items-center justify-content-center">
          {/* Card for instructions and example image */}
          <Card className=" mx-5 w-5 shadow-5">
            <div className=" text-center text-xl">
              Before we dive into Detection <br /> <br />
              please make sure you've read and understood the instructions.
              <br /> <br /> Also, ensure that you upload the leaves in an
              upright position, as shown in the image below:
              <div className="my-6">
                <img
                  alt="Leaf"
                  src="/Picture1.png"
                  className="border-round-3xl w-full sm:w-auto md:w-25rem"
                />
              </div>
            </div>
          </Card>

          {/* Instructions component */}
          <div className="m-2 shadow-2">
            <Instructions />
          </div>
        </div>
        <Divider />
        <div className="shadow-4 w-8 mx-auto m-4">
          <ImageUploader className="mx-auto my-5 " />
        </div>
        <div className="mx-auto">
          <Message
            className=" mx-auto m-5 shadow-5 p-text-green"
            severity="warn"
            text="Disclaimer: All images uploaded will be used to improve our disease detection algorithms and ensure better accuracy."
          />
        </div>
      </div>
    </div>
  );
}

export default Detection;
