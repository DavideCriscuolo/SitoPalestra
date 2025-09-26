import { useState } from "react";
import { InferenceClient } from "@huggingface/inference";
import "./../css/GymBro.scss";
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
- Evidenzia concetti chiave usando il **grassetto HTML** (<b>concetto</b>) invece di **.
`;
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

      // message è l'array di risposte del modello
      let message =
        chatCompletion.choices?.[0]?.message?.content ||
        "Nessuna risposta trovata";
      console.log(message);

      // Per rimuovere più tipi di tag
      message = message
        .replace(/<think>[\s\S]*?<\/think>/gi, "") // Rimuove il tag think e il suo contenuto [\s\S] significa "qualunque carattere" e *? rimuove il tag anche se non e' stato chiuso correttamente
        .trim(); // Rimuove gli spazi iniziali e finali
      setAnswer(message);
    } catch (err) {
      console.error(err);
      setError("Errore durante la chiamata al modello");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="container d-flex justify-content-center py-2">
      <div className={`chatbot-container show w-100`}>
        <div className="card chatbot-card">
          <div className="card-body">
            <h1>GymBro Ai</h1>
            {error ? <p style={{ color: "red" }}>{error}</p> : <p>{answer}</p>}
            {!answer && !loading && (
              <div>
                <p className="text-center fst-italic">
                  💪 Ciao! Sono GymBro AI, il tuo compagno digitale per
                  allenamenti e fitness.
                </p>
                <p className="text-center">
                  Sempre pronto a darti consigli, motivazione e risposte su
                  misura per i tuoi obiettivi!
                </p>
              </div>
            )}
            <form action="" onSubmit={startchat}>
              <textarea
                className="form-control"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Fai la tua domanda..."
              />
              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Sto pensando..." : "Chiedi"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
