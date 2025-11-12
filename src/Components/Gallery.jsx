import React, { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "./Lightbox.jsx";
import image1 from "../assets/christmas1.jpg";
import image2 from "../assets/christmas2.jpg"; 
import image3 from "../assets/christmas3.jpg";
import image4 from "../assets/christmas4.jpg";
import video1 from "../assets/video1.mp4";
import logo from "../assets/idvzhi_logo.jpg"

/*
  MEDIA SOURCE:
  For Drive links, use:
    https://drive.google.com/uc?export=view&id=FILE_ID
  or for direct download:
    https://drive.google.com/uc?export=download&id=FILE_ID

  Example items below include both images and a sample mp4.
  Replace URLs with your actual image/video URLs (Drive or hosted).
*/

const MEDIA_ITEMS = [
  // images (remote or local: "/assets/img1.jpg")
  { id: "1", type: "image", src: image1 },
  { id: "2", type: "image", src: image2 },
  { id: "4", type: "image", src: image3 },
  { id: "5", type: "image", src: image1 },
  { id: "6", type: "image", src: image2 },
  { id: "7", type: "image", src: image4 },
  { id: "8", type: "image", src: image2 },
  { id: "9", type: "image", src: image3 },

  // Drive example (replace FILE_ID)
  { id: "3", type: "image", src: image4 },

  // video (local or hosted)
  { id: "v1", type: "video", src: video1 },

  // drive-hosted video example:
  // { id: "v2", type: "video", title: "After Party", src: "https://drive.google.com/uc?export=download&id=YOUR_VIDEO_FILE_ID" }
];

export default function Gallery() {
  const [filter, setFilter] = useState("all"); // all | images | videos
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = MEDIA_ITEMS.filter(
    (m) => filter === "all" || (filter === "images" && m.type === "image") || (filter === "videos" && m.type === "video")
  );

  const visibleItems = showAll ? filtered : filtered.slice(0, 3);

  function openLightbox(index) {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }

  return (
    <div className="page">
      {/* ✅ Header */}
      <div className="top-header">
        <img src={logo} alt="Club Logo" className="club-logo" />
        <h1 className="club-name">Idavazhi Arts & Sports Club</h1>
      </div>
      <header className="header">
        <h1>🎄Christmas Memories</h1>
        <p className="sub">A collection of photos & videos from last year's events</p>

        <div className="controls">
          <button className={`btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
          <button className={`btn ${filter === "images" ? "active" : ""}`} onClick={() => setFilter("images")}>Photos</button>
          <button className={`btn ${filter === "videos" ? "active" : ""}`} onClick={() => setFilter("videos")}>Videos</button>
        </div>
      </header>

      <main className="grid">
        {visibleItems.map((item, idx) => (
          <motion.div
            className="card"
            key={item.id}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => openLightbox(idx)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") openLightbox(idx); }}
            aria-label={item.title}
          >
            {item.type === "image" ? (
              <img src={item.src} alt={item.title} loading="lazy" className="media" />
            ) : (
            //   <div className="video-thumb">
            //     <video src={item.src} preload="metadata" muted playsInline className="media" />
            //     <div className="play-overlay">▶</div>
            //   </div>
            <div className="video-thumb">
            <video
                src={item.src}
                controls
                muted
                playsInline
                preload="metadata"
                className="media"
                style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none",}}
                onError={(e) => console.error("Video load error:", e)}
            />
           
            {/* <div className="play-overlay">▶</div> */}
            <div className="play-button-overlay">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                width="50"
                height="50"
                fill="white"
              >
                <circle cx="32" cy="32" r="30" fill="rgba(0,0,0,0.4)" />
                <polygon points="26,20 26,44 46,32" fill="white" />
              </svg>
            </div>
            </div>
            )}

            <div className="caption">{item.title}</div>
          </motion.div>
        ))}
      </main>

      {/* 👇 See More / See Less Button */}
      {filtered.length > 3 && (
        <div className="see-more-container">
          <button className="see-more-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? "See Less ▲" : "See More ▼"}
          </button>
        </div>
      )}
{/* 
      <footer className="footer">
        © {new Date().getFullYear()} Idavazhi Club • View-only gallery
      </footer> */}

      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          startIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}
