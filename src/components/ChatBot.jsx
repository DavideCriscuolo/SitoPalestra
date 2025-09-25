import { useState } from "react";
import { InferenceClient } from "@huggingface/inference";
import "./../css/ChatBot.scss";
export default function ChatBot() {
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
    <div className="container d-flex justify-content-center">
      <div className={`chatbot-container show`}>
        <div className="card chatbot-card">
          <div className="card-body">
            <h1>PalasportMax Ai</h1>
            {error ? <p style={{ color: "red" }}>{error}</p> : <p>{answer}</p>}
            {!answer && !loading && (
              <p className="text-center">
                Ciao sono il PalasportMax Ai ChatBot pronto per rispondere ad
                ogni tua domanda su fitness e allenamenti!
              </p>
            )}
            <form action="" onSubmit={startchat}>
              <input
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
