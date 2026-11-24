import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { PHONE_NUMBER, whatsappLink } from "../data/site";

// Barra contatti fissa in basso, solo su mobile; compare dopo aver superato l'hero.
export default function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`mobile-bar ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <a
        href={`tel:${PHONE_NUMBER}`}
        className="btn-ui btn-ui--ghost"
        tabIndex={visible ? 0 : -1}
      >
        <FontAwesomeIcon icon={faPhone} aria-hidden="true" />
        Chiama
      </a>
      <a
        href={whatsappLink("Ciao! Vorrei informazioni sulla palestra.")}
        className="btn-ui btn-ui--whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
      >
        <FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
}
