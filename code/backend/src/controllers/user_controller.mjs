import { user } from "../db/mock-user.mjs";

const getUser = (id) => {
    return user.find((u) => u.id_user === id);
};

const removeUser = (id) => {
    // Note: reassigning exported 'user' binding won't work if imported elsewhere as live binding
    // But since it's an array, we can mutate it or use a getter/setter approach if it was a class
    // In this simple mock, we often rely on 'let' export which is mutable but tricky across modules.
    // However, the original code used reassignment: user = user.filter...
    // To make it work reliably with ES modules we should ideally preserve the array reference or use a specific function in mock (which we removed).
    // Given the pattern established in other controllers (like treasorie) let's try to stick to what was there but fix the ID.
    // Actually, treating 'user' as mutable export:
    const index = user.findIndex(u => u.id_user === id);
    if (index !== -1) user.splice(index, 1);
};

const updateUser = (id, updatedUser) => {
    const index = user.findIndex(u => u.id_user === id);
    if (index !== -1) user[index] = updatedUser;
};

const getUniqueId = () => {
    if (user.length === 0) return 0;
    const userIds = user.map((u) => u.id_user);
    const maxId = userIds.reduce((a, b) => Math.max(a, b), -1);
    const uniqueId = maxId + 1;
    return uniqueId;
};

export { getUser, removeUser, updateUser, getUniqueId };