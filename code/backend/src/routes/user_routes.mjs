import express from "express";
import { success } from "../helper.mjs";


import { getAllUsers, getUser, createUser, removeUser, updateUser } from "../controllers/user_controller.mjs";
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(success("Liste des utilisateurs récupérée.", users));
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

userRouter.get("/:id", async (req, res) => {
    try {
        const user = await getUser(req.params.id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé." });
        res.json(success("Utilisateur trouvé.", user));
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

userRouter.post("/", async (req, res) => {
    try {
        // req.body doit contenir: first_name, last_name, email, password, youth_club_id
        // On exclut l'ID pour que l'auto-increment fonctionne
        const { id, ...userDataWithoutId } = req.body;
        const newUser = await createUser(userDataWithoutId);
        res.json(success("Utilisateur créé avec succès.", newUser));
    } catch (error) {
        res.status(400).json({ message: "Données invalides", error: error.message });
    }
});

userRouter.put("/:id", async (req, res) => {
    try {
        const updatedUser = await updateUser(req.params.id, req.body);
        if (!updatedUser) return res.status(404).json({ message: "Utilisateur non trouvé." });
        res.json(success("Utilisateur mis à jour.", updatedUser));
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la mise à jour", error: error.message });
    }
});

userRouter.delete("/:id", async (req, res) => {
    try {
        const deleted = await removeUser(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Utilisateur non trouvé." });
        res.json(success("Utilisateur supprimé.", deleted));
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

export { userRouter };