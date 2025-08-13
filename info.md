/\*
Progetto Web App Palestra - Riassunto Funzionalità e Autenticazione

1️⃣ Struttura generale:

- Home page con informazioni palestra
- Navbar con link a login, registrazione e altre pagine
- Pagine dedicate: UserPage, AdminPage
- DefaultLayout include Header e Footer e un Outlet per le rotte

2️⃣ Autenticazione:

- Registrazione utenti con ruolo di default "user"
- Possibilità di creare admin manualmente nel DB con ruolo "admin"
- Password hashate con bcrypt
- Login genera JWT contenente: { id, email, role }
- Token salvato in localStorage al login

3️⃣ Protezione delle rotte:

- AdminRoute controlla il token e il ruolo decodificando il JWT
  - Non loggato → redirect a /login_admin
  - Loggato ma non admin → redirect a /
  - Admin → accesso consentito
- Stessa logica applicabile per rotte protette utente (UserRoute)

4️⃣ Decodifica ruolo lato client:

- token.split(".")[1] → payload Base64
- JSON.parse(atob(payload)) → oggetto contenente role
- Permette di sapere se l’utente è admin o user e mostrare contenuti specifici

5️⃣ Gestione richieste HTTP protette (AJAX/Axios):

- Token JWT inviato negli header Authorization: `Bearer <token>`
- Endpoint protetti lato server con middleware verifyToken
- Controllo ruolo lato server:
  - Ruolo corretto → dati restituiti
  - Ruolo sbagliato → 403
  - Token mancante o invalido → 401

6️⃣ Flusso completo:

- Login → server genera token con ruolo → client salva token → decodifica token lato client per ruolo → AdminRoute/UserRoute protegge pagine → richieste HTTP inviano token per autorizzazione

💡 Conclusione:

- Il sistema gestisce utenti e admin separatamente tramite il ruolo nel JWT
- Rotte protette lato client con AdminRoute/UserRoute
- Richieste AJAX protette inviano token nel header Authorization
- Sicurezza principale lato server: verifica token e ruolo prima di restituire dati
  \*/

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

# Protezione delle rotte con JWT in React + Node.js

Questo progetto implementa un sistema di autenticazione e protezione delle rotte sia lato server che lato client per una web app di palestra, distinguendo utenti normali e admin.

## 1️⃣ Backend – Middleware JWT e ruolo

- Verifica che il token esista e sia valido
- Blocca accessi senza token → 401
- Blocca utenti non admin → 403
- Solo admin accede alla rotta
- Middleware utilizzati:
  - `verifyToken` → verifica token valido
  - `verifyAdmin` → verifica ruolo admin
