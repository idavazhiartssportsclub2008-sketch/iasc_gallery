import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";

export default function Lightbox({ items, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  function prev() {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }

  function next() {
    setIndex((i) => (i + 1) % items.length);
  }

  const current = items[index];

  return (
    <div className="lightbox-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <motion.div
        className="lightbox-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <button className="close" onClick={onClose} aria-label="close">✕</button>

        <div className="lightbox-media">
          {/* {current.type === "image" ? (
            <img src={current.src} alt={current.title} />
          ) : (
            <ReactPlayer url={current.src} controls width="100%" height="100%" />
          )} */}
          {current.type === "video" ? (
                <video
                src={current.src}
                controls
                autoPlay
                playsInline
                muted
                style={{ width: "100%", height: "auto", maxHeight: "80vh" }}
                onError={(e) => console.error("Lightbox video load error:", e)}
                />
            ) : (
                <img
                src={current.src}
                alt={current.title}
                style={{ maxHeight: "80vh", objectFit: "contain" }}
                />
            )}
        </div>

        <div className="lightbox-footer">
          <div className="title">{current.title}</div>
          <div className="lightbox-controls">
            <button onClick={prev} className="nav">◀</button>
            <button onClick={next} className="nav">▶</button>
            <a className="download" href={current.src} target="_blank" rel="noreferrer">Open</a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
