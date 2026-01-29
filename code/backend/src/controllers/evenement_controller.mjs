const EvenementController = {
    getAllEvents: async (req, res) => {
        const { Event } = req.app.locals.models;

        await Event.findAll()
            .then((result) => {
                return res.status(200).json({ events: result });
            })
            .catch((error) => {
                console.error('GET ALL EVENTS: ', error);
                return res.status(500).json({ message: "Erreur lors de la récupération des événements !" });
            });
    },

    getEvenement: async (req, res) => {
        const { id } = req.params;
        const { Event } = req.app.locals.models;

        await Event.findByPk(id)
            .then((result) => {
                if (result) {
                    return res.status(200).json({ event: result });
                } else {
                    return res.status(404).json({ message: "Événement non trouvé !" });
                }
            })
            .catch((error) => {
                console.error('GET EVENT: ', error);
                return res.status(500).json({ message: "Erreur lors de la récupération de l'événement !" });
            });
    },

    createEvent: async (req, res) => {
        const eventData = req.body;
        const { Event } = req.app.locals.models;

        console.log('[createEvent] Données reçues:', eventData);

        await Event.create(eventData)
            .then((result) => {
                return res.status(201).json({ event: result });
            })
            .catch((error) => {
                console.error('CREATE EVENT: ', error);
                let errorMsg = "Erreur lors de la création de l'événement !";
                if (error.name === 'SequelizeValidationError') {
                    errorMsg = "Erreur de validation des données !";
                }
                return res.status(400).json({ message: errorMsg });
            });
    },

    updateEvenement: async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
        const { Event } = req.app.locals.models;

        const event = await Event.findByPk(id);
        if (event) {
            await event.update(updatedData)
                .then((result) => {
                    return res.status(200).json({ event: result });
                })
                .catch((error) => {
                    console.error('UPDATE EVENT: ', error);
                    return res.status(500).json({ message: "Erreur lors de la mise à jour de l'événement !" });
                });
        } else {
            return res.status(404).json({ message: "Événement non trouvé !" });
        }
    },

    removeEvenement: async (req, res) => {
        const { id } = req.params;
        const { Event } = req.app.locals.models;

        await Event.destroy({
            where: { id }
        })
            .then((deletedCount) => {
                if (deletedCount > 0) {
                    return res.status(200).json({ id, message: "Événement supprimé avec succès !" });
                } else {
                    return res.status(404).json({ message: "Événement non trouvé !" });
                }
            })
            .catch((error) => {
                console.error('DELETE EVENT: ', error);
                return res.status(500).json({ message: "Erreur lors de la suppression de l'événement !" });
            });
    }
};

export default EvenementController;