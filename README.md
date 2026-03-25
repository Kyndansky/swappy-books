# Swappy Books

## Frontend setup
 We use **docker** for the frontend to avoid problems such as incompatible node or npm versions. When setiing up frontend to start working on it, use the following commands to setup a docker container and run it:
 
 **old commands**
 1. `cd frontend`
 2. `docker build . -t "swappybooksfrontend"`
 3. `docker run -p 5173:5173 swappybooksfrontend`
    where swappybooksfrontend is the name of the docker image (can be any name)
    remember to use `sudo` before the commands if using linux

**new commands**
 1. `cd frontend`
 2. `sudo docker compose up --build -d`

**Cleaning up**
To stop all running containers:
`sudo docker stop $(sudo docker ps -q)`
 To delete all containers that are not running:
 `sudo docker system prune -a --volumes -f`

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
```
# Roba backend

## FIle che ritorna tutti gli swap
### Prende in input tramite post:
	conditions: ["new","like-new","acceptable"]
	minPrice: float
	maxPrice: float
	type: "academic" , "fiction"
	searchString: "Matematica verde"

vincoli:

<ul>
<li>
il file all'inizio deve guardare la session e se si e' loggati bisogna trovare solo gli swap che sono stati pubblicati da utenti diversi da chi ha fatto la richiesta (giustamente non ha senso che un utente che cerca libri trova gli stessi che ha messo in vendita)
</li>
<li>
conditions deve avere solo valori che comprendono i seguenti:
"new" | "like-new" | "good" | "acceptable" | "damaged"
</li>
<li>
se type non viene passato di base si mostrano tutti i libri
</li>
<li>
searchString e' una stringa di ricerca che bisogna confrontare con i titoli degli swap: quelli con quella stringa nel titolo vengono ritornati
</li>
</ul>

in poche parole bisogna fare un file php che funge da filtro ritornando tutti gli swaps che soddisfano determinate condizioni, dove ogni campo elencato in precedenza e' facoltativo

### La risposta deve includere i seguenti campi:

	successful: boolean
	message: string
	swaps:[
	{
		id: int,
		title: string,
		author: string,
		description: string,
		condition: string,
		seller: string,
		createdAtDate:string,
		price: float
		favorite: boolean
	},
	]

il campo favorite e' true se l'utente e' loggato e se ha gia' quello swap nei preferiti.

## File che aggiunge uno swap
### Prende in input tramite post:
	condition: "new"| "like-new" "etc...",
	price:float,
	type: "academic" | "fiction",
	title: string,
	author:string,
	description:string,

vincoli:

<ul>
<li>
il file all'inizio deve guardare la session e se non si e' loggati bisogna ritornare un errore
</li>
<li>
conditions deve avere solo valori che comprendono i seguenti:
"new" | "like-new" | "good" | "acceptable" | "damaged"
</li>
<li>
tutti  i campi sono obbligatori
</li>
<li>
L'username dell'utente che pubblica lo swap va preso dalla session
</li>
</ul>

in poche parole bisogna fare un file php che accetta le informazioni su uno swap in input e lo salva nel db

### La risposta deve includere i seguenti campi:

	successful: boolean
	message: string
	

---

**Mi raccomando prendete come esempio gli altri file, non usate pdo e controllate che il db abbia le tabelle necessarie**
