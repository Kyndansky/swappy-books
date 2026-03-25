# Swappy Books

## Frontend setup
 We use **docker** for the frontend to avoid problems such as incompatible node or npm versions. When setting up frontend to start working on it, use the following commands to setup a docker container and run it:
 
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

# Roba backend

## FIle che ritorna tutti gli swap
### Prende in input tramite get:
	conditions: ["new" | "like-new" | "good" | "acceptable" | "damaged"]
	minPrice: float
	maxPrice: float
	type: "academic" , "fiction"
	searchString: string

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
		price: float.
		favorite: boolean,
		condition:"new" | "like-new" | "good" | "acceptable" | "damaged",
		
	},
	]

il campo favorite e' true se l'utente e' loggato e se ha gia' quello swap nei preferiti.
se l'utente che fa la richiesta non e' loggato allora puo' anche non essere passato

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
---

Nel file getAllSwaps.php mettete che in richiesta vi arriva un campo chiamato materia, ma noi dividiamo gli swap tra academic e fiction (quindi in poche parole filtrate per una cosa non richiesta e non controllate il campo type come avevo scritto poco piu' sopra, fixate accettando un campo type al posto della materia (e poi cambiate il db in caso necessitasse di cambiamenti)).
getSwaps.php deve inoltre formattare la risposta come ho specificato dentro alla parte del readme (sopra) dove specifico tutti i campi ecc...
pls chi l'ha fatto riguardi direttamente la parte del readme dove dico cosa fare e lo rifaccia (bene)
Una volta che siete sicuri al 1000% che il file che ritorna tutti gli swap filtrati sia PERFETTO, allora fate:
<ul>
	<li>
		uno per tutti gli swap di un determinato venditore (dove il venditore viene passato tramite get)
	</li>
	<li>
		un file per tutti gli swap che l'utente che fa la richiesta ha messo in vendita (quindi bisogna controllare dalla session l'username di chi fa la richiesta)
	</li>
	<li>
		uno per tutti gli swap che un utente ha messo nei preferiti
	</li>
</ul>

**tuttiquesti file devono ritornare una lista di swap nello stesso formato di getSwaps.php, quindi fate prima bene quello e poi il resto e' un copia incolla leggermente modificato**
se volete fare le cose bene vi consiglio di gestire tutto a classi come facciamo adesso per gli esercizi di informatica lab anche se dubito ne avrete voglia
Qualsiasi cambiamento al db vedetevelo voi, vi chiedo solo, una volto finito di cambiare il db, esportatelo in un file .sql dentro alla cartella config (dove c'e' gia' un file .sql, sostituite quel file (e usate lo stesso nome))

Leggete tutto prima di fare cose che non workano pls
