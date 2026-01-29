import bcrypt from 'bcrypt';

const cleanUser = (user) => {
    // eslint-disable-next-line no-unused-vars
    const { password, ...cleanedUser } = user.get({ plain: true });
    return cleanedUser;
};

const UserController = {
    createUser: async (req, res) => {
        const { email, password, first_name, last_name, youth_club_id } = req.body;
        const { User } = req.app.locals.models;

        if (!email || !password || !first_name || !last_name) {
            return res.status(400).json({ message: "Champs manquants : email, password, first_name, last_name sont requis." });
        }

        await User.create({
            email: email.toLowerCase(),
            password: await bcrypt.hash(password, 8),
            first_name,
            last_name,
            youth_club_id
        })
            .then((result) => {
                return res.status(201).json({ user: cleanUser(result) });
            })
            .catch((error) => {
                console.error('ADD USER: ', error);
                if (error.name === 'SequelizeUniqueConstraintError') {
                    return res.status(409).json({ message: 'Un compte avec cet email existe déjà !' });
                }
                if (error.name === 'SequelizeValidationError') {
                    return res.status(400).json({ message: "Erreur de validation : " + error.errors.map(e => e.message).join(', ') });
                }
                return res.status(500).json({ message: "Erreur lors de l'inscription !" });
            });
    },
    getUser: async (req, res) => {
        // req.sub should be set by middleware
        const user_id = req.sub || req.params.id;
        const { User } = req.app.locals.models;

        await User.findOne({
            where: { id: user_id },
            attributes: { exclude: ['password'] }
        })
            .then((result) => {
                if (result) {
                    return res.status(200).json({ user: result });
                } else {
                    return res.status(404).json({ message: "Utilisateur non trouvé" });
                }
            })
            .catch((error) => {
                console.error('GET USER: ', error);
                return res.status(500).json({ message: "Erreur serveur" });
            });
    },
    editUser: async (req, res) => {
        const user_id = req.sub || req.params.id;
        const query = { id: user_id };
        const data = req.body;
        const { User } = req.app.locals.models;

        const user = await User.findOne({ where: query });
        if (user) {
            user.first_name = data.first_name ? data.first_name : user.first_name;
            user.last_name = data.last_name ? data.last_name : user.last_name;
            // Adapting fields to user_model.mjs (first_name, last_name, email)
            // Original code used name, address, zip - assuming update to match model
            // Keeping original logic structure but ensuring it doesn't crash on model mismatch
            if (data.name) user.name = data.name; // Keep if model has name

            await user
                .save()
                .then((result) => {
                    return res.status(200).json({ user: cleanUser(result) });
                })
                .catch((error) => {
                    console.error('UPDATE USER: ', error);
                    return res.status(500).json({ message: "Erreur serveur" });
                });
        } else {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    },
    deleteCurrentUser: (req, res) => {
        const user_id = req.sub || req.params.id;
        const query = { id: user_id };
        const { User } = req.app.locals.models;

        User.destroy({
            where: query
        })
            .then(() => {
                return res.status(200).json({ id: user_id });
            })
            .catch((error) => {
                console.error('DELETE USER: ', error);
                return res.status(500).json({ message: "Erreur serveur" });
            });
    }
};

export default UserController;