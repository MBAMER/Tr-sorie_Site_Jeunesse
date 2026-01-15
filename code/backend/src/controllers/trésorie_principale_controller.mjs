import { tresorie } from "../db/mock-trésorie_principale.mjs";

const getTresorie = (tresorieId) => {
    return tresorie.find((t) => t.id_tresorie_principale === tresorieId);
};

const removeTresorie = (tresorieId) => {
    tresorie = tresorie.filter((t) => t.id_tresorie_principale !== tresorieId);
};

const updateTresorie = (tresorieId, updatedTresorie) => {
    tresorie = tresorie.map((t) =>
        t.id_tresorie_principale === tresorieId ? updatedTresorie : t
    );
};

const getUniqueId = () => {
    if (tresorie.length === 0) return 0;
    const tresorieIds = tresorie.map((t) => t.id_tresorie_principale);
    const maxId = tresorieIds.reduce((a, b) => Math.max(a, b), -1);
    const uniqueId = maxId + 1;
    return uniqueId;
};

const recalculateTotals = () => {
    // Trier par date pour assurer l'ordre chronologique
    tresorie.sort((a, b) => {
        const dateA = new Date(a.date_);
        const dateB = new Date(b.date_);
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return a.id_tresorie_principale - b.id_tresorie_principale; // Stabilité si même date
    });

    let runningTotal = 0;

    // Mise à jour en place des objets
    tresorie.forEach(t => {
        const montantPositif = parseFloat(t.montant_Positif) || 0;
        const montantNegatif = parseFloat(t.montant_Négatif) || 0;
        runningTotal = runningTotal + montantPositif - montantNegatif;

        t.montant_Positif = montantPositif; // S'assurer que c'est un nombre
        t.montant_Négatif = montantNegatif;
        t.total = runningTotal;
    });
};
export { getTresorie, removeTresorie, updateTresorie, getUniqueId, recalculateTotals };