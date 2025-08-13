/\*
Progetto Web App Palestra - Riassunto Funzionalità e Architettura

1️⃣ Front-end:

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

3️⃣ Protezione delle rotte lato client:

- AdminRoute controlla il token e il ruolo decodificando il JWT
  - Non loggato → redirect a /login_admin
  - Loggato ma non admin → redirect a /
  - Admin → accesso consentito
- Stessa logica applicabile per rotte protette utente (UserRoute)
- Decodifica ruolo lato client:
  - token.split(".")[1] → payload Base64
  - JSON.parse(atob(payload)) → oggetto contenente role
  - Permette di sapere se l’utente è admin o user e mostrare contenuti specifici

4️⃣ Gestione richieste HTTP protette (AJAX/Axios):

- Token JWT inviato negli header Authorization: `Bearer <token>`
- Endpoint protetti lato server con middleware verifyToken
- Controllo ruolo lato server:
  - Ruolo corretto → dati restituiti
  - Ruolo sbagliato → 403
  - Token mancante o invalido → 401

5️⃣ Backend:

- Server principale in server.js:
  - Libreria CORS per gestire CORS policy
  - dotenv per leggere variabili d'ambiente
  - Middleware per verifica token e ruolo admin/user
- Cartella /controllers:
  - Logica delle route
  - Query SQL al database
  - Gestione errori per tutte le query
- Cartella /routes:
  - Definizione delle rotte vere e proprie
- connection.js:
  - Connessione al database
  - Esportata per essere utilizzata nei controller
- Middleware personalizzati:
  - verifyToken → controlla token e decodifica ruolo
  - AdminRoute → permette accesso solo se ruolo admin
  - UserRoute → permette accesso solo se ruolo user

6️⃣ Flusso completo:

- Login → server genera token con ruolo → client salva token → decodifica token lato client per ruolo → AdminRoute/UserRoute protegge pagine → richieste HTTP inviano token per autorizzazione → server verifica token e ruolo prima di restituire dati

💡 Conclusione:

- Il sistema gestisce utenti e admin separatamente tramite il ruolo nel JWT
- Rotte protette lato client e lato server
- Richieste AJAX protette inviano token nel header Authorization
- Sicurezza principale lato server: verifica token e ruolo prima di restituire dati
  \*/
