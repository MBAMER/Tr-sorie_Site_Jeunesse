import express from "express";
import { tresorie } from "../db/mock-trésorie_principale.mjs";
import { success } from "../helper.mjs";
import { getTresorie, removeTresorie, updateTresorie, getUniqueId, recalculateTotals } from "../controllers/trésorie_principale_controller.mjs";

const tresorieRouter = express();

// GET - Récupérer toutes les transactions de trésorerie
tresorieRouter.get("/", (req, res) => {
    console.log(`[GET] /api/tresorie/ - Récupération de la liste des transactions de trésorerie`);
    const message = "La liste des transactions de trésorerie a bien été récupérée.";
    res.json(success(message, tresorie));
});

// GET - Récupérer une transaction par ID
tresorieRouter.get("/:id", (req, res) => {
    const tresorieId = parseInt(req.params.id);
    console.log(`[GET] /api/tresorie/${tresorieId} - Récupération de la transaction avec l'id ${tresorieId}`);
    const foundTresorie = getTresorie(tresorieId);

    if (!foundTresorie) {
        const message = `La transaction avec l'id ${tresorieId} n'a pas été trouvée.`;
        return res.status(404).json({ success: false, message });
    }

    const message = `La transaction avec l'id ${tresorieId} a bien été récupérée.`;
    res.json(success(message, foundTresorie));
});

// POST - Créer une nouvelle transaction
tresorieRouter.post("/", (req, res) => {
    console.log(`[POST] /api/tresorie/ - Création d'une nouvelle transaction:`, req.body);
    const id = getUniqueId();

    const montantPositif = parseFloat(req.body.montant_Positif) || 0;
    const montantNegatif = parseFloat(req.body.montant_Négatif) || 0;

    // On crée l'objet avec un total temporaire
    const createTresorie = {
        id_tresorie_principale: id,
        description: req.body.description,
        montant_Positif: montantPositif,
        montant_Négatif: montantNegatif,
        total: 0, // Sera calculé par recalculateTotals
        date_: req.body.date_,
        pièce_jointe: req.body.pièce_jointe || null,
        id_user: req.body.id_user
    };

    tresorie.push(createTresorie);
    recalculateTotals(); // Recalcul global pour ordre et totaux

    // Récupérer l'objet mis à jour (potentiellement déplacé par le tri)
    const finalTresorie = getTresorie(id);

    const message = `La transaction "${finalTresorie.description}" a bien été créée.`;
    console.log(`[POST] /api/tresorie/ - Transaction créée avec succès: id=${finalTresorie.id_tresorie_principale}`);
    res.json(success(message, finalTresorie));
});

// PUT - Modifier une transaction existante
tresorieRouter.put("/:id", (req, res) => {
    const tresorieId = parseInt(req.params.id);
    console.log(`[PUT] /api/tresorie/${tresorieId} - Mise à jour de la transaction avec l'id ${tresorieId}`);
    const foundTresorie = getTresorie(tresorieId);

    if (!foundTresorie) {
        const message = `La transaction avec l'id ${tresorieId} n'a pas été trouvée.`;
        return res.status(404).json({ success: false, message });
    }

    const updatedTresorie = {
        ...foundTresorie,
        ...req.body,
        id_tresorie_principale: foundTresorie.id_tresorie_principale
    };

    updateTresorie(tresorieId, updatedTresorie);
    recalculateTotals(); // Recalculer tous les totaux en cascade

    const finalTresorie = getTresorie(tresorieId);

    const message = `La transaction avec l'id ${tresorieId} a bien été mise à jour et les totaux recalculés.`;
    res.json(success(message, finalTresorie));
});

// DELETE - Supprimer une transaction
tresorieRouter.delete("/:id", (req, res) => {
    const tresorieId = parseInt(req.params.id);
    console.log(`[DELETE] /api/tresorie/${tresorieId} - Suppression de la transaction avec l'id ${tresorieId}`);
    const foundTresorie = getTresorie(tresorieId);

    if (!foundTresorie) {
        const message = `La transaction avec l'id ${tresorieId} n'a pas été trouvée.`;
        return res.status(404).json({ success: false, message });
    }

    removeTresorie(tresorieId);
    recalculateTotals(); // Recalculer les totaux restants

    const message = `La transaction "${foundTresorie.description}" a bien été supprimée et les totaux recalculés.`;
    res.json(success(message, foundTresorie));
});

export { tresorieRouter };
