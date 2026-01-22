import { evenement } from "../db/mock-evenement.mjs";

// Trouver un événement par son ID
const getEvenement = (id) => {
    return evenement.find((e) => e.id === id);
};

// Supprimer un événement
const removeEvenement = (id) => {
    const index = evenement.findIndex(e => e.id === id);
    if (index !== -1) evenement.splice(index, 1);
};

// Mettre à jour un événement
const updateEvenement = (id, updatedData) => {
    const index = evenement.findIndex(e => e.id === id);
    if (index !== -1) {
        evenement[index] = { ...evenement[index], ...updatedData };
    }
};

// Générer un nouvel ID (Simule le AUTO_INCREMENT)
const getUniqueId = () => {
    if (evenement.length === 0) return 1;
    const ids = evenement.map((e) => e.id);
    const maxId = Math.max(...ids);
    return maxId + 1;
};

export { getEvenement, removeEvenement, updateEvenement, getUniqueId };