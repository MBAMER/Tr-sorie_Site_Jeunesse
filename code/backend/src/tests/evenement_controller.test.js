
import { getEvenement, removeEvenement, updateEvenement, getUniqueId } from '../controllers/evenement_controller.mjs';
import { evenement } from '../db/mock-evenement.mjs';

describe('Evenement Controller - AAA Pattern', () => {

    test('should return a new unique ID (getUniqueId)', () => {
        // Arrange
        const maxId = evenement.length > 0 ? Math.max(...evenement.map(e => e.id_event)) : -1;
        const expectedId = maxId + 1;

        // Act
        const result = getUniqueId();

        // Assert
        expect(result).toBe(expectedId);
    });

    test('should retrieve an event by its id (getEvenement)', () => {
        // Arrange
        const testEvent = evenement[0];
        const targetId = testEvent.id_event;

        // Act
        const result = getEvenement(targetId);

        // Assert
        expect(result).toEqual(testEvent);
    });

    test('should update event data (updateEvenement)', () => {
        // Arrange
        const testEvent = evenement[0];
        const updatedData = { ...testEvent, nom_evenement: 'Updated Event Name' };

        // Act
        updateEvenement(testEvent.id_event, updatedData);

        // Assert
        const result = getEvenement(testEvent.id_event);
        expect(result.nom_evenement).toBe('Updated Event Name');
    });

    test('should delete an event from the list (removeEvenement)', () => {
        // Arrange
        const newEvent = { id_event: 888, nom_evenement: 'To Be Deleted' };
        evenement.push(newEvent);
        const targetId = 888;

        // Act
        removeEvenement(targetId);

        // Assert
        const result = getEvenement(targetId);
        expect(result).toBeUndefined();
    });
});
