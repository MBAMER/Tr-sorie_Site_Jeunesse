import { User } from '../models/user_model.mjs';

// Récupérer tous les users
const getAllUsers = async () => {
    return await User.findAll();
};

// Récupérer par ID
const getUser = async (id) => {
    return await User.findByPk(id);
};

// Créer un user
const createUser = async (userData) => {
    return await User.create(userData);
};

// Supprimer un user
const removeUser = async (id) => {
    const user = await User.findByPk(id);
    if (user) {
        await user.destroy();
        return user;
    }
    return null;
};

// Mettre à jour un user
const updateUser = async (id, updatedData) => {
    const user = await User.findByPk(id);
    if (user) {
        return await user.update(updatedData);
    }
    return null;
};

export { getAllUsers, getUser, createUser, removeUser, updateUser };