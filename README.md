# swappy-books

Description

SwappyBooks is a dedicated online marketplace and community platform designed specifically for the exchange of used academic textbooks and educational materials. The platform combines core marketplace functionality with integrated real-time communication tools to create a seamless experience for students, educators, and academic institutions.

The system facilitates peer-to-peer trading where users can list their used textbooks with detailed condition descriptions, search for required materials by various academic parameters, and negotiate exchanges through a built-in messaging system. Beyond basic trading, SwappyBooks implements trust features such as user rating systems, verified academic email integration, and secure transaction guidelines to ensure reliability within the academic community.

The platform addresses common challenges in academic resource accessibility by providing an affordable alternative to purchasing new textbooks while promoting sustainability through material reuse. With intuitive categorization by subject, course code, edition, and institution, users can efficiently locate precisely the materials they need for their specific academic requirements.


# 📂 Struttura del Progetto

Di seguito l'organizzazione completa delle cartelle e dei file principali.

```text
/project-root
├── backend/                  # Logica Server & API (PHP)
│   ├── config/
│   │   ├── database.php      # Connessione DB (PDO)
│   │   └── cors.php          # Configurazione CORS
│   │
│   ├── api/
│   │   ├── users/
│   │   │   ├── register.php  # Registrazione
│   │   │   ├── login.php     # Login
│   │   │   └── profile.php   # Dati utente
│   │   │
│   │   ├── books/
│   │   │   ├── list.php      # GET: Tutti i libri
│   │   │   ├── create.php    # POST: Inserisci libro
│   │   │   ├── delete.php    # DELETE: Rimuovi libro
│   │   │   └── detail.php    # GET: Dettaglio singolo
│   │   │
│   │   └── sales/
│   │       ├── buy.php       # POST: Compra libro
│   │       └── history.php   # GET: Storico ordini
│   │
│   └── index.php             # Router/Entry point
│
├── frontend/                 # Interfaccia Utente (React)
│   ├── public/
│   │   └── index.html        # HTML Base
│   │
│   ├── src/
│   │   ├── assets/           # Immagini statiche
│   │   │
│   │   ├── components/       # Componenti UI parziali
│   │   │   ├── Navbar.jsx    # Menu navigazione
│   │   │   ├── Footer.jsx    # Piè di pagina
│   │   │   ├── BookCard.jsx  # Anteprima libro in lista
│   │   │   └── LoginForm.jsx # Modulo di accesso
│   │   │
│   │   ├── context/          # Stato Globale
│   │   │   └── AuthContext.jsx # Gestione utente loggato
│   │   │
│   │   ├── hooks/            # Logica riutilizzabile
│   │   │   └── useFetch.js   # Chiamate API generiche
│   │   │
│   │   ├── pages/            # Pagine complete del sito
│   │   │   ├── HomePage.jsx     # Home (Lista libri)
│   │   │   ├── LoginPage.jsx    # Pagina Login
│   │   │   ├── RegisterPage.jsx # Pagina Registrazione
│   │   │   ├── Dashboard.jsx    # Profilo e miei annunci
│   │   │   ├── SellBook.jsx     # Form vendita
│   │   │   └── BookDetail.jsx   # Pagina dettaglio libro
│   │   │
│   │   ├── services/         # Comunicazione col Backend
│   │   │   └── api.js        # Configurazione Axios/Fetch
│   │   │
│   │   ├── App.jsx           # Gestione Routing
│   │   └── main.jsx          # Entry point React
│   │
│   ├── .env                  # Variabili ambiente (URL API)
│   └── package.json          # Dipendenze
