import express from 'express';
import { getEntry, removeEntry, updateEntry, getUniqueId } from '../controllers/entries_controller.mjs';
import { entries } from '../db/mock-entries.mjs'; // Import direct pour le GET all
const entriesRouter = express.Router();

// 1. Récupérer toutes les entrées
entriesRouter.get('/', (req, res) => {
    res.json(entries);
});

// 2. Récupérer une entrée par son ID
entriesRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const entry = getEntry(id);

    if (entry) {
        res.json(entry);
    } else {
        res.status(404).json({ message: "Entrée non trouvée" });
    }
});

// 3. Créer une nouvelle entrée
entriesRouter.post('/', (req, res) => {
    const id = getUniqueId();
    const newEntry = {
        id: id,
        description: req.body.description,
        montant: parseFloat(req.body.montant),
        entry_date: req.body.entry_date || new Date().toISOString().split('T')[0],
        users_id: parseInt(req.body.users_id)
    };

    entries.push(newEntry);
    res.status(201).json({ message: "Entrée créée", data: newEntry });
});

// 4. Modifier une entrée (Update)
entriesRouter.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const entry = getEntry(id);

    if (entry) {
        updateEntry(id, req.body);
        res.json({ message: "Entrée mise à jour", data: getEntry(id) });
    } else {
        res.status(404).json({ message: "Entrée inexistante" });
    }
});

// 5. Supprimer une entrée
entriesRouter.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const entry = getEntry(id);

    if (entry) {
        removeEntry(id);
        res.json({ message: `L'entrée ${id} a été supprimée` });
    } else {
        res.status(404).json({ message: "Impossible de supprimer : ID introuvable" });
    }
});

export { entriesRouter };