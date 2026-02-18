# Swappy Books

## Frontend setup
 We use docker for the frontend to avoid problems such as incompatible node or npm versions. When setiing up frontend to start working on it, use the following commands to setup a docker container and run it:
 1. `cd frontend`
 2. `docker build . -t "swappybooksfrontend"`
 3. `docker run -p 5173:5173 swappybooksfrontend`
    where swappybooksfrontend is the name of the docker image (can be any name)
    remember to use `sudo` before the commands if using linux
## Introduction
**SwappyBooks is an online marketplace** designed **for the exchange of used academic textbooks**. 
This website integrates a messaging feature to ease the communication between sellers and buyers.

## Project information
**Swappy books uses php for the backend** (with apache and mysql) **and** the **react** framework **for the frontend**, **along with typescript and** libraries such as **tailwindcss and heroui** to ease the development process.
Thanks to react the application will be easier to develop, especially because we can split the development between backend and frontend (which wouldn't be possible with pure .php files)
React offers a component based approach, making code modular

### Project structure

This is a simple and temporary organizational scheme to simplify project planning by our team.

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
