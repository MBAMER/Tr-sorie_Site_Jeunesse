import { ligneCompteEvent } from "../db/mock-ligne_compte_event.mjs";

const getLigneCompteEvent = (id) => {
    return ligneCompteEvent.find((l) => l.id_ligne_compte_event === id);
};

const removeLigneCompteEvent = (id) => {
    ligneCompteEvent = ligneCompteEvent.filter((l) => l.id_ligne_compte_event !== id);
};

const updateLigneCompteEvent = (id, updatedLigne) => {
    ligneCompteEvent = ligneCompteEvent.map((l) =>
        l.id_ligne_compte_event === id ? updatedLigne : l
    );
};

const getUniqueId = () => {
    if (ligneCompteEvent.length === 0) return 0;
    const ids = ligneCompteEvent.map((l) => l.id_ligne_compte_event);
    const maxId = ids.reduce((a, b) => Math.max(a, b), -1);
    return maxId + 1;
};

// Recalcule les totaux pour TOUS les événements ou pour un événement spécifique
const recalculateTotals = () => {
    // On groupe les lignes par événement pour le calcul
    // Cependant, comme la liste est plate, on peut simplement itérer sur la liste triée
    // Mais attention : le total est cumulatif PAR événement.

    // 1. Trier par événement puis par ID (chronologie basée sur l'insertion/ID)
    ligneCompteEvent.sort((a, b) => {
        if (a.id_evenement !== b.id_evenement) {
            return a.id_evenement - b.id_evenement;
        }
        return a.id_ligne_compte_event - b.id_ligne_compte_event;
    });

    // 2. Maps pour stocker le total courant de chaque événement
    let runningTotals = {}; // { eventId: currentTotal }

    ligneCompteEvent.forEach(l => {
        const eventId = l.id_evenement;
        if (runningTotals[eventId] === undefined) {
            runningTotals[eventId] = 0;
        }

        const montantPositif = parseFloat(l.montant_Positif) || 0;
        const montantNegatif = parseFloat(l.montant_Negatif) || 0;

        runningTotals[eventId] = runningTotals[eventId] + montantPositif - montantNegatif;

        // Mise à jour en place
        l.montant_Positif = montantPositif;
        l.montant_Negatif = montantNegatif;
        l.total = runningTotals[eventId];
    });
};


export { getLigneCompteEvent, removeLigneCompteEvent, updateLigneCompteEvent, getUniqueId, recalculateTotals };