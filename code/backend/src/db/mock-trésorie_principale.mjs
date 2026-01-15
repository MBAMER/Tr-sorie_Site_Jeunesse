let tresorie = [
    {
        id_tresorie_principale: 0,
        description: "Cotisation membres",
        montant_Positif: 500.00,
        montant_Négatif: 0.00,
        total: 500.00,
        date_: "2026-01-10",
        pièce_jointe: null,
        id_user: 1
    },
    {
        id_tresorie_principale: 1,
        description: "Don externe",
        montant_Positif: 500.00,
        montant_Négatif: 0.00,
        total: 1000.00,
        date_: "2026-01-12",
        pièce_jointe: null,
        id_user: 1
    },
    {
        id_tresorie_principale: 2,
        description: "Achat matériel",
        montant_Positif: 0.00,
        montant_Négatif: 300.00,
        total: 700.00,
        date_: "2026-01-13",
        pièce_jointe: null,
        id_user: 2
    }
];

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
    tresorie = tresorie.map(t => {
        const montantPositif = parseFloat(t.montant_Positif) || 0;
        const montantNegatif = parseFloat(t.montant_Négatif) || 0;
        runningTotal = runningTotal + montantPositif - montantNegatif;
        return { ...t, total: runningTotal };
    });
};

export { tresorie, getTresorie, removeTresorie, updateTresorie, getUniqueId, recalculateTotals };
