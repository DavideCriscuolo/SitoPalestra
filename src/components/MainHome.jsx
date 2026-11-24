import "./../css/MainHome.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faArrowUpRightFromSquare,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import CardC from "./CardC";
import Reveal from "./Reveal";
import OpenBadge from "./OpenBadge";
import MapEmbed from "./MapEmbed";
import Timetable from "./Timetable";
import {
  ADDRESS,
  MAPS_LINK,
  MEMBER_AREA_ENABLED,
  PHONE_LABEL,
  PHONE_NUMBER,
  whatsappLink,
} from "../data/site";

const baseFeatures = [
  { title: "Attrezzature all'avanguardia", text: "Sala pesi e sala corsi pensate per un allenamento completo." },
  { title: "Scheda personalizzata", text: "Il tuo programma, costruito sui tuoi obiettivi e aggiornato nel tempo." },
];
const memberFeatures = [
  { title: "Misure monitorate", text: "Tieni traccia dei progressi dalla tua area personale." },
  { title: "GymBro AI", text: "L'assistente digitale per gli iscritti, sempre pronto a rispondere." },
];
const publicFeatures = [
  { title: "Personal trainer", text: "Lezioni private con assistenza continua e monitoraggio dei progressi." },
  { title: "Ingresso giornaliero", text: "Vuoi provare? Puoi allenarti anche per un solo giorno." },
];
const features = [...baseFeatures, ...(MEMBER_AREA_ENABLED ? memberFeatures : publicFeatures)];

export default function MainHome() {
  return (
    <main id="main-content" className="main-home">
      {/* Chi siamo */}
      <section id="Chi_siamo" className="section about">
        <div className="container about-grid">
          <Reveal className="about-media">
            <img
              src="/img/about-900.webp"
              alt="Allenamento a corpo libero in sala"
              width="900"
              height="1100"
              loading="lazy"
              decoding="async"
            />
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow">Chi siamo</p>
              <h2 className="section-title">
                La tua palestra <span>di fiducia</span>
              </h2>
              <p className="lead-text mb-4">
                Palasportmax è il posto dove raggiungere i tuoi obiettivi di
                fitness e benessere, con attrezzature all'avanguardia e
                un'esperienza di allenamento completa.
              </p>
            </Reveal>
            <ul className="check-list">
              {features.map((f, i) => (
                <Reveal as="li" key={f.title} delay={i * 0.05}>
                  <span className="check-icon" aria-hidden="true">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Servizi */}
      <section id="service" className="section services">
        <div className="container">
          <Reveal className="section-head-center">
            <p className="eyebrow">I nostri servizi</p>
            <h2 className="section-title">
              Scegli come <span>allenarti</span>
            </h2>
            <p className="lead-text">
              Dall'ingresso singolo al percorso con personal trainer: scrivici
              su WhatsApp e ti rispondiamo con tutte le informazioni.
            </p>
          </Reveal>
          <CardC />
        </div>
      </section>

      {/* CTA con foto */}
      <section className="cta-band" aria-labelledby="cta-title">
        <img
          className="cta-bg"
          src="/img/cta-bg-1600.webp"
          srcSet="/img/cta-bg-800.webp 800w, /img/cta-bg-1600.webp 1600w"
          sizes="100vw"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="container cta-inner">
          <Reveal>
            <p className="eyebrow">Non aspettare lunedì</p>
            <h2 id="cta-title" className="cta-title">
              La prima mossa <span>è la tua</span>
            </h2>
            <div className="cta-actions">
              <a
                className="btn-ui btn-ui--primary"
                href={whatsappLink("Ciao! Vorrei venire a provare la palestra.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" />
                Scrivici su WhatsApp
              </a>
              <a className="btn-ui btn-ui--ghost" href={`tel:${PHONE_NUMBER}`}>
                <FontAwesomeIcon icon={faPhone} aria-hidden="true" />
                Chiama
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Orari e contatti */}
      <section id="contact" className="section contact">
        <div className="container">
          <Reveal className="section-head-center">
            <p className="eyebrow">Vieni a trovarci</p>
            <h2 className="section-title">
              Orari e <span>contatti</span>
            </h2>
            <OpenBadge />
          </Reveal>

          <Reveal>
            <Timetable />
          </Reveal>

          <div className="contact-grid">
            <Reveal className="contact-cards">
              <div className="contact-item">
                <span className="contact-icon" aria-hidden="true">
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                <div>
                  <p className="contact-label">Indirizzo</p>
                  <p className="contact-value">{ADDRESS}</p>
                  <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="contact-link">
                    Indicazioni stradali
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon" aria-hidden="true">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <div>
                  <p className="contact-label">Telefono e WhatsApp</p>
                  <p className="contact-value">
                    <a href={`tel:${PHONE_NUMBER}`}>{PHONE_LABEL}</a>
                  </p>
                  <a
                    href={whatsappLink("Ciao! Vorrei informazioni sulla palestra.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    Scrivici su WhatsApp
                    <FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal className="contact-map" delay={0.06}>
              <MapEmbed />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
