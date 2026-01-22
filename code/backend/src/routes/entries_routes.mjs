import express from "express";
import { entries } from "../db/mock-entries.mjs";
import { success } from "../helper.mjs";
import { getEntry, removeEntry, updateEntry, getUniqueId } from "../controllers/entries_controller.mjs";

const entriesRouter = express.Router();

// POST - Créer une entrée et la lier à un événement
entriesRouter.post("/", (req, res) => {
    const newId = getUniqueId();
    const { description, montant, date_, events_id, users_id } = req.body;

    // 1. Création dans la table 'entries' (selon schéma image 1)
    const newEntry = {
        id: newId,
        description: description,        // VARCHAR(200)
        montant: parseFloat(montant),     // DECIMAL(19,4)
        date_: date_ || new Date().toISOString().split('T')[0], // DATE
        users_id: parseInt(users_id)      // INT (FK vers users)
    };

    entries.push(newEntry);

    // 2. Création de la liaison dans la table 'have' (selon schéma image 1)
    if (events_id) {
        have.push({
            entries_id: newId,
            events_id: parseInt(events_id)
        });
    }

    res.status(201).json(success("Entrée comptable créée et liée à l'événement.", newEntry));
});

// GET - Récupérer les entrées d'un événement spécifique
entriesRouter.get("/event/:eventId", (req, res) => {
    const eventId = parseInt(req.params.eventId);
    
    // On cherche les IDs des entrées liées à cet événement dans 'have'
    const entryIds = have
        .filter(h => h.events_id === eventId)
        .map(h => h.entries_id);

    // On récupère les détails de ces entrées
    const result = entries.filter(e => entryIds.includes(e.id));

    res.json(success(`Entrées pour l'événement ${eventId} récupérées.`, result));
});

// DELETE
entriesRouter.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const found = getEntry(id);
    if (!found) return res.status(404).json({ message: "Introuvable" });

    removeEntry(id);
    res.json(success("Entrée supprimée.", found));
});

export { entriesRouter };