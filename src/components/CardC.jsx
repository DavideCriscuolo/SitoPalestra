import "./../css/CardC.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Reveal from "./Reveal";
import { whatsappLink } from "../data/site";

const services = [
  {
    id: 1,
    img: "personal",
    title: "Personal",
    desc: "Lezioni private personalizzate con assistenza continua e monitoraggio completo.",
    message:
      "Ciao! Vorrei sapere di più sulle lezioni private con un personal trainer.",
  },
  {
    id: 2,
    img: "mensile",
    title: "Mensile",
    desc: "Accesso a scheda personalizzata, sala pesi, sala corsi e spogliatoio.",
    message: "Ciao! Mi interessano le informazioni sull'abbonamento mensile.",
  },
  {
    id: 3,
    img: "giornaliero",
    title: "Giornaliero",
    desc: "Singolo ingresso in giornata con piena disponibilità della struttura e dello staff.",
    message:
      "Ciao! Vorrei sapere se è possibile fare un ingresso giornaliero e qual è il costo.",
  },
  {
    id: 4,
    img: "consulenza",
    title: "Consulenza",
    desc: "Consigli sul piano di allenamento più adatto alle tue esigenze e ai tuoi obiettivi.",
    message:
      "Ciao! Vorrei ricevere maggiori informazioni sul piano di consulenza personalizzata.",
  },
];

export default function CardC() {
  return (
    <>
      {services.map((service, i) => (
        <Reveal as="article" key={service.id} className="service-card" delay={i * 0.06}>
          <div className="service-media">
            <img
              src={`/img/cards/${service.img}-800.webp`}
              srcSet={`/img/cards/${service.img}-480.webp 480w, /img/cards/${service.img}-800.webp 800w`}
              sizes="(max-width: 767px) 82vw, (max-width: 1199px) 45vw, 300px"
              alt=""
              loading="lazy"
              decoding="async"
              width="800"
              height="600"
            />
            <span className="service-index">0{i + 1}</span>
          </div>
          <div className="service-body">
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <a
              className="service-link"
              href={whatsappLink(service.message)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chiedi informazioni su ${service.title} via WhatsApp`}
            >
              <FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" />
              Chiedi informazioni
            </a>
          </div>
        </Reveal>
      ))}
    </>
  );
}
