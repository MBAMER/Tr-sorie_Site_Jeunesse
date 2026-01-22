
import { getLigneCompteEvent, removeLigneCompteEvent, updateLigneCompteEvent, getUniqueId, recalculateTotals } from '../controllers/ligne_compte_event_controller.mjs';
import { ligneCompteEvent } from '../db/mock-ligne_compte_event.mjs';

describe('Ligne Compte Event Controller - AAA Pattern', () => {

    test('should calculate totals independently per event (recalculateTotals)', () => {
        // Arrange
        const eventA = 101;
        const eventB = 102;
        const lineA1 = { id_ligne_compte_event: 6001, id_evenement: eventA, montant_Positif: 100, montant_Negatif: 0, total: 0 };
        const lineA2 = { id_ligne_compte_event: 6002, id_evenement: eventA, montant_Positif: 0, montant_Negatif: 30, total: 0 };
        const lineB1 = { id_ligne_compte_event: 6003, id_evenement: eventB, montant_Positif: 50, montant_Negatif: 0, total: 0 };

        ligneCompteEvent.push(lineA1, lineA2, lineB1);

        // Act
        recalculateTotals();

        // Assert
        const resA1 = getLigneCompteEvent(6001);
        const resA2 = getLigneCompteEvent(6002);
        const resB1 = getLigneCompteEvent(6003);

        expect(resA1.total).toBe(100);
        expect(resA2.total).toBe(70); // 100 - 30
        expect(resB1.total).toBe(50); // Indépendant de l'événement A

        // Cleanup
        removeLigneCompteEvent(6001);
        removeLigneCompteEvent(6002);
        removeLigneCompteEvent(6003);
    });

    test('should update a line description (updateLigneCompteEvent)', () => {
        // Arrange
        const testLine = { id_ligne_compte_event: 6004, description: 'Original', id_evenement: 1 };
        ligneCompteEvent.push(testLine);
        const updatedData = { ...testLine, description: 'Updated' };

        // Act
        updateLigneCompteEvent(6004, updatedData);

        // Assert
        const result = getLigneCompteEvent(6004);
        expect(result.description).toBe('Updated');

        // Cleanup
        removeLigneCompteEvent(6004);
    });
});
