# COME USARE IL PROGETTO:

1) Importare il database su XAMPP: 

- Avvia XAMPP e accendi i primi due servizi: Apache e MySQL.

- Clicca sul pulsante "Admin" accanto a MySQL per aprire phpMyAdmin nel browser.

- Una volta caricata la pagina di phpMyAdmin, clicca sulla scheda "Importa" nella barra 
  superiore.

- Seleziona il file chordix.sql dalla cartella Database del progetto tuo e clicca su "Esegui" 
  per completare l'importazione del  database.


2) Configurare il progetto:

- Una volta scaricata la cartella aprila su Visual Studio Code e apri due terminali.

- Nel primo terminale (Front-End) esegui il comando "npm i" per installare le dipendenze.

- Nel secondo terminale (Back-End) esegui il comando "cd api" per spostarti nella cartella
  api e successivamente il comando "npm i".


3) Avvia il progetto:

- Infine per avviare il progetto nel terminale Front-End esegui il comando "npm run dev" e
  nel terminale Back-End "node ."