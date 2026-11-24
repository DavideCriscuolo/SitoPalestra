import { SCHEDULE } from "../data/site";

const DAY_NAMES = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const rangesFor = (day) =>
  SCHEDULE.find((row) => row.days.includes(day))?.hours ?? [];

// Ora corrente a Eboli, indipendente dal fuso del visitatore.
export function romeNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Rome",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value;
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export function getOpenStatus(date = new Date()) {
  const { day, minutes } = romeNow(date);

  const current = rangesFor(day).find(
    ([from, to]) => minutes >= toMinutes(from) && minutes < toMinutes(to)
  );
  if (current) {
    return { open: true, today: day, text: `Aperto ora · chiude alle ${current[1]}` };
  }

  const laterToday = rangesFor(day).find(([from]) => toMinutes(from) > minutes);
  if (laterToday) {
    return { open: false, today: day, text: `Chiuso · riapre alle ${laterToday[0]}` };
  }

  for (let i = 1; i <= 7; i++) {
    const next = (day + i) % 7;
    const first = rangesFor(next)[0];
    if (first) {
      const when = i === 1 ? "domani" : DAY_NAMES[next];
      return { open: false, today: day, text: `Chiuso · apre ${when} alle ${first[0]}` };
    }
  }
  return { open: false, today: day, text: "Chiuso" };
}
