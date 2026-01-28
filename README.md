# swappy-books

Description

SwappyBooks is a dedicated online marketplace and community platform designed specifically for the exchange of used academic textbooks and educational materials. The platform combines core marketplace functionality with integrated real-time communication tools to create a seamless experience for students, educators, and academic institutions.

The system facilitates peer-to-peer trading where users can list their used textbooks with detailed condition descriptions, search for required materials by various academic parameters, and negotiate exchanges through a built-in messaging system. Beyond basic trading, SwappyBooks implements trust features such as user rating systems, verified academic email integration, and secure transaction guidelines to ensure reliability within the academic community.

The platform addresses common challenges in academic resource accessibility by providing an affordable alternative to purchasing new textbooks while promoting sustainability through material reuse. With intuitive categorization by subject, course code, edition, and institution, users can efficiently locate precisely the materials they need for their specific academic requirements.




/backend
├── /config
│   ├── database.php      <-- Connessione al DB (PDO/MySQLi)
│   └── cors.php          <-- Gestione intestazioni CORS (fondamentale per far parlare React con PHP)
│
├── /api
│   ├── /users
│   │   ├── register.php  <-- Endpoint registrazione
│   │   ├── login.php     <-- Endpoint login (restituisce token o sessione)
│   │   └── profile.php   <-- Ottieni dati utente loggato
│   │
│   ├── /books
│   │   ├── list.php      <-- GET: Tutti i libri disponibili (con filtri)
│   │   ├── create.php    <-- POST: Inserimento nuovo libro (upload foto opzionale)
│   │   ├── delete.php    <-- DELETE: Rimuovi annuncio (solo se sei il proprietario)
│   │   └── detail.php    <-- GET: Dettagli singolo libro
│   │
│   └── /sales
│       ├── buy.php       <-- POST: Registra transazione (aggiorna tabelle books e sold_books)
│       └── history.php   <-- GET: Storico acquisti/vendite dell'utente
│
├── .env                  <-- Credenziali DB (non caricare su git)
└── index.php             <-- (Opzionale) Se usi un router centrale, altrimenti punta ai file in /api





/frontend
├── /public
│   └── index.html
│
├── /src
│   ├── /assets           <-- Immagini statiche, loghi, icone
│   │
│   ├── /components       <-- Componenti riutilizzabili (pezzi di UI)
│   │   ├── Navbar.jsx    <-- Menu navigazione (cambia se loggato/sloggato)
│   │   ├── Footer.jsx
│   │   ├── BookCard.jsx  <-- La "card" che mostra l'anteprima del libro
│   │   └── LoginForm.jsx
│   │
│   ├── /context          <-- Gestione stato globale
│   │   └── AuthContext.jsx <-- Gestisce lo stato dell'utente (è loggato? chi è?)
│   │
│   ├── /hooks            <-- Logica personalizzata
│   │   └── useFetch.js   <-- Hook per chiamate API generiche
│   │
│   ├── /pages            <-- Le schermate intere del sito
│   │   ├── HomePage.jsx  <-- Lista libri, ricerca
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── Dashboard.jsx <-- Profilo utente, i miei annunci, storico vendite
│   │   ├── SellBook.jsx  <-- Form per vendere un libro
│   │   └── BookDetail.jsx <-- Pagina dettaglio singolo libro
│   │
│   ├── /services         <-- Chiamate effettive al Backend
│   │   └── api.js        <-- Configurazione Axios o Fetch (base URL verso il backend PHP)
│   │
│   ├── App.jsx           <-- Gestione Routing (React Router)
│   └── main.jsx          <-- Entry point
│
├── .env                  <-- Variabili ambiente (es. URL del backend)
└── package.json
