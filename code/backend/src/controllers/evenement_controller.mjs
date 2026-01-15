import { evenement } from "../db/mock-evenement.mjs";

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


export { getEvenement, removeEvenement, updateEvenement, getUniqueId };