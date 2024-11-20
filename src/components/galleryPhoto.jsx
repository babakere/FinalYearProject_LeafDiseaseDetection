// ControlledGalleria.js
import React, { useState } from "react";
import { Galleria } from "primereact/galleria";

export default function ControlledGalleria() {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    {
      itemImageSrc: "/blackrot.JPG",
      alt: "Black Rot",
      title: "Black Rot",
      description:
        "Black Rot, caused by the fungus Guignardia bidwellii, mainly affects the fruit but can also cause lesions on leaves. It's identified by circular brown lesions on the leaves that have a ring of black dots. Early identification and removal of infected plant material, along with the appropriate use of fungicides, are key to management.",
    },
    {
      itemImageSrc: "/blackMeasles.JPG",
      alt: "Black Measels",
      title: "Black Measels",
      description:
        "Black Measles, also known as Esca, is a complex disease involving fungi that live inside the wood of grapevines. Symptoms on leaves manifest as yellow and white chlorotic spots, which later turn into necrotic areas. Effective treatment involves careful vineyard management and sometimes the application of protective wound paint on pruning cuts.",
    },
    {
      itemImageSrc: "/Healthy.JPG",
      alt: "Healthy",
      title: "Healthy Leaf",
      description:
        "A healthy grapevine leaf is vibrant green, with a uniform color and texture. A good indicator of a healthy vineyard is the presence of robust foliage, which signifies effective photosynthesis—a critical process for the production of sugars necessary for grape development.",
    },
    {
      itemImageSrc: "/leafBlight.JPG",
      alt: "Leaf Blight",
      title: "Leaf Blight",
      description:
        "Leaf Blight is typically caused by a bacterial or fungal infection and results in irregular brown spots surrounded by yellow halos on the leaves. The disease can spread quickly under warm, wet conditions. Management includes improved air circulation through proper pruning and the application of appropriate fungicides.",
    },
  ];

  const itemTemplate = (item) => {
    return (
      <img
        src={item.itemImageSrc}
        onError={(e) => (e.target.src = "/Healthy.JPG")}
        alt={item.alt}
        style={{ width: "90%", display: "block", borderRadius: "10px" }}
      />
    );
  };

  return (
    <div>
      <div>
        <Galleria
          value={images}
          activeIndex={activeIndex}
          onItemChange={(e) => setActiveIndex(e.index)}
          item={itemTemplate}
          showThumbnails={false}
          showItemNavigators={true}
          style={{ maxWidth: "640px" }}
        />
      </div>
      <div className="description">
        <h2>{images[activeIndex].title}</h2>
        <p>{images[activeIndex].description}</p>
      </div>
    </div>
  );
}
