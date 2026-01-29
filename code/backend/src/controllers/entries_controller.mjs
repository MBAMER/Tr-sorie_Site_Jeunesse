const EntriesController = {
    getAllEntries: async (req, res) => {
        const { Entry } = req.app.locals.models;

        await Entry.findAll()
            .then((result) => {
                return res.status(200).json({ entries: result });
            })
            .catch((error) => {
                console.error('GET ALL ENTRIES: ', error);
                return res.status(500).json({ message: "Erreur lors de la récupération des entrées !" });
            });
    },

    getEntry: async (req, res) => {
        const { id } = req.params;
        const { Entry } = req.app.locals.models;

        await Entry.findByPk(id)
            .then((result) => {
                if (result) {
                    return res.status(200).json({ entry: result });
                } else {
                    return res.status(404).json({ message: "Entrée non trouvée !" });
                }
            })
            .catch((error) => {
                console.error('GET ENTRY: ', error);
                return res.status(500).json({ message: "Erreur lors de la récupération de l'entrée !" });
            });
    },

    createEntry: async (req, res) => {
        const entryData = req.body;
        const { Entry } = req.app.locals.models;

        console.log('[createEntry] Données reçues:', entryData);

        await Entry.create(entryData)
            .then((result) => {
                return res.status(201).json({ entry: result });
            })
            .catch((error) => {
                console.error('CREATE ENTRY: ', error);
                let errorMsg = "Erreur lors de la création de l'entrée !";
                if (error.name === 'SequelizeValidationError') {
                    errorMsg = "Erreur de validation des données !";
                }
                return res.status(400).json({ message: errorMsg });
            });
    },

    updateEntry: async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
        const { Entry } = req.app.locals.models;

        const entry = await Entry.findByPk(id);
        if (entry) {
            await entry.update(updatedData)
                .then((result) => {
                    return res.status(200).json({ entry: result });
                })
                .catch((error) => {
                    console.error('UPDATE ENTRY: ', error);
                    return res.status(500).json({ message: "Erreur lors de la mise à jour de l'entrée !" });
                });
        } else {
            return res.status(404).json({ message: "Entrée non trouvée !" });
        }
    },

    removeEntry: async (req, res) => {
        const { id } = req.params;
        const { Entry } = req.app.locals.models;

        await Entry.destroy({
            where: { id }
        })
            .then((deletedCount) => {
                if (deletedCount > 0) {
                    return res.status(200).json({ id, message: "Entrée supprimée avec succès !" });
                } else {
                    return res.status(404).json({ message: "Entrée non trouvée !" });
                }
            })
            .catch((error) => {
                console.error('DELETE ENTRY: ', error);
                return res.status(500).json({ message: "Erreur lors de la suppression de l'entrée !" });
            });
    }
};

export default EntriesController;