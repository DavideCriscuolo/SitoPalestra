import "./../css/CardC.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Reveal from "./Reveal";
import { whatsappLink } from "../data/site";

const services = [
  {
    id: 1,
    img: "personal",
    title: "Personal",
    desc: "Lezioni private personalizzate con assistenza continua e monitoraggio completo.",
    message: "Ciao! Vorrei sapere di più sulle lezioni private con un personal trainer.",
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
    message: "Ciao! Vorrei sapere se è possibile fare un ingresso giornaliero e qual è il costo.",
  },
  {
    id: 4,
    img: "consulenza",
    title: "Consulenza",
    desc: "Consigli sul piano di allenamento più adatto alle tue esigenze e ai tuoi obiettivi.",
    message: "Ciao! Vorrei ricevere maggiori informazioni sul piano di consulenza personalizzata.",
  },
];

export default function CardC() {
  return (
    <div className="program-grid">
      {services.map((s, i) => (
        <Reveal as="article" key={s.id} className="program" delay={i * 0.06}>
          <img
            className="program-img"
            src={`/img/cards/${s.img}-p700.webp`}
            srcSet={`/img/cards/${s.img}-p450.webp 450w, /img/cards/${s.img}-p700.webp 700w`}
            sizes="(max-width: 767px) 80vw, (max-width: 1199px) 45vw, 320px"
            alt=""
            loading="lazy"
            decoding="async"
            width="700"
            height="933"
          />
          <div className="program-body">
            <span className="program-num" aria-hidden="true">0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <a
              className="program-link"
              href={whatsappLink(s.message)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chiedi informazioni su ${s.title} via WhatsApp`}
            >
              Chiedi info
              <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
