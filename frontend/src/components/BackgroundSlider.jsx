import React, { useState, useEffect } from "react";

const images = [
  "/images/bg1.jpg", // ✅ Place images in 'public/images/'
  "/images/bg2.jpg",
  "/images/bg3.jpg",
  "/images/bg4.jpg",
  "/images/bg5.jpg"
];

const BackgroundSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // ✅ Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10">  {/* ✅ Lower z-index */}
      {images.map((image, i) => (
        <div
          key={i}
          className={`absolute w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}
    </div>
  );
};

export default BackgroundSlider;
