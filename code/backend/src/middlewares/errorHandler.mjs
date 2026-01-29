/**
 * Middleware de gestion centralisée des erreurs
 * Capture toutes les erreurs non gérées et renvoie des réponses uniformes
 */

const errorHandler = (err, req, res, next) => {
    // Log l'erreur avec détails
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR:`, {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        path: req.path,
        method: req.method
    });

    // Gestion des erreurs Sequelize
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Erreur de validation des données',
            details: err.errors ? err.errors.map(e => e.message) : []
        });
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
            error: 'Conflict',
            message: 'Cette ressource existe déjà',
            details: err.errors ? err.errors.map(e => e.message) : []
        });
    }

    if (err.name === 'SequelizeDatabaseError') {
        return res.status(500).json({
            error: 'Database Error',
            message: 'Erreur de base de données'
        });
    }

    // Gestion des erreurs JWT
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'Authentication Error',
            message: 'Token invalide'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: 'Authentication Error',
            message: 'Token expiré'
        });
    }

    // Erreur par défaut
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erreur interne du serveur';

    res.status(statusCode).json({
        error: err.name || 'Internal Server Error',
        message: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

/**
 * Middleware pour gérer les routes 404
 */
const notFoundHandler = (req, res, next) => {
    const error = new Error(`Route non trouvée - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

export { errorHandler, notFoundHandler };
