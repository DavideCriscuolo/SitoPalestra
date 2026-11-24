import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./../css/Legal.scss";
import { ADDRESS, LEGAL, MEMBER_AREA_ENABLED, PHONE_LABEL } from "../data/site";

export default function Privacy() {
  useEffect(() => {
    document.title = "Privacy e cookie · Palasportmax";
    window.scrollTo(0, 0);
    return () => {
      document.title = "Palasportmax · Palestra a Eboli | Sala pesi, corsi e personal trainer";
    };
  }, []);

  return (
    <main id="main-content" className="page">
      <article className="container legal">
        <p className="eyebrow">Informativa</p>
        <h1 className="section-title">
          Privacy e <span>cookie</span>
        </h1>
        <p className="legal-updated">Ultimo aggiornamento: {LEGAL.lastUpdate}</p>

        <section>
          <h2>Titolare del trattamento</h2>
          <p>
            {LEGAL.owner}, {ADDRESS}
            {LEGAL.vatNumber && <> · P.IVA {LEGAL.vatNumber}</>}
            <br />
            Telefono: {PHONE_LABEL}
            {LEGAL.email && (
              <>
                {" "}
                · Email: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
              </>
            )}
          </p>
        </section>

        <section>
          <h2>Quali dati raccogliamo</h2>
          {MEMBER_AREA_ENABLED ? (
            <p>
              Se crei un account raccogliamo nome, cognome, email e password
              (conservata in forma cifrata), oltre alle misure e alla scheda di
              allenamento inserite dal personal trainer. Questi dati servono
              solo a fornirti l'area iscritti e non vengono ceduti a terzi.
            </p>
          ) : (
            <p>
              Il sito non ha moduli di contatto né registrazione: non
              raccogliamo direttamente dati personali tramite il sito.
            </p>
          )}
          <p>
            Se ci contatti tramite WhatsApp, telefono o social network, i dati
            che ci invii (numero, nome, messaggio) sono usati solo per
            risponderti. Il trattamento dei messaggi su WhatsApp, Instagram e
            Facebook è regolato anche dalle informative di Meta Platforms.
          </p>
        </section>

        <section>
          <h2>Statistiche e prestazioni</h2>
          <p>
            Usiamo Vercel Web Analytics e Vercel Speed Insights per conoscere in
            forma aggregata quante persone visitano il sito e quanto è veloce.
            Questi strumenti non usano cookie e non permettono di identificarti.
          </p>
        </section>

        <section>
          <h2>Servizi di terze parti</h2>
          <ul>
            <li>
              <strong>Hosting (Vercel Inc.)</strong>: per erogare il sito il
              server registra dati tecnici come l'indirizzo IP, conservati per
              il tempo necessario alla sicurezza del servizio.
            </li>
            <li>
              <strong>Google Fonts</strong>: i caratteri del sito sono caricati
              dai server di Google, che ricevono l'indirizzo IP del visitatore.
            </li>
            <li>
              <strong>Google Maps</strong>: la mappa viene caricata solo se premi
              «Mostra la mappa». Da quel momento Google può impostare cookie
              secondo la propria informativa.
            </li>
          </ul>
        </section>

        <section>
          <h2>Cookie</h2>
          <p>
            Il sito non usa cookie propri né cookie di profilazione. Eventuali
            cookie di terze parti (Google Maps) vengono impostati solo dopo una
            tua scelta esplicita, quando carichi la mappa.
          </p>
        </section>

        <section>
          <h2>I tuoi diritti</h2>
          <p>
            In base agli articoli 15–22 del GDPR puoi chiedere l'accesso, la
            rettifica, la cancellazione o la limitazione dei tuoi dati e
            opporti al trattamento, contattando il titolare ai recapiti sopra.
            Puoi anche presentare reclamo al Garante per la protezione dei dati
            personali (
            <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">
              garanteprivacy.it
            </a>
            ).
          </p>
        </section>

        <NavLink to="/" className="btn-ui btn-ui--primary mt-2">
          Torna alla home
        </NavLink>
      </article>
    </main>
  );
}
