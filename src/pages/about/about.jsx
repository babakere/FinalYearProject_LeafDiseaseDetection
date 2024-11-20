// About.js
import React, { useState } from "react";
import { Card } from "primereact/card";

import { Message } from "primereact/message";
import ControlledGalleria from "../../components/galleryPhoto";

function About() {
  return (
    <div>
      <Card title="Who We Are" className="my-5 w-5 mx-auto text-4xl shadow-5" />

      <Card
        title="Our Mission"
        subTitle="What Drives Us"
        className="about-mission border-round w-11 mx-auto my-5 text-xl shadow-5"
      >
        <p>
          With the cultural significance of vine leaves in culinary traditions
          and the importance of grapevines in the European wine industry,
          safeguarding against diseases is paramount. Our mission is to use
          advanced AI, particularly deep learning and CNNs, to revolutionise
          early disease detection in vineyards, enhancing the sustainability and
          safety of agriculture. This proactive approach aims to protect crop
          yields and maintain the industry's economic stability, contributing to
          global agricultural resilience and food security.
        </p>
      </Card>
      <div className=" mx-auto w-4">
        <Card
          title="Classifications"
          subTitle="These are the classifications of vine leaves we provide"
          className="border-radius-xl shadow-5"
        >
          <ControlledGalleria />
        </Card>
      </div>

      <Message
        severity="warn" // Custom styling to make this green
        text="Disclaimer: All images uploaded will be used to improve our disease detection algorithms and ensure better accuracy."
        className="my-5 shadow-3 p-text-green"
      />
    </div>
  );
}

export default About;
