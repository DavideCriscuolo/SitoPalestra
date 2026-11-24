// Area iscritti (login, registrazione, pagina utente): il backend è disattivato.
// Rimettere a true quando torna online: link e rotte riappaiono da soli.
export const MEMBER_AREA_ENABLED = false;

export const WHATSAPP_NUMBER = "393280203014";
export const PHONE_NUMBER = "+393280203014";
export const PHONE_LABEL = "328 020 3014";

export const whatsappLink = (text) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`;

export const ADDRESS = "Via Nazionale 62, Eboli (SA)";

export const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Palasportmax+Via+Nazionale+62+Eboli";

// days: 0 = domenica … 6 = sabato
export const SCHEDULE = [
  { label: "Lunedì · Mercoledì · Venerdì", days: [1, 3, 5], hours: [["8:50", "12:00"], ["13:30", "21:00"]] },
  { label: "Martedì · Giovedì", days: [2, 4], hours: [["8:50", "12:00"], ["15:30", "21:00"]] },
  { label: "Sabato", days: [6], hours: [["8:50", "12:00"]] },
];

export const SOCIALS = {
  instagram: "https://www.instagram.com/vitocriscuolopalasp/",
  facebook: "https://www.facebook.com/p/Palasportmax-Eboli-100054624541607/",
};

export const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3028.7363945925913!2d15.0546933!3d40.613639299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13395fe6dd2f57b9%3A0x5078dfd861c50915!2spalestra%20palasportmax!5e0!3m2!1sit!2sit!4v1748375916457!5m2!1sit!2sit";

// Dati del titolare del trattamento per la pagina privacy.
// Completare ragione sociale, P.IVA ed email prima della pubblicazione: i campi vuoti non vengono mostrati.
export const LEGAL = {
  owner: "Palasportmax",
  vatNumber: "",
  email: "",
  lastUpdate: "24 novembre 2026",
};
