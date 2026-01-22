
import { getUser, removeUser, updateUser, getUniqueId } from '../controllers/user_controller.mjs';
import { user } from '../db/mock-user.mjs';

describe('User Controller - AAA Pattern', () => {

    test('should return a new unique ID (getUniqueId)', () => {
        // Arrange
        const maxId = user.length > 0 ? Math.max(...user.map(u => u.id_user)) : -1;
        const expectedId = maxId + 1;

        // Act
        const result = getUniqueId();

        // Assert
        expect(result).toBe(expectedId);
    });

    test('should retrieve an existing user by id (getUser)', () => {
        // Arrange
        const testUser = user[0];
        const targetId = testUser.id_user;

        // Act
        const result = getUser(targetId);

        // Assert
        expect(result).toEqual(testUser);
    });

    test('should update user data correctly (updateUser)', () => {
        // Arrange
        const testUser = user[0];
        const updatedData = { ...testUser, nom: 'UpdatedName' };

        // Act
        updateUser(testUser.id_user, updatedData);

        // Assert
        const result = getUser(testUser.id_user);
        expect(result.nom).toBe('UpdatedName');
    });

    test('should remove a user from the list (removeUser)', () => {
        // Arrange
        const newUser = { id_user: 999, nom: 'Temp' };
        user.push(newUser);
        const targetId = 999;

        // Act
        removeUser(targetId);

        // Assert
        const result = getUser(targetId);
        expect(result).toBeUndefined();
    });
});
