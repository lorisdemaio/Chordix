const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const bcrypt = require('bcrypt');
const Round = 10;

const app = express();

app.use(express.json());
app.use(cors());

// Connessione al database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chordix'
});

db.connect((err) => {
    if(err) console.log("Errore:", err);
    else console.log("Connesso connesso al database.");
});
  
// ------------------------------//

app.get("/", (req, res) => {
    res.send("API di Chordix.");
});

// REGISTER
app.post("/api/register", async (req, res) => {
    const { username, email, password } = req.body;

    const hash_password = await bcrypt.hash(password, Round);
    const ql = "INSERT INTO utenti(username, email, password, ruolo) VALUES(?, ?, ?, 'utente')";

    db.query(ql, [username, email, hash_password], (err, ris) => {
        if(err) return res.status(500).json({ mex: "errore register: " + err });
        else return res.status(200).json({ mex: "Registrato con successo." });
    });
});

// LOGIN
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const ql = "SELECT utenti.*, metodi_di_pagamento.tipo FROM utenti LEFT JOIN metodi_di_pagamento ON metodi_di_pagamento.id_utente = utenti.id WHERE utenti.username = ?";

    db.query(ql, [username], async (err, ris) => {
        if(err) res.status(500).json({ mex: "errore:" + err });
        if(ris.length === 0) return res.status(401).json({ mex: "credenziali non valide." });
        
        const hash = ris[0].password;
        const check = await bcrypt.compare(password, hash);
 
        if(check) return res.status(200).json({  mex: "success", nome: ris[0].username, id: ris[0].id, indirizzo: ris[0].indirizzo, città: ris[0].città, ruolo: ris[0].ruolo, tipo: ris[0].tipo });
        else return res.status(401).json({ mex: "credenziali non valide." });
    });
});

// PRODOTTI IN EVIDENZA
app.get("/api/evidenza", (req, res) => {
    const ql = "SELECT * FROM chitarre WHERE evidenza = 1";

    db.query(ql, (err, ris) => {
        if(err) return res.status(404).json({ mex: "nessun prodotto trovato" });
        
        const chitarre = ris.map(row => {
            const base64Img = row.img.toString('base64');
            return {
                id: row.id,
                nome: row.nome,
                img: `data:image/jpeg;base64,${base64Img}`,
                prezzo: row.prezzo
            }
        });
        res.status(200).json(chitarre);
    });
});

// TUTTI I PRODOTTI
app.get("/api/prodotti", (req, res) => {
    const ql = "SELECT * FROM chitarre";

    db.query(ql, (err, ris) => {
        if(err) return res.status(404).json({ mex: "nessun prodotto trovato" });
        
        const chitarre = ris.map(row => {
            const base64Img = row.img.toString('base64');
            return {
                id: row.id,
                nome: row.nome,
                img: `data:image/jpeg;base64,${base64Img}`,
                prezzo: row.prezzo
            }
        });
        res.status(200).json(chitarre);
    });
});

// SELEZIONA UN PRODOTTO SPECIFICO
app.get("/api/chitarra/:id", (req, res) => {
    const ql = "SELECT * FROM chitarre WHERE id = ?";

    db.query(ql, [req.params.id], (err, ris) => {
        if(err) return res.status(404).json({ mex: "nessun prodotto trovato" });
        
        const base64Img = ris[0].img.toString('base64');
        const chitarra = {
            id: ris[0].id,
            nome: ris[0].nome,
            img: `data:image/jpeg;base64,${base64Img}`,
            prezzo: ris[0].prezzo
        };
        res.status(200).json(chitarra);
    });
});

// MODIFICA INDIRIZZO
app.post("/api/indirizzo", (req, res) => {
    const { NuovoIndirizzo, NuovaCittà, idUtente } = req.body;
    const ql = "UPDATE utenti SET indirizzo = ?, città = ? WHERE id = ?";

    db.query(ql, [NuovoIndirizzo, NuovaCittà, idUtente], (err, ris) => {
        if(err) return res.status(500).json({ mex: "errore: " + err });
        else return res.status(200).json({ mex: "Indirizzo inserito con successo.", status: "200", indirizzo: NuovoIndirizzo, città: NuovaCittà });
    });
});

// INSERISCI/MODIFICA METODO DI PAGAMENTO
app.post("/api/metodo-pagamento", (req, res) => {
    const { codice, data, cvv, tipo, idUtente} = req.body;
    const ql = "INSERT INTO metodi_di_pagamento(numero_carta, data_scadenza, cvv, tipo, id_utente) VALUES(?, ?, ?, ?, ?)";

    db.query(ql, [codice, data, cvv, tipo, idUtente], (err, ris) => {
        if(err) return res.status(500).json({ mex: "errore: " + err });
        else return res.status(200).json({ mex: "Metodo inserito inserito con successo.", status: "200", tipo: tipo });
    });
});

app.patch("/api/metodo-pagamento", (req, res) => {
    const { codice, data, cvv, tipo, idUtente} = req.body;
    const ql = "UPDATE metodi_di_pagamento SET numero_carta = ?, data_scadenza = ?, cvv = ?, tipo = ? WHERE id_utente = ? ";

    db.query(ql, [codice, data, cvv, tipo, idUtente], (err, ris) => {
        if(err) return res.status(500).json({ mex: "errore: " + err });
        else return res.status(200).json({ mex: "Metodo inserito inserito con successo.", status: "200", tipo: tipo });
    })
});

// CREA ORDINI
app.post("/api/crea-ordine", (req, res) => {
    const { descrizione, totale, indirizzo, città, metodoPagamento, idUtente } = req.body;
    const ql = "INSERT INTO ordini(stato, descrizione, totale, indirizzo, città, metodo_pagamento, id_utente) VALUES('Ordinato', ?, ?, ?, ?, ?, ?)";

    db.query(ql, [descrizione, totale, indirizzo, città, metodoPagamento, idUtente], (err, ris) => {
        if(err) return res.status(500).json({ mex: "errore: " + err });
        else return res.status(200).json({ mex: "Ordine completato con successo.", status: "200" });
    });
});

// VISUALIZZA ORDINI (utente)
app.get("/api/ordini-utente/:id", (req, res) => {
    const ql = "SELECT * FROM ordini WHERE id_utente = ?";

    db.query(ql, [req.params.id], (err, ris) => {
        if(err) return res.status(500).json({ mex: "errore: " + err });
        res.status(200).json({ ordini: ris });
    });
});

// VISUALIZZA ORDINI (admin)
app.get("/api/ordini-admin", (req, res) => {
    const ql = "SELECT ordini.*, utenti.username, utenti.indirizzo, utenti.città FROM ordini JOIN utenti WHERE ordini.id_utente = utenti.id;";

    db.query(ql, [], (err, ris) => {
        if(err) return res.status(500).json({ mex: "errore: " + err });
        res.status(200).json({ ordini: ris });
    });
});

// MODIFICA STATO ORDINE (admin)
app.patch("/api/modifica-ordine", (req, res) => {
    const { stato, idOrdine } = req.body;
    const ql = "UPDATE ordini SET stato = ? WHERE id = ? ";

    db.query(ql, [stato, idOrdine], (err, ris) => {
        if(err) return res.status(500).json({ mex: "errore: " + err });
        else return res.status(200).json({ mex: "Stato modificato con successo", status: "200" });
    })
});

// ------------------------------//

app.listen(3030, '0.0.0.0', () => {
    console.log("Server ON.");
});