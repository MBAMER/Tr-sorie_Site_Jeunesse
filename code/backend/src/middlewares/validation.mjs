/**
 * Middlewares de validation des données
 */

/**
 * Valide les données pour la création d'un utilisateur
 */
const validateUserCreation = (req, res, next) => {
    const { email, password, first_name, last_name } = req.body;
    const errors = [];

    if (!email) {
        errors.push('Le champ email est requis');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Le format de l\'email est invalide');
    }

    if (!password) {
        errors.push('Le champ password est requis');
    } else if (password.length < 6) {
        errors.push('Le mot de passe doit contenir au moins 6 caractères');
    }

    if (!first_name) {
        errors.push('Le champ first_name est requis');
    } else if (first_name.trim().length < 2) {
        errors.push('Le prénom doit contenir au moins 2 caractères');
    }

    if (!last_name) {
        errors.push('Le champ last_name est requis');
    } else if (last_name.trim().length < 2) {
        errors.push('Le nom doit contenir au moins 2 caractères');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Données de création d\'utilisateur invalides',
            details: errors
        });
    }

    next();
};

/**
 * Valide les données pour la mise à jour d'un utilisateur
 */
const validateUserUpdate = (req, res, next) => {
    const { first_name, last_name, email } = req.body;
    const errors = [];

    if (first_name !== undefined && first_name.trim().length < 2) {
        errors.push('Le prénom doit contenir au moins 2 caractères');
    }

    if (last_name !== undefined && last_name.trim().length < 2) {
        errors.push('Le nom doit contenir au moins 2 caractères');
    }

    if (email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Le format de l\'email est invalide');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Données de mise à jour invalides',
            details: errors
        });
    }

    next();
};

/**
 * Valide les paramètres ID
 */
const validateId = (req, res, next) => {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'ID invalide',
            details: ['L\'ID doit être un nombre entier']
        });
    }

    next();
};

/**
 * Valide les données d'une entrée (entry)
 */
const validateEntry = (req, res, next) => {
    const { montant, type, description } = req.body;
    const errors = [];

    if (montant === undefined) {
        errors.push('Le champ montant est requis');
    } else if (isNaN(parseFloat(montant))) {
        errors.push('Le montant doit être un nombre');
    }

    if (type && !['credit', 'debit'].includes(type)) {
        errors.push('Le type doit être "credit" ou "debit"');
    }

    if (description && description.trim().length > 500) {
        errors.push('La description ne peut pas dépasser 500 caractères');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Données d\'entrée invalides',
            details: errors
        });
    }

    next();
};

/**
 * Valide les données d'un événement
 */
const validateEvent = (req, res, next) => {
    const { nom, date } = req.body;
    const errors = [];

    if (!nom) {
        errors.push('Le champ nom est requis');
    } else if (nom.trim().length < 3) {
        errors.push('Le nom doit contenir au moins 3 caractères');
    }

    if (date !== undefined) {
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
            errors.push('Le format de la date est invalide');
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Données d\'événement invalides',
            details: errors
        });
    }

    next();
};

export {
    validateUserCreation,
    validateUserUpdate,
    validateId,
    validateEntry,
    validateEvent
};
