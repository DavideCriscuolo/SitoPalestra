import { SCHEDULE } from "../data/site";
import useOpenStatus from "../hooks/useOpenStatus";

// Lunedì → sabato (giorni come in Date.getDay())
const DAYS = [
  { n: 1, short: "Lun", long: "Lunedì" },
  { n: 2, short: "Mar", long: "Martedì" },
  { n: 3, short: "Mer", long: "Mercoledì" },
  { n: 4, short: "Gio", long: "Giovedì" },
  { n: 5, short: "Ven", long: "Venerdì" },
  { n: 6, short: "Sab", long: "Sabato" },
];

const hoursFor = (n) => SCHEDULE.find((row) => row.days.includes(n))?.hours ?? [];

export default function Timetable() {
  const { today } = useOpenStatus();

  return (
    <div className="timetable" role="table" aria-label="Orari di apertura settimanali">
      {DAYS.map((d) => {
        const hours = hoursFor(d.n);
        const isToday = d.n === today;
        return (
          <div
            key={d.n}
            role="row"
            className={`tt-day ${isToday ? "is-today" : ""} ${hours.length ? "" : "is-closed"}`}
          >
            <div role="rowheader" className="tt-name">
              <span className="tt-short" aria-hidden="true">{d.short}</span>
              <span className="visually-hidden">{d.long}</span>
              {isToday && <span className="tt-today mono">Oggi</span>}
            </div>
            <div role="cell" className="tt-slots">
              {hours.length ? (
                hours.map(([from, to]) => (
                  <span key={from} className="tt-slot">
                    {from}
                    <span aria-hidden="true">–</span>
                    <span className="visually-hidden"> alle </span>
                    {to}
                  </span>
                ))
              ) : (
                <span className="tt-slot tt-off">Chiuso</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
