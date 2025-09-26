# Progetto Palestra Web App

Il progetto **Palestra Web App** è un'applicazione web dinamica e interattiva che consente agli utenti di registrarsi, accedere a schede personalizzate e gestire le proprie misure.

## 🚀 Tecnologie utilizzate

- **React**: framework JavaScript per la creazione di interfacce utente
- **React Router**: librerie per la gestione delle rotte e della navigazione
- **API**: interfacce di programmazione per l'accesso a dati e servizi esterni
- **JavaScript**: logica di business e gestione dei dati
- **HTML**: strutture di pagina
- **CSS**: layout e design
- **Backend**: sviluppato con **Node.js** e **Express.js**
- **Database**: **MySQL** con tabelle per la gestione dei dati

## 📦 Librerie utilizzate

- **cors**: gestione richieste HTTP e configurazione CORS
- **dotenv**: variabili di ambiente
- **bcrypt**: crittografia delle password
- **jwt**: gestione dei token di autenticazione
- **crypto**: generazione token univoci e sicurezza delle comunicazioni
- **sendgrid**: invio email e gestione comunicazioni
- **mysql2**: gestione database MySQL

## 📂 Struttura del progetto

Il progetto è strutturato in modo modulare, con separazione delle funzionalità in componenti e pagine:

- **Components** → componenti React riutilizzabili
- **Pages** → pagine principali dell’applicazione

## 💡 Funzionalità principali

- **Registrazione**: creazione di un account utente
- **Accesso a schede personalizzate**: gestione schede di allenamento
- **Gestione delle misure**: dati in formato tabellare
- **Dashboard admin**: inserimento schede e misure personalizzate
- **Reset password**: tramite email inviata con SendGrid

### 🤖 Nuova Feature: Assistente Virtuale GymBro AI

Una delle ultime aggiunte è **GymBro AI**, l’assistente digitale integrato nella piattaforma, disponibile solo per gli utenti registrati.  
Ecco cosa offre:

- **Basato su API Hugging Face** con modello **HuggingFaceTB/SmolLM3-3B**
- Modello scelto perché **leggero e ottimizzato**, ideale per non consumare troppe risorse
- L’API è stata implementata **solo lato frontend**, per una maggiore semplicità e rapidità di integrazione
- Fornisce **risposte personalizzate su fitness e allenamenti**, migliorando l’esperienza degli iscritti

---

## 🛠️ Sviluppo

Il progetto è stato sviluppato utilizzando **Visual Studio Code** e **GitHub**.  
Il codice è scritto in **JavaScript** e **HTML**, con gestione dati tramite **API** e librerie dedicate.

## 🔑 Accesso Demo

Per provare la piattaforma:

- **Email**: `prova@gmail.com`
- **Password**: `123`

🔗 [Backend Repository](https://github.com/DavideCriscuolo/back_end)  
🔗 [Sito Live](https://sito-palestra-lilac.vercel.app/)
