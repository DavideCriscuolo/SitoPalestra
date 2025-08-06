# Autenticazione

Per la fase di registrazione ho creato una rotta /register.
Qui ho gestito il controllo sull’esistenza dell’email nel database, e in caso fosse nuova, ho salvato la password in modo sicuro usando bcrypt.
Viene generato un hash della password prima di inserirla nel database, così da evitare di salvare dati sensibili in chiaro.
🔐 Login con JWT

Per il login ho realizzato una rotta /login:

    Quando un utente accede, viene verificata la sua email nel database.

    Se trovata, confronto la password inserita con quella salvata (hashata) usando bcrypt.compare.

    In caso di successo, genero un token JWT che contiene i dati dell’utente (id ed email).

    Questo token ha una scadenza temporale (es. 1 ora) ed è usato per autenticare l’utente nelle rotte private.

🧱 Middleware di protezione

Ho creato un middleware verifyToken che intercetta le richieste alle rotte protette:

    Verifica la validità del token JWT ricevuto negli header della richiesta.

    Blocca l’accesso se il token è assente, invalido o scaduto.

    Questo mi ha permesso di proteggere route sensibili, come ad esempio la pagina dell’utente loggato o la gestione dei dati.

⚛️ Gestione frontend in React

Nel frontend, una volta ricevuto il token dal login:

    Lo salvo nel localStorage insieme all’email dell’utente.

    All’interno della pagina protetta (es. /user), uso useEffect per verificare che ci sia un token valido. In caso contrario, reindirizzo alla login.

    In tutte le richieste fetch alle rotte protette, includo il token negli headers per autenticare l’utente.

🔄 Recupero dati con JOIN

Per mostrare i dati utente (inclusi quelli legati alle sue misurazioni), ho realizzato una query SQL con LEFT JOIN tra la tabella iscritti e la tabella misure.
Questo mi ha permesso di ottenere i dati utente anche quando non ha ancora registrato misure, evitando errori o crash dell'applicazione.
🎯 Risultati ottenuti

    Nessuna password viene salvata in chiaro.

    Il sistema è sicuro e strutturato secondo le buone pratiche.

    Le route protette sono accessibili solo con token valido.

    Ho imparato a gestire JWT, hashing, e controlli di accesso in un contesto full stack React + Node.js.
    #
