import { user } from "../db/mock-user.mjs";

const getUser = (userid) => {
    return user.find((u) => u.id === userid);
};

const removeUser = (userid) => {
    const userIndex = user.findIndex((u) => u.id === userid);
    if (userIndex !== -1) {
        user.splice(userIndex, 1);
    }
};

const updateUser = (userid, updatedUser) => {
    const userIndex = user.findIndex((u) => u.id === userid);
    if (userIndex !== -1) {
        user[userIndex] = updatedUser;
    }
};

const getUniqueId = () => {
    if (user.length === 0) return 0;
    const userIds = user.map((u) => u.id);
    const maxId = userIds.reduce((a, b) => Math.max(a, b), -1);
    const uniqueId = maxId + 1;
    return uniqueId;
};

export { getUser, removeUser, updateUser, getUniqueId };