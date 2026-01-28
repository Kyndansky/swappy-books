# swappy-books

Description

SwappyBooks is a dedicated online marketplace and community platform designed specifically for the exchange of used academic textbooks and educational materials. The platform combines core marketplace functionality with integrated real-time communication tools to create a seamless experience for students, educators, and academic institutions.

The system facilitates peer-to-peer trading where users can list their used textbooks with detailed condition descriptions, search for required materials by various academic parameters, and negotiate exchanges through a built-in messaging system. Beyond basic trading, SwappyBooks implements trust features such as user rating systems, verified academic email integration, and secure transaction guidelines to ensure reliability within the academic community.

The platform addresses common challenges in academic resource accessibility by providing an affordable alternative to purchasing new textbooks while promoting sustainability through material reuse. With intuitive categorization by subject, course code, edition, and institution, users can efficiently locate precisely the materials they need for their specific academic requirements.




backend/
├── config/
│   ├── database.php      # Configurazione connessione DB (PDO)
│   └── cors.php          # Gestione headers CORS per comunicare con React
│
├── api/
│   ├── users/
│   │   ├── register.php  # Endpoint registrazione utente
│   │   ├── login.php     # Endpoint login
│   │   └── profile.php   # Recupero dati utente loggato
│   │
│   ├── books/
│   │   ├── list.php      # GET: Lista libri (home page)
│   │   ├── create.php    # POST: Inserimento nuovo libro
│   │   ├── delete.php    # DELETE: Rimozione annuncio
│   │   └── detail.php    # GET: Dettagli singolo libro
│   │
│   └── sales/
│       ├── buy.php       # POST: Esecuzione transazione
│       └── history.php   # GET: Storico ordini utente
│
├── .env                  # Variabili d'ambiente (DB credentials) - NON COMMITTARE
└── index.php             # Router opzionale / Entry point





frontend/
├── public/
│   └── index.html        # Entry point HTML
│
├── src/
│   ├── assets/           # Immagini, loghi, icone statiche
│   │
│   ├── components/       # Componenti riutilizzabili
│   │   ├── Navbar.jsx    # Barra di navigazione dinamica
│   │   ├── Footer.jsx    # Piè di pagina
│   │   ├── BookCard.jsx  # Card anteprima libro (usata in home)
│   │   └── LoginForm.jsx # Form di accesso
│   │
│   ├── context/          # Gestione stato globale
│   │   └── AuthContext.jsx # Context per gestire l'utente loggato
│   │
│   ├── hooks/            # Custom Hooks
│   │   └── useFetch.js   # Hook per chiamate API generiche
│   │
│   ├── pages/            # Pagine complete (Viste)
│   │   ├── HomePage.jsx     # Landing page con lista libri
│   │   ├── LoginPage.jsx    # Pagina di login
│   │   ├── RegisterPage.jsx # Pagina di registrazione
│   │   ├── Dashboard.jsx    # Area personale utente
│   │   ├── SellBook.jsx     # Form vendita libro
│   │   └── BookDetail.jsx   # Pagina dettaglio singolo libro
│   │
│   ├── services/         # Logica di comunicazione col Backend
│   │   └── api.js        # Configurazione Axios/Fetch
│   │
│   ├── App.jsx           # Gestione Routing principale
│   └── main.jsx          # React Entry point
│
├── .env                  # Variabili ambiente (API URL)
└── package.json          # Dipendenze Node
