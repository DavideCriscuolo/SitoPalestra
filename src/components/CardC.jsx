import "./../css/CardC.scss";
import { useState } from "react";

const services = [
  {
    id: 1,
    img: "/img/personal.webp",
    title: "PERSONAL",
    desc: "Lezioni private personalizzate con assistenza continua e monitoraggio completo.",
    infoMessage:
      "https://api.whatsapp.com/send?phone=+393280203014&text=Ciao!%20Vorrei%20sapere%20di%20piu%20sulle%20lezioni%20private%20con%20un%20personal%20trainer.",
  },
  {
    id: 2,
    img: "/img/mensile.webp",
    title: "MENSILE",
    desc: "Piano mensile, ti permette di accedere a scheda personalizzata, sala pesi, sala corsi, spogliatoio.",
    infoMessage:
      "https://api.whatsapp.com/send?phone=+393280203014&text=Ciao!%20Mi%20interessano%20le%20informazioni%20sull'abbonamento%20mensile.",
  },
  {
    id: 3,
    img: "/img/full-shot-woman-doing-burpees-indoors.webp",
    title: "GIORNALIERO",
    desc: "Singolo ingresso in giornata con piena disponibilità da parte della struttura e staff.",
    infoMessage:
      "https://api.whatsapp.com/send?phone=+393280203014&text=Ciao!%20Vorrei%20sapere%20se%20è%20possibile%20fare%20un%20ingresso%20giornaliero%20e%20qual%20è%20il%20costo.",
  },
  {
    id: 4,
    img: "/img/Consulenza.webp",
    title: "CONSULENZA",
    desc: "Consigli personalizzati sul piano di allenamento più adatto alle tue esigenze e ai tuoi obiettivi.",
    infoMessage:
      "https://api.whatsapp.com/send?phone=+393280203014&text=Ciao!%20Vorrei%20ricevere%20maggiori%20informazioni%20sul%20piano%20di%20consulenza%20personalizzata.",
  },
];

export default function CardC() {
  const [isVisible, setIsVisible] = useState(null);

  const handleToggle = (id) => {
    setIsVisible(isVisible === id ? null : id);
  };

  return (
    <>
      {services.map((service) => (
        <div key={service.id} className="col">
          <div className="service-card">
            <div className="card-image-wrapper">
              <img
                className="card-image"
                src={service.img}
                alt={service.title}
              />
              <div className="card-overlay">
                <h4 className="card-title">{service.title}</h4>
              </div>
            </div>

            <div className="card-content">
              <button
                className="btn-discover"
                onClick={() => handleToggle(service.id)}
                aria-expanded={isVisible === service.id}
              >
                {isVisible === service.id ? "Chiudi" : "Scopri di più"}
                <span className="btn-icon">
                  {isVisible === service.id ? "▲" : "▼"}
                </span>
              </button>

              <div
                className={`card-details ${
                  isVisible === service.id ? "active" : ""
                }`}
              >
                <p className="card-description">{service.desc}</p>
                <a
                  className="btn-contact"
                  href={service.infoMessage}
                  role="button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="whatsapp-icon">💬</span>
                  Contattaci su WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
