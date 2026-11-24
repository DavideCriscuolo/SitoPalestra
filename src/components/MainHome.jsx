import "./../css/MainHome.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faClipboardList,
  faUserCheck,
  faRobot,
  faTicket,
  faClock,
  faLocationDot,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import CardC from "./CardC";
import Reveal from "./Reveal";
import OpenBadge from "./OpenBadge";
import MapEmbed from "./MapEmbed";
import useOpenStatus from "../hooks/useOpenStatus";
import { ADDRESS, MAPS_LINK, MEMBER_AREA_ENABLED, SCHEDULE, whatsappLink } from "../data/site";

const baseFeatures = [
  {
    icon: faDumbbell,
    title: "Attrezzature all'avanguardia",
    text: "Sala pesi e sala corsi pensate per un allenamento completo.",
  },
  {
    icon: faClipboardList,
    title: "Scheda personalizzata",
    text: "Il tuo programma, costruito sui tuoi obiettivi e aggiornato nel tempo.",
  },
];

const memberFeatures = [
  {
    icon: faUserCheck,
    title: "Misure monitorate",
    text: "Tieni traccia dei progressi dalla tua area personale.",
  },
  {
    icon: faRobot,
    title: "GymBro AI",
    text: "L'assistente digitale per gli iscritti, sempre pronto a rispondere.",
  },
];

const publicFeatures = [
  {
    icon: faUserCheck,
    title: "Personal trainer",
    text: "Lezioni private con assistenza continua e monitoraggio dei progressi.",
  },
  {
    icon: faTicket,
    title: "Ingresso giornaliero",
    text: "Vuoi provare? Puoi allenarti anche per un solo giorno.",
  },
];

const features = [
  ...baseFeatures,
  ...(MEMBER_AREA_ENABLED ? memberFeatures : publicFeatures),
];

export default function MainHome() {
  const { today } = useOpenStatus();

  return (
    <main id="main-content" className="main-home">
      {/* Chi siamo */}
      <section id="Chi_siamo" className="section about">
        <div className="container">
          <div className="row gx-lg-5 gy-5 align-items-start">
            <Reveal className="col-lg-5">
              <p className="eyebrow">Chi siamo</p>
              <h2 className="section-title">
                La tua palestra <span>di fiducia</span>
              </h2>
              <p className="lead-text">
                Palasportmax è il posto dove raggiungere i tuoi obiettivi di
                fitness e benessere, con attrezzature all'avanguardia e
                un'esperienza di allenamento completa.
              </p>
            </Reveal>
            <div className="col-lg-7">
              <ul className="feature-grid">
                {features.map((f, i) => (
                  <Reveal as="li" key={f.title} className="feature" delay={i * 0.06}>
                    <span className="feature-icon">
                      <FontAwesomeIcon icon={f.icon} aria-hidden="true" />
                    </span>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Servizi */}
      <section id="service" className="section services">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <p className="eyebrow">I nostri servizi</p>
              <h2 className="section-title">
                Scegli come <span>allenarti</span>
              </h2>
            </div>
            <p className="lead-text">
              Dall'ingresso singolo al percorso con personal trainer: scrivici
              su WhatsApp e ti rispondiamo con tutte le informazioni.
            </p>
          </Reveal>
          <div className="services-grid">
            <CardC />
          </div>
        </div>
      </section>

      {/* Orari e contatti */}
      <section id="contact" className="section contact">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Vieni a trovarci</p>
            <h2 className="section-title">
              Orari e <span>contatti</span>
            </h2>
          </Reveal>

          <div className="row g-4 mt-2">
            <Reveal className="col-lg-5">
              <div className="surface h-100">
                <h3 className="contact-title">
                  <FontAwesomeIcon icon={faClock} aria-hidden="true" />
                  Orari di apertura
                </h3>
                <OpenBadge className="mb-2" />
                <dl className="schedule">
                  {SCHEDULE.map((row) => {
                    const isToday = row.days.includes(today);
                    return (
                      <div
                        className={`schedule-row ${isToday ? "is-today" : ""}`}
                        key={row.label}
                      >
                        <dt>
                          {row.label}
                          {isToday && <span className="today-tag">Oggi</span>}
                        </dt>
                        <dd>
                          {row.hours.map(([from, to]) => (
                            <span key={from}>
                              {from} – {to}
                            </span>
                          ))}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
                <a
                  className="btn-ui btn-ui--whatsapp btn-ui--block mt-4"
                  href={whatsappLink("Ciao! Vorrei informazioni sulla palestra.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" />
                  Scrivici su WhatsApp
                </a>
              </div>
            </Reveal>

            <Reveal className="col-lg-7" delay={0.08}>
              <div className="surface h-100 d-flex flex-column">
                <h3 className="contact-title">
                  <FontAwesomeIcon icon={faLocationDot} aria-hidden="true" />
                  Dove siamo
                </h3>
                <p className="address">
                  {ADDRESS}
                  <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
                    Indicazioni
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" />
                  </a>
                </p>
                <MapEmbed />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
