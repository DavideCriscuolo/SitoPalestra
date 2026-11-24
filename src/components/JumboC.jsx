import "./../css/Jumbo.scss";
import { useEffect, useRef, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faChevronDown,
  faDumbbell,
  faPeopleGroup,
  faUserCheck,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { whatsappLink } from "../data/site";

const strip = [
  { icon: faDumbbell, label: "Sala pesi" },
  { icon: faPeopleGroup, label: "Sala corsi" },
  { icon: faUserCheck, label: "Personal trainer" },
  { icon: faClipboardList, label: "Schede su misura" },
];

export default function Jumbo() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(true);
  // Sorgente scelta subito, così il download parte al caricamento della pagina.
  const [videoSrc] = useState(() =>
    window.innerWidth <= 768 ? "/img/jumbo-480p-light.mp4" : "/img/jumbo-altro-720p.mp4"
  );
  const [playing, setPlaying] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  // Il video compare solo quando ha il primo frame.
  const [ready, setReady] = useState(false);

  // Pausa quando l'hero esce dallo schermo: niente decodifica durante lo scroll.
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
    if (!video) return;
    if (video.readyState >= 2) setReady(true);
    if (playing && inView) {
      video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [playing, inView]);

  return (
    <section ref={sectionRef} className="hero" aria-labelledby="hero-title">
      <div className="hero-stage">
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
          <h1 id="hero-title" className="hero-title">
            Costruisci la tua <span>forza</span>
          </h1>
          <p className="hero-subtitle">
            Supera i tuoi limiti e diventa la tua versione migliore, con un
            allenamento seguito da chi ti conosce.
          </p>
          <div className="hero-cta">
            <a
              href={whatsappLink("Ciao! Vorrei venire a provare la palestra.")}
              className="btn-ui btn-ui--primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" />
              Inizia ora
            </a>
            <HashLink smooth to="/#service" className="btn-ui btn-ui--ghost">
              Scopri i servizi
            </HashLink>
          </div>
        </div>

        <HashLink smooth to="/#Chi_siamo" className="hero-scroll" aria-label="Scorri ai contenuti">
          <FontAwesomeIcon icon={faChevronDown} />
        </HashLink>

        <button
          type="button"
          className="hero-video-toggle"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Metti in pausa il video" : "Riproduci il video"}
        >
          <FontAwesomeIcon icon={playing ? faPause : faPlay} />
        </button>
      </div>

      <ul className="hero-strip">
        {strip.map((item) => (
          <li key={item.label}>
            <FontAwesomeIcon icon={item.icon} aria-hidden="true" />
            {item.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
