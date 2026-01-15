import express from "express";
import { ligneCompteEvent } from "../db/mock-ligne_compte_event.mjs";
import { success } from "../helper.mjs";
import { getLigneCompteEvent, removeLigneCompteEvent, updateLigneCompteEvent, getUniqueId, recalculateTotals } from "../controllers/ligne_compte_event_controller.mjs";

const ligneCompteEventRouter = express();

// GET - Récupérer toutes les lignes
// Possibilité de filtrer par événement via query param ? ex: /api/ligne-compte-event?id_evenement=1
ligneCompteEventRouter.get("/", (req, res) => {
    console.log(`[GET] /api/ligne-compte-event/ - Récupération de la liste`);
    let result = ligneCompteEvent;

    if (req.query.id_evenement) {
        const eventId = parseInt(req.query.id_evenement);
        result = ligneCompteEvent.filter(l => l.id_evenement === eventId);
    }

    const message = "La liste des lignes comptables a bien été récupérée.";
    res.json(success(message, result));
});

// GET - Récupérer une ligne par ID
ligneCompteEventRouter.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`[GET] /api/ligne-compte-event/${id} - Récupération de la ligne ${id}`);
    const foundLine = getLigneCompteEvent(id);

    if (!foundLine) {
        const message = `La ligne avec l'id ${id} n'a pas été trouvée.`;
        return res.status(404).json({ success: false, message });
    }

    const message = `La ligne avec l'id ${id} a bien été récupérée.`;
    res.json(success(message, foundLine));
});

// POST - Créer une nouvelle ligne
ligneCompteEventRouter.post("/", (req, res) => {
    console.log(`[POST] /api/ligne-compte-event/ - Création:`, req.body);
    const id = getUniqueId();

    const montantPositif = parseFloat(req.body.montant_Positif) || 0;
    const montantNegatif = parseFloat(req.body.montant_Negatif) || 0;

    const createLine = {
        id_ligne_compte_event: id,
        id_evenement: parseInt(req.body.id_evenement) || 0,
        description: req.body.description,
        montant_Positif: montantPositif,
        montant_Negatif: montantNegatif,
        total: 0, // Sera recalculé
        created: new Date()
    };

    ligneCompteEvent.push(createLine);
    recalculateTotals(); // Recalcul global par événement

    const finalLine = getLigneCompteEvent(id);

    const message = `La ligne "${finalLine.description}" a bien été créée.`;
    res.json(success(message, finalLine));
});

// PUT - Modifier une ligne
ligneCompteEventRouter.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`[PUT] /api/ligne-compte-event/${id} - Mise à jour de la ligne ${id}`);
    const foundLine = getLigneCompteEvent(id);

    if (!foundLine) {
        const message = `La ligne avec l'id ${id} n'a pas été trouvée.`;
        return res.status(404).json({ success: false, message });
    }

    const updatedLine = {
        ...foundLine,
        ...req.body,
        id_ligne_compte_event: foundLine.id_ligne_compte_event, // Préservation ID
        id_evenement: foundLine.id_evenement // On empêche généralement de changer l'événement, sinon le recalcul est complexe (faut recalculer old et new event)
    };

    // Si l'utilisateur tente de changer l'événement, on pourrait le gérer, mais ici on simplifie en gardant l'original
    // Ou si on accepte le changement :
    if (req.body.id_evenement) updatedLine.id_evenement = parseInt(req.body.id_evenement);

    updateLigneCompteEvent(id, updatedLine);
    recalculateTotals(); // Recalculer tous les totaux

    const finalLine = getLigneCompteEvent(id);

    const message = `La ligne avec l'id ${id} a bien été mise à jour.`;
    res.json(success(message, finalLine));
});

// DELETE - Supprimer une ligne
ligneCompteEventRouter.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`[DELETE] /api/ligne-compte-event/${id} - Suppression de la ligne ${id}`);
    const foundLine = getLigneCompteEvent(id);

    if (!foundLine) {
        const message = `La ligne avec l'id ${id} n'a pas été trouvée.`;
        return res.status(404).json({ success: false, message });
    }

    removeLigneCompteEvent(id);
    recalculateTotals();

    const message = `La ligne "${foundLine.description}" a bien été supprimée.`;
    res.json(success(message, foundLine));
});

export { ligneCompteEventRouter };
