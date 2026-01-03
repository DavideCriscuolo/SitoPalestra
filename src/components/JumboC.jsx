import "./../css/Jumbo.scss";
import { useState, useEffect } from "react";

export default function Jumbo() {
  const [videoSrc, setVideoSrc] = useState("/img/jumbo-altro-720p.mp4");

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setVideoSrc("/img/jumbo-480p-light.mp4");
    }
  }, []);

  return (
    <div className="jumbo-wrapper">
      <div className="jumbo-container">
        <video
          className="jumbo-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="jumbo-overlay"></div>
        <div className="jumbo-content">
          <div className="content-inner">
            <h1 className="jumbo-title">PALASPORTMAX</h1>
            <p className="jumbo-subtitle">
              Costruisci la tua forza. Supera i tuoi limiti. Diventa la tua
              versione migliore.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
