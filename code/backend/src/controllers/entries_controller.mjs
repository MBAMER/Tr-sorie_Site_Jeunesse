import { entries } from "../db/mock-entries.mjs";
import { have } from "../db/mock-have.mjs"; // Indispensable

const getEntry = (id) => entries.find((e) => e.id === id);

const removeEntry = (id) => {
    const index = entries.findIndex((e) => e.id === id);
    if (index !== -1) {
        entries.splice(index, 1);
        const haveIndex = have.findIndex(h => h.entries_id === id);
        if (haveIndex !== -1) have.splice(haveIndex, 1);
    }
};

const updateEntry = (id, updatedData) => {
    const index = entries.findIndex((e) => e.id === id);
    if (index !== -1) entries[index] = { ...entries[index], ...updatedData };
};

const getUniqueId = () => {
    if (entries.length === 0) return 1;
    return Math.max(...entries.map(e => e.id)) + 1;
};

export { getEntry, removeEntry, updateEntry, getUniqueId };