import express from "express";
import * as models from "./models/index.mjs";
const app = express();
app.locals.models = models;
const port = 3000;

// Middleware pour parser JSON
app.use(express.json());

// Middleware global de logging
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

app.get("/", (req, res) => {
    console.log(`[GET] / - Accueil`);
    res.send("API REST of self service machine !");
});
app.get("/api/", (req, res) => {
    console.log(`[GET] /api/ - Redirection vers l'accueil`);
    res.redirect(`http://localhost:${port}/`);
});

// Initialiser la base de données
import { initDb } from "./db/sequelize.mjs";
initDb().catch((err) => {
    console.error("Erreur lors de l'initialisation de la BD:", err);
});

import { userRouter } from "./routes/user_routes.mjs";
app.use("/api/user", userRouter);

import { evenementRouter } from "./routes/evenement.mjs";
app.use("/api/evenement", evenementRouter);

import { entriesRouter } from "./routes/entries_routes.mjs";
app.use("/api/entries", entriesRouter);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port} - VERSION_FIXED_DELETE`);
});