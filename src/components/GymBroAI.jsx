import { useState } from "react";
import { InferenceClient } from "@huggingface/inference";
import "./../css/GymBro.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function Gymbro() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [show, setShow] = useState(false);

  const apiKei = import.meta.env.VITE_HF_API_KEY;

  const fitnessPrompt = `
Sei un istruttore di Fitness esperto e professionale.  
Rispondi **solo ed esclusivamente** a domande relative al fitness, allenamenti, nutrizione sportiva, esercizi, schede di allenamento e stili di vita sani.  
Non rispondere a domande su altri argomenti.  
Rispondi **solo in italiano**, in modo chiaro, preciso e comprensibile.  
Quando rispondi:
- Fornisci spiegazioni brevi e pratiche.
- Se necessario, dividi la risposta in punti o sezioni per maggiore chiarezza.
- Mantieni un tono incoraggiante e professionale.
- Nella risposta non fornire il pensiero del modello.
- Inserisci ad ogni risposta che dai "Per informazioni aggiuntive, chiedere al PT"
`;

  // Funzione per formattare la risposta
  const formatAnswer = (text) => {
    if (!text) return null;

    // Dividi in paragrafi
    const paragraphs = text.split("\n").filter((p) => p.trim());

    return paragraphs.map((paragraph, index) => {
      // Se è una lista puntata
      if (
        paragraph.trim().match(/^[-*•]\s/) ||
        paragraph.trim().match(/^\d+\.\s/)
      ) {
        return (
          <li key={index}>
            {paragraph.replace(/^[-*•]\s/, "").replace(/^\d+\.\s/, "")}
          </li>
        );
      }

      // Se sembra un titolo (termina con : e è corto)
      if (paragraph.trim().endsWith(":") && paragraph.length < 80) {
        return (
          <h3 key={index}>
            {paragraph}
          </h3>
        );
      }

      // Paragrafo normale
      return (
        <p key={index}>
          {paragraph}
        </p>
      );
    });
  };

  async function startchat(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const client = new InferenceClient(apiKei);
      const chatCompletion = await client.chatCompletion({
        provider: "hf-inference",
        model: "HuggingFaceTB/SmolLM3-3B",
        messages: [
          {
            role: "system",
            content: fitnessPrompt,
          },
          {
            role: "user",
            content: question,
          },
        ],
      });

      let message =
        chatCompletion.choices?.[0]?.message?.content ||
        "Nessuna risposta trovata";
      console.log(message);
      // Rimuovi <think> e **
      message = message
        .replace(/<think>[\s\S]*?<\/think>/gi, "")
        .replace(/\*\*(.*?)\*\*/g, "$1") // Rimuove ** e mantiene il contenuto
        .trim();
      setAnswer(message);
    } catch (err) {
      console.error(err);
      setError("Errore durante la chiamata al modello");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="gymbro surface" aria-labelledby="gymbro-title">
      <div className="gymbro-head">
        <span className="gymbro-avatar" aria-hidden="true">
          <FontAwesomeIcon icon={faRobot} />
        </span>
        <div>
          <h2 id="gymbro-title">GymBro AI</h2>
          <p>Il tuo compagno digitale per allenamento e nutrizione.</p>
        </div>
      </div>

      <div className="gymbro-body" aria-live="polite">
        {error ? (
          <div className="alert alert-danger m-0" role="alert">
            {error}
          </div>
        ) : loading ? (
          <div className="gymbro-thinking">
            <span /><span /><span />
            <span className="visually-hidden">GymBro sta pensando</span>
          </div>
        ) : answer ? (
          <div className="gymbro-answer">{formatAnswer(answer)}</div>
        ) : (
          <p className="gymbro-empty">
            Chiedimi un esercizio, un consiglio sulla scheda o come
            organizzare la settimana. Sono qui per motivarti!
          </p>
        )}
      </div>

      <form className="gymbro-form" onSubmit={startchat}>
        <label htmlFor="gymbro-question" className="visually-hidden">
          La tua domanda
        </label>
        <textarea
          id="gymbro-question"
          className="form-control"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Es. Come posso migliorare lo squat?"
          rows={2}
          required
        />
        <button
          type="submit"
          className="btn-ui btn-ui--primary"
          disabled={loading}
        >
          <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
          {loading ? "Sto pensando…" : "Chiedi"}
        </button>
      </form>
    </section>
  );
}
