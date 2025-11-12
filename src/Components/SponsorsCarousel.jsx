import React, { useState, useEffect } from "react";
import "./SponsorsCarousel.css";
import image1 from "../assets/christmas1.jpg";
import image2 from "../assets/christmas2.jpg";
import image3 from "../assets/christmas3.jpg";
import image4 from "../assets/christmas4.jpg";

export default function SponsorsCarousel() {
  const sponsors = [image1, image2, image3, image4];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === sponsors.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [sponsors.length]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sponsors.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sponsors.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="sponsors-carousel-wrapper">
      <h2 className="sponsors-title">Our Proud Sponsors</h2>

      <div className="carousel">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {sponsors.map((logo, index) => (
            <div className="carousel-slide" key={index}>
              <img
                src={logo}
                alt={`Sponsor ${index + 1}`}
                className="carousel-image"
              />
            </div>
          ))}
        </div>

        {/* Manual Controls */}
        {/* <button className="nav-button prev" onClick={goToPrev}>
          ❮
        </button>
        <button className="nav-button next" onClick={goToNext}>
          ❯
        </button> */}

        {/* Navigation Dots */}
        <div className="dots">
          {sponsors.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentIndex === index ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
