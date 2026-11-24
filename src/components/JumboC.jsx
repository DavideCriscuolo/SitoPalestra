import "./../css/Jumbo.scss";
import { useEffect, useRef, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { whatsappLink } from "../data/site";
import OpenBadge from "./OpenBadge";

const highlights = ["Sala pesi", "Sala corsi", "Personal trainer", "Schede su misura"];

export default function Jumbo() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(true);
  // Sorgente scelta subito (non dopo il primo render), così il download parte al caricamento.
  const [videoSrc] = useState(() =>
    window.innerWidth <= 768 ? "/img/jumbo-480p-light.mp4" : "/img/jumbo-altro-720p.mp4"
  );
  const [playing, setPlaying] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  // Il video entra in dissolvenza solo quando ha il primo frame: niente immagine diversa prima.
  const [ready, setReady] = useState(false);

  // Mette in pausa il video quando l'hero esce dallo schermo: niente decodifica durante lo scroll.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;
    if (video.readyState >= 2) setReady(true);
    if (playing && inView) {
      video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [playing, inView, videoSrc]);

  return (
    <section ref={sectionRef} className="hero" aria-labelledby="hero-title">
      <video
        ref={videoRef}
        className={`hero-video ${ready ? "is-ready" : ""}`}
        src={videoSrc}
        muted
        loop
        playsInline
        autoPlay={playing}
        preload="auto"
        aria-hidden="true"
        onLoadedData={() => setReady(true)}
      />
      <div className="hero-overlay" />

      <div className="container hero-content">
        <div className="hero-meta">
          <p className="eyebrow m-0">Palestra a Eboli</p>
          <OpenBadge />
        </div>
        <h1 id="hero-title" className="hero-title">
          Costruisci la tua <span>forza</span>
        </h1>
        <p className="hero-subtitle">
          Supera i tuoi limiti e diventa la tua versione migliore, con un
          allenamento seguito da chi ti conosce.
        </p>
        <div className="hero-cta">
          <HashLink smooth to="/#service" className="btn-ui btn-ui--primary">
            Scopri i servizi
            <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
          </HashLink>
          <a
            href={whatsappLink("Ciao! Vorrei informazioni sulla palestra.")}
            className="btn-ui btn-ui--ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" />
            Scrivici
          </a>
        </div>
      </div>

      <div className="hero-strip">
        <ul className="container">
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="hero-video-toggle"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? "Metti in pausa il video" : "Riproduci il video"}
      >
        <FontAwesomeIcon icon={playing ? faPause : faPlay} />
      </button>
    </section>
  );
}
