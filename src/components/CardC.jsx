import "./../css/CardC.css";

import { useState } from "react";
const services = [
  {
    id: 1,
    img: "/img/personal.png",
    title: "PERSONAL",
    desc: "Lezione private personalizzate con assistenza continua e monitoraggio completo.",
    infoMessage: "https://api.whatsapp.com/send?phone=+39...",
  },
  {
    id: 2,
    img: "/img/mensile.jpg",
    title: "MENSILE",
    desc: "Piano mensile, ti permette di accedere a scheda personalizzata, sala pesi, sala corsi, spogliatoio.",
    infoMessage: "https://api.whatsapp.com/send?phone=+39...",
  },
  {
    id: 3,
    img: "/img/full-shot-woman-doing-burpees-indoors.jpg",
    title: "GIORNALIERO",
    desc: "Singolo ingresso in giornata con piena disponibilità da parte della struttura e staff.",
    infoMessage: "https://api.whatsapp.com/send?phone=+39...",
  },
  {
    id: 4,
    img: "/img/Consulenza.jpg",
    title: "CONSULENZA",
    desc: "Consigli personalizzati sul piano di allenamento più adatto alle tue esigenze e ai tuoi obiettivi.",
    infoMessage: "https://api.whatsapp.com/send?phone=+39...",
  },
];

export default function CardC() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {services.map((service) => (
        <div key={service.id} className="col">
          <div className="card">
            <h4 className="card-title text-center fs_size_card_title m-0 p-1">
              {service.title}
            </h4>
            <img
              className="card-img-top rounded-0 "
              src={service.img}
              alt="Title"
              onClick={() => {
                setIsVisible(service.id);
              }}
              onDoubleClick={() => {
                setIsVisible(false);
              }}
            />
            <div className="d-flex justify-content-center align-items-center">
              <div className="m-0-auto py-3 px-1 text-center">
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    setIsVisible(service.id);
                  }}
                  onDoubleClick={() => {
                    setIsVisible(false);
                  }}
                >
                  Scopri di piu`
                </button>
              </div>
            </div>

            <div
              className={`card-body cardBodyHome ${
                isVisible === service.id && "enter"
              }`}
            >
              <div className="card_content p-3">
                <p className="card-text fs_size_card_desc">{service.desc}</p>
                <a
                  className="btn btn-md bt_bg_color"
                  href={service.infoMessage}
                  role="button"
                  target="_blank"
                >
                  Contattaci
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
