
try {
    const mock = await import('./src/db/mock-trésorie_principale.mjs');
    console.log("Initial total items:", mock.tresorie.length);

    // Initial state
    const t0 = mock.tresorie.find(t => t.id_tresorie_principale === 0);
    console.log("Initial T0 total:", t0.total); // Should be 500

    // Simulate PUT update
    // We want to change montant_Positif of T0 from 500 to 1000.
    // This should change its total to 1000, and shift subsequent totals by +500.

    // Step 1: Create updated object (like in route)
    const updatedT0 = {
        ...t0,
        montant_Positif: 1000
    };

    // Step 2: Call updateTresorie
    mock.updateTresorie(0, updatedT0);

    // Step 3: Call recalculateTotals
    mock.recalculateTotals();

    // Step 4: Verify results
    const finalT0 = mock.getTresorie(0);
    const finalT1 = mock.getTresorie(1); // Should be affected

    console.log("Updated T0 total:", finalT0.total);
    console.log("Updated T1 total:", finalT1.total);

    if (finalT0.total !== 1000) {
        throw new Error(`T0 total mismatch: expected 1000, got ${finalT0.total}`);
    }

    // Initial T1 total was 1000.
    // New T0 total is 1000.
    // T1 adds 500. So T1 total should be 1500.
    if (finalT1.total !== 1500) {
        throw new Error(`T1 total mismatch: expected 1500, got ${finalT1.total}`);
    }

    console.log("Test Passed!");
    process.exit(0);

} catch (error) {
    console.error("Test Failed:", error);
    process.exit(1);
}
