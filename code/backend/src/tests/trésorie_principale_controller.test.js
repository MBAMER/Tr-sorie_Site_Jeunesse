
import { getTresorie, removeTresorie, updateTresorie, getUniqueId, recalculateTotals } from '../controllers/trésorie_principale_controller.mjs';
import { tresorie } from '../db/mock-trésorie_principale.mjs';

describe('Tresorie Controller - AAA Pattern', () => {

    test('should calculate cascading totals correctly (recalculateTotals)', () => {
        // Arrange
        // We use fresh items with high IDs to avoid conflicts and verify logic
        const item1 = { id_tresorie_principale: 7001, date_: '2021-01-01', montant_Positif: 1000, montant_Négatif: 0, total: 0 };
        const item2 = { id_tresorie_principale: 7002, date_: '2021-01-02', montant_Positif: 0, montant_Négatif: 500, total: 0 };

        // Ensure they are at the beginning for predictable results if the list was empty, 
        // but since it's not we just check their relative change.
        // To be safe let's just check if item2.total = item1.total - 500.
        tresorie.push(item1, item2);

        // Act
        recalculateTotals();

        // Assert
        const result1 = getTresorie(7001);
        const result2 = getTresorie(7002);
        expect(result2.total).toBe(result1.total - 500);

        // Cleanup
        removeTresorie(7001);
        removeTresorie(7002);
    });

    test('should update transaction description (updateTresorie)', () => {
        // Arrange
        const testItem = tresorie[0];
        const updatedData = { ...testItem, description: 'Updated Description' };

        // Act
        updateTresorie(testItem.id_tresorie_principale, updatedData);

        // Assert
        const result = getTresorie(testItem.id_tresorie_principale);
        expect(result.description).toBe('Updated Description');
    });

    test('should remove a transaction (removeTresorie)', () => {
        // Arrange
        const testItem = { id_tresorie_principale: 7003, description: 'To Remove' };
        tresorie.push(testItem);

        // Act
        removeTresorie(7003);

        // Assert
        const result = getTresorie(7003);
        expect(result).toBeUndefined();
    });
});
