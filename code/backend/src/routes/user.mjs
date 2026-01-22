import express from "express";
import { user } from "../db/mock-user.mjs";
import { getUser, removeUser, updateUser, getUniqueId } from "../controllers/user_controller.mjs";
import { success } from "../helper.mjs";

const userRouter = express();

userRouter.get("/", (req, res) => {
    console.log(`[GET] /api/user/ - Récupération de la liste des users`);
    const message = "La liste des users a bien été récupérée.";
    res.json(success(message, user));
});

userRouter.get("/:id", (req, res) => {
    const userid = parseInt(req.params.id);
    console.log(`[GET] /api/user/${userid} - Récupération de l'user avec l'id ${userid}`);
    const foundUser = getUser(userid);

    if (!foundUser) {
        const message = `L'user avec l'id ${userid} n'a pas été trouvé.`;
        return res.status(404).json({ success: false, message });
    }

    const message = `L'user avec l'id ${userid} a bien été récupéré.`;
    res.json(success(message, foundUser));
});

userRouter.post("/", (req, res) => {
    console.log(`[POST] /api/user/ - Création d'un nouvel user:`, req.body);
    const id = getUniqueId();
    const createUser = { ...req.body, ... { id_user: id, created: new Date() } };
    user.push(createUser);
    const message = `L'user avec l'id ${createUser.nom} a bien été créé.`;
    console.log(`[POST] /api/user/ - User créé avec succès: id=${createUser.id_user}, nom=${createUser.nom}`);
    res.json(success(message, createUser));
});

userRouter.delete("/:id", (req, res) => {
    const userid = parseInt(req.params.id);
    console.log(`[DELETE] /api/user/${userid} - Suppression de l'user avec l'id ${userid}`);
    const foundUser = getUser(userid);

    if (!foundUser) {
        const message = `L'user avec l'id ${userid} n'a pas été trouvé.`;
        return res.status(404).json({ success: false, message });
    }

    removeUser(userid);
    const message = `L'user avec l'id ${userid} a bien été supprimé.`;
    res.json(success(message, foundUser));
});

userRouter.put("/:id", (req, res) => {
    const userid = parseInt(req.params.id);
    console.log(`[PUT] /api/user/${userid} - Mise à jour de l'user avec l'id ${userid}`);
    const foundUser = getUser(userid);

    if (!foundUser) {
        const message = `L'user avec l'id ${userid} n'a pas été trouvé.`;
        return res.status(404).json({ success: false, message });
    }

    const updatedUserData = { ...foundUser, ...req.body, id_user: foundUser.id_user, created: foundUser.created };
    updateUser(userid, updatedUserData);
    const message = `L'user avec l'id ${userid} a bien été mis à jour.`;
    res.json(success(message, updatedUserData));
});
export { userRouter };