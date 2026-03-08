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


## File backend che mi servono per la feature dei messaggi (Riccobene)

### File che ritorna tutte le chat di un utente
In poche parole un file che controlla l'username dell'utente che fa la richiesta **dalla session**  

**Ritorna**: tutte le chat in cui un utente ha mai ricevuto/inviato messaggi.

Formato della risposta deve essere tipo cosi':

 ```
$response = [
    sucessful:true/false
    message:"successfully retrieved user chats/failed/user is not logged in"
    chats:[
        {
            username: "Riccardo Colaninno",
            swapBookTitle: "Internetworking",
            swapId: 3
        },
        {
            username: "Galimberti Pietro",
            swapBookTitle: "Matematica Verde",
            swapId: 1
        },
        {
            username: "Matteo Sartori",
            swapBookTitle: "Protech",
            swapId: 2
        },
        {
            username: "Davide Riccobene",
            swapBookTitle: "Matematica Verde",
            swapId: 1
        }
]

 ```
#### quindi campi per ogni oggetto chat:
<ul>
<li>username: l'username dell'utente con cui l'utente che ha mandato la richiesta ha chattato

<li>swapBookTItle: il titolo dello swap di quella determinata chat

<li>swapBookId: l'id dello swap di quella determinata chat
</ul>

#### Altre note importanti
<ul>
<li>io uso il termine chat per indicare gli scambi tra due utenti relative ad un determinato swap, ma non necessariamente nel db esiste l'oggetto chat. vedete voi come organizzare i dati, a me basta che nella risposta ci sia una cosa simile

<li>se chi fa la richiesta non e' loggato viene ritornato un messaggio di errore che avvisa che bisogna essere autenticati

<li>non serve che nella risposta includete i messaggi dato che con essi sarebbero troppi dati in una solo risposta, quindi mi serve un'altro file nel backend per tutti i messaggi

<li>organizzatevi voi per come chiamare il file o in che cartella metterlo

</ul>

---
### File che ritorna tutti i messaggi di una determinata chat
Un file che controlla l'username dell'utente che fa la richiesta **dalla session** e accetta come parametri GET o POST (decidete voi) l'username dell'altro utente e lo swapId dello swap di quella determinata chat.

**Ritorna**: tutti i messaggi di una chat

Formato della risposta deve essere tipo cosi':

 ```
$response = [
    sucessful:true/false,
    message:"successfully retrieved chat messages/failed/user is not logged in",
    
    user1:"user che ha fatto la richiesta api"
    user2:"altro user coinvolto nella chat",
    swapId:1,

    messages:[
        {
            content: "Ciaoo",
            sender: "Sigma2",
            receiver: "sigma",
            messageDate:"1/01/2026"
            messageTime:"15:45"
        },
        {
            content: "Ciao a te",
            sender: "sigma",
            receiver: "Sigma2",
            messageDate:"1/01/2026"
            messageTime:"15:47"
        },
]

 ```
#### quindi campi per ogni oggetto messaggio:
<ul>
<li>content: il contenutodel messaggio
<li>sender: username di chi invia il messaggio
<li>receiver: username di chi riceve il messaggio
<li>messageDate: data del messaggio (vedeto voi come parsarla, io ho messo un esempio che potrebbe aver senso)
<li>messageTime: ora del messaggio (vedeto voi come parsarla, io ho messo un esempio che potrebbe aver senso)
</ul>

#### Altre note importanti:
<ul>
<li>Pls ordinate le chat in ordine cronologico dato che farlo nel client e' un casino (forse si puo' fare direttamente quando fate la query, idk)

<li>io uso il termine message per indicare un singolo messaggio tra due utenti, ma non necessariamente nel db esiste l'oggetto message cosi come lo voglio strutturato nella risposta (anche se credo che sarebbe comodo per voi averlo cosi nel db). vedete voi come organizzare i dati, a me basta che nella risposta ci sia una cosa simile

<li>se chi fa la richiesta non e' loggato viene ritornato un messaggio di errore che avvisa che bisogna essere autenticati

<li>non serve che nella risposta includete i messaggi dato che con essi sarebbero troppi dati in una solo risposta, quindi mi serve un'altro file nel backend per tutti i messaggi

<li>organizzatevi voi per come chiamare il file o in che cartella metterlo
</ul>

---

Grazie della collaborazione fate con calma (probabilmente poi vi devo chiedere un'altro file nel backend per inviare messaggi)

**P.S** Ah e se potete cambiate anche tutti gli altri file php in modo che abbiano una risposta con quel formato, quindi con il campo successful booleano e il campo message stringa. successful puo' anche avere un'altro nome basta che fate tutto uniforme per tutto il backend cosi che nel frontend sappiamo cosa aspettarci
