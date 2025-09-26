import React from "react";
import "./../css/MainHome.scss";
import Jumbo from "./JumboC";
import CardC from "./CardC";
import GymBroAi from "./GymBroAI";

export default function MainHome() {
  return (
    <main>
      <div className="container">
        <section id="Chi_siamo" className="my-5">
          <h3 className="fs_size_title_lg">Chi Siamo</h3>
          <div className="desc fs_size_desc">
            <p>
              Palasportmax è la tua palestra di fiducia per raggiungere i tuoi
              obiettivi di fitness e benessere.
            </p>
            <p>
              Offriamo una vasta gamma di attrezzature all'avanguardia per
              garantire un'esperienza di allenamento completa e soddisfacente.
            </p>
          </div>
        </section>
        <section id="service" className="my-5">
          <h3 className="py-3 fs_size_title_lg">I Nostri Servizi</h3>
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-4  g-2">
            <CardC />
          </div>
        </section>
        <section id="contact" className="my-5">
          <h3 className="py-3 fs_size_title_lg">Orari</h3>
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2">
            <div className="col">
              <div className="info_open fs_size_info_open">
                <p>
                  <strong>Lunedì / Mercoledì / Venerdì </strong>
                  8:50 - 12:00 / 13:30 - 21:00
                </p>
                <p>
                  {" "}
                  <strong>Martedì / Giovedì </strong>
                  8:50 - 12:00 / 15:30 - 21:00
                </p>
                <p>
                  {" "}
                  <strong>Sabato </strong>
                  8:50 - 12:00
                </p>
              </div>
            </div>
            <div className="col">
              <div className="address fs_size_address">
                <p>
                  Vieni a trovarci in
                  <strong> Via Nazionale 62, Eboli, Salerno</strong>
                </p>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3028.7363945925913!2d15.0546933!3d40.613639299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13395fe6dd2f57b9%3A0x5078dfd861c50915!2spalestra%20palasportmax!5e0!3m2!1sit!2sit!4v1748375916457!5m2!1sit!2sit"
                  width="100%"
                  height="450"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
        <GymBroAi></GymBroAi>
      </div>
    </main>
  );
}
