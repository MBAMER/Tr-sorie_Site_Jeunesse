
try {
    const { ligneCompteEvent, recalculateTotals, getUniqueId } = await import('./src/db/mock-ligne_compte_event.mjs');
    console.log("Mock module loaded.");

    // Clear existing for test clarity
    ligneCompteEvent.length = 0;

    // EVENT 1: Add items
    ligneCompteEvent.push({
        id_ligne_compte_event: 1,
        id_evenement: 1,
        montant_Positif: 100,
        montant_Negatif: 0,
        total: 0
    });
    ligneCompteEvent.push({
        id_ligne_compte_event: 2,
        id_evenement: 1,
        montant_Positif: 50,
        montant_Negatif: 0,
        total: 0
    });

    // EVENT 2: Add items (should not be affected by Event 1)
    ligneCompteEvent.push({
        id_ligne_compte_event: 3,
        id_evenement: 2,
        montant_Positif: 1000,
        montant_Negatif: 0,
        total: 0
    });

    // Recalculate
    recalculateTotals();

    console.log("Results:", JSON.stringify(ligneCompteEvent, null, 2));

    // Checks
    const l1 = ligneCompteEvent.find(l => l.id_ligne_compte_event === 1); // Total should be 100
    const l2 = ligneCompteEvent.find(l => l.id_ligne_compte_event === 2); // Total should be 150 (100+50)
    const l3 = ligneCompteEvent.find(l => l.id_ligne_compte_event === 3); // Total should be 1000 (starts fresh for event 2)

    if (l1.total !== 100) throw new Error("Event 1 - L1 total failed");
    if (l2.total !== 150) throw new Error("Event 1 - L2 total failed");
    if (l3.total !== 1000) throw new Error("Event 2 - L3 total failed (should be independent)");

    console.log("Per-event recalculation logic verified successfully.");
    process.exit(0);

} catch (error) {
    console.error("Test Error:", error);
    process.exit(1);
}
