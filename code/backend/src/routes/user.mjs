import express from "express";
import { user } from "../db/mock-user.mjs";

import { success } from "../helper.mjs";
import { getUniqueId } from "../helper.mjs";
const userRouter = express();

userRouter.get("/", (req, res) => {
    console.log(`[GET] /api/user/ - Récupération de la liste des users`);
    const message = "La liste des users a bien été récupérée.";
    res.json(success(message, user));
});

userRouter.get("/:id", (req, res) => {
    const userid = req.params.id;
    console.log(`[GET] /api/user/${userid} - Récupération de l'user avec l'id ${userid}`);
    const foundUser = user.find((u) => u.id === userid);
    const message = `L'user avec l'id ${userid} a bien été récupéré.`;
    res.json(success(message, foundUser));
});

userRouter.post("/", (req, res) => {
    console.log(`[POST] /api/user/ - Création d'un nouvel user:`, req.body);
    const id = getUniqueId(user);
    const createUser = { ...req.body, ... {id: id, created: new Date()}};
    user.push(createUser);
    const message = `L'user avec l'id ${createUser.nom} a bien été créé.`;
    console.log(`[POST] /api/user/ - User créé avec succès: id=${createUser.id}, nom=${createUser.nom}`);
    res.json(success(message, createUser));
});

userRouter.delete("/:id", (req, res) => {
    const userid = req.params.id;
    console.log(`[DELETE] /api/user/${userid} - Suppression de l'user avec l'id ${userid}`);
    removeUser(userid);
    const message = `L'user avec l'id ${user.nom} a bien été supprimé.`;
    res.json(success(message, deleteUser));
});

export { userRouter };