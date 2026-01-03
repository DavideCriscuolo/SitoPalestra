import React from "react";
import "./../css/MainHome.scss";
import CardC from "./CardC";

export default function MainHome() {
  return (
    <main className="main-home">
      <div className="container">
        {/* Chi Siamo Section */}
        <section id="Chi_siamo" className="who-we-are-section">
          <div className="section-header">
            <h2 className="section-title">Chi Siamo</h2>
            <div className="title-underline"></div>
          </div>
          <div className="section-content">
            <p className="section-text">
              Palasportmax è la tua palestra di fiducia per raggiungere i tuoi
              obiettivi di fitness e benessere.
            </p>
            <p className="section-text">
              Offriamo una vasta gamma di attrezzature all'avanguardia per
              garantire un'esperienza di allenamento completa e soddisfacente.
            </p>
          </div>
        </section>

        {/* Servizi Section */}
        <section id="service" className="services-section">
          <div className="section-header">
            <h2 className="section-title">I Nostri Servizi</h2>
            <div className="title-underline"></div>
          </div>
          <div className="services-grid row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-4 g-4">
            <CardC />
          </div>
        </section>

        {/* Orari e Contatti Section */}
        <section id="contact" className="contact-section">
          <div className="section-header">
            <h2 className="section-title">Vieni a Trovarci</h2>
            <div class="title-underline"></div>
          </div>
          <div className="contact-content row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-4">
            <div className="col">
              <div className="schedule-card">
                <h3 className="card-subtitle">
                  <span className="icon">🕐</span>
                  Orari di Apertura
                </h3>
                <div className="schedule-list">
                  <div className="schedule-item">
                    <span className="schedule-days">
                      Lunedì / Mercoledì / Venerdì
                    </span>
                    <span className="schedule-hours">
                      8:50 - 12:00 / 13:30 - 21:00
                    </span>
                  </div>
                  <div className="schedule-item">
                    <span className="schedule-days">Martedì / Giovedì</span>
                    <span className="schedule-hours">
                      8:50 - 12:00 / 15:30 - 21:00
                    </span>
                  </div>
                  <div className="schedule-item">
                    <span className="schedule-days">Sabato</span>
                    <span className="schedule-hours">8:50 - 12:00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="address-card">
                <h3 className="card-subtitle">
                  <span className="icon">📍</span>
                  Dove Siamo
                </h3>
                <p className="address-text">
                  Vieni a trovarci in{" "}
                  <strong>Via Nazionale 62, Eboli, Salerno</strong>
                </p>
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3028.7363945925913!2d15.0546933!3d40.613639299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13395fe6dd2f57b9%3A0x5078dfd861c50915!2spalestra%20palasportmax!5e0!3m2!1sit!2sit!4v1748375916457!5m2!1sit!2sit"
                    width="100%"
                    height="300"
                    loading="lazy"
                    title="Mappa Palasportmax"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
