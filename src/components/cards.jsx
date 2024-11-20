import React from "react";
import { Card } from "primereact/card";

export default function Cards() {
  const header = <img alt="Leaf with disease" src="/Picture1.png" />;

  return (
    <div className="card flex justify-content-center">
      <Card
        title="Leaf Image With Disease"
        subTitle="Detecting disease"
        header={header}
        className="md:w-25rem border-round-xl shadow-5"
      ></Card>
    </div>
  );
}
