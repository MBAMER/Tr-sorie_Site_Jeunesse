let evenement = [
    {
        id: 0,
        nom_evenement: "tour de jeunesse",
        date_evenement: "2026-01-15",
        budget_total_entree: "1000",
        budget_total_sortie: "500",
        budget_total: "500"
    },
    {
        id: 1,
        nom_evenement: "char",
        date_evenement: "2026-01-16",
        budget_total_entree: "1500",
        budget_total_sortie: "1000",
        budget_total: "500"
    }
]

const getEvenement = (evenementid) => {
    return evenement.find((evenement) => evenement.id == evenementid);
};

const removeEvenement = (evenementid) => {
    evenement = evenement.filter((evenement) => evenement.id != evenementid);
};

const updateEvenement = (evenementid, updatedEvenement) => {
    evenement = evenement.map((evenement) =>
        evenement.id == evenementid ? updatedEvenement : evenement
    );
};

const getUniqueId = () => {
    const evenementsIds = evenement.map((evenement) => evenement.id);
    const maxId = evenementsIds.reduce((a, b) => Math.max(a, b));
    const uniqueId = maxId + 1;
    return uniqueId;
};
export { evenement, getEvenement, removeEvenement, updateEvenement, getUniqueId };