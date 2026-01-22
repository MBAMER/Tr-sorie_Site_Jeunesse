import express from "express";
import { evenement } from "../db/mock-evenement.mjs";
import { success } from "../helper.mjs";
import { 
    getEvenement, 
    removeEvenement, 
    updateEvenement, 
    getUniqueId 
} from "../controllers/evenement_controller.mjs";

const evenementRouter = express.Router();

// GET - Liste de tous les événements
evenementRouter.get("/", (req, res) => {
    res.json(success("Liste des événements récupérée.", evenement));
});

// GET - Un seul événement par ID
evenementRouter.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const found = getEvenement(id);
    if (!found) return res.status(404).json({ success: false, message: "Événement introuvable." });
    res.json(success("Événement trouvé.", found));
});

// POST - Création corrigée
evenementRouter.post("/", (req, res) => {
    const { nom, date_, users_id } = req.body; // On extrait les champs du body

    const newEvent = {
        id: getUniqueId(),
        nom: nom, // Vérifie bien que c'est 'nom' ici
        date_: date_ || new Date().toISOString().split('T')[0],
        users_id: users_id ? parseInt(users_id) : null
    };

    evenement.push(newEvent);
    
    // On renvoie l'objet complet pour vérifier dans Insomnia
    res.json(success("Événement créé avec succès.", newEvent));
});

// PUT - Modification
evenementRouter.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const found = getEvenement(id);
    
    if (!found) return res.status(404).json({ success: false, message: "Événement introuvable." });

    const updated = { 
        ...found, 
        ...req.body, 
        id: found.id // Protection : l'ID ne change jamais
    };

    updateEvenement(id, updated);
    res.json(success("Événement mis à jour.", updated));
});

// DELETE - Suppression
evenementRouter.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const found = getEvenement(id);
    
    if (!found) return res.status(404).json({ success: false, message: "Événement introuvable." });

    removeEvenement(id);
    res.json(success("Événement supprimé.", found));
});

export { evenementRouter };