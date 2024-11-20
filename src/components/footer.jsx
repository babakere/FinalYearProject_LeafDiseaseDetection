import React from "react";
import { Button } from "primereact/button";
import "primeflex/primeflex.css"; // Import PrimeFlex

const Footer = () => {
  return (
    <div
      className="p-d-flex p-jc-center p-ai-center p-py-3"
      style={{ backgroundColor: "#f8f9fa", borderTop: "1px solid #dee2e6" }}
    >
      <div className="p-grid p-nogutter">
        <div className="p-col-12 p-text-center">
          © {new Date().getFullYear()} Vine Leaf Classifier
        </div>
      </div>
    </div>
  );
};

export default Footer;
