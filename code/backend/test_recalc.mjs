
try {
    const { tresorie, recalculateTotals, getUniqueId } = await import('./src/db/mock-trésorie_principale.mjs');
    console.log("Mock module loaded.");

    // Test initial state
    console.log("Initial tresorie:", JSON.stringify(tresorie, null, 2));

    // Test adding a transaction (simulating POST logic)
    const newTrans = {
        id_tresorie_principale: getUniqueId(),
        description: "Test Transaction",
        montant_Positif: 200,
        montant_Négatif: 0,
        date_: "2026-01-11", // Inserted in middle
        total: 0 // to be recalc
    };
    tresorie.push(newTrans);
    recalculateTotals();
    console.log("After add and recal:", JSON.stringify(tresorie, null, 2));

    // Test modifying (simulating PUT logic)
    // Modify the first one
    tresorie[0].montant_Positif = 600; // was 500
    recalculateTotals();
    console.log("After modify first and recal:", JSON.stringify(tresorie, null, 2));

    console.log("Verification specific logic successful");
    process.exit(0);
} catch (error) {
    console.error("Verification Error:", error);
    process.exit(1);
}
