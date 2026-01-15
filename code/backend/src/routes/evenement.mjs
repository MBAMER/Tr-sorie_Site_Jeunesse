import express from "express";
import { evenement, getEvenement, removeEvenement, updateEvenement, getUniqueId } from "../db/mock-evenement.mjs";
import { success } from "../helper.mjs";

const evenementRouter = express();

// GET - Récupérer tous les événements
evenementRouter.get("/", (req, res) => {
    console.log(`[GET] /api/evenement/ - Récupération de la liste des événements`);
    const message = "La liste des événements a bien été récupérée.";
    res.json(success(message, evenement));
});

// GET - Récupérer un événement par ID
evenementRouter.get("/:id", (req, res) => {
    const evenementid = parseInt(req.params.id);
    console.log(`[GET] /api/evenement/${evenementid} - Récupération de l'événement avec l'id ${evenementid}`);
    const foundEvenement = getEvenement(evenementid);

    if (!foundEvenement) {
        const message = `L'événement avec l'id ${evenementid} n'a pas été trouvé.`;
        return res.status(404).json({ success: false, message });
    }

    const message = `L'événement avec l'id ${evenementid} a bien été récupéré.`;
    res.json(success(message, foundEvenement));
});

// POST - Créer un nouvel événement
evenementRouter.post("/", (req, res) => {
    console.log(`[POST] /api/evenement/ - Création d'un nouvel événement:`, req.body);
    const id = getUniqueId();
    const createEvenement = {
        id: id,
        ...req.body,
        created: new Date()
    };
    evenement.push(createEvenement);
    const message = `L'événement "${createEvenement.nom_evenement}" a bien été créé.`;
    console.log(`[POST] /api/evenement/ - Événement créé avec succès: id=${createEvenement.id}, nom=${createEvenement.nom_evenement}`);
    res.json(success(message, createEvenement));
});

// PUT - Modifier un événement existant
evenementRouter.put("/:id", (req, res) => {
    const evenementid = parseInt(req.params.id);
    console.log(`[PUT] /api/evenement/${evenementid} - Mise à jour de l'événement avec l'id ${evenementid}`);
    const foundEvenement = getEvenement(evenementid);

    if (!foundEvenement) {
        const message = `L'événement avec l'id ${evenementid} n'a pas été trouvé.`;
        return res.status(404).json({ success: false, message });
    }

    const updatedEvenement = {
        ...foundEvenement,
        ...req.body,
        id: foundEvenement.id,
        created: foundEvenement.created
    };
    updateEvenement(evenementid, updatedEvenement);
    const message = `L'événement avec l'id ${evenementid} a bien été mis à jour.`;
    res.json(success(message, updatedEvenement));
});

// DELETE - Supprimer un événement
evenementRouter.delete("/:id", (req, res) => {
    const evenementid = parseInt(req.params.id);
    console.log(`[DELETE] /api/evenement/${evenementid} - Suppression de l'événement avec l'id ${evenementid}`);
    const foundEvenement = getEvenement(evenementid);

    if (!foundEvenement) {
        const message = `L'événement avec l'id ${evenementid} n'a pas été trouvé.`;
        return res.status(404).json({ success: false, message });
    }

    removeEvenement(evenementid);
    const message = `L'événement "${foundEvenement.nom_evenement}" a bien été supprimé.`;
    res.json(success(message, foundEvenement));
});

export { evenementRouter };
