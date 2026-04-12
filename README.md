# Swappy Books

## Frontend setup
 We use **docker** for the frontend to avoid problems such as incompatible node or npm versions. When setting up frontend to start working on it, use the following commands to setup a docker container and run it:

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
