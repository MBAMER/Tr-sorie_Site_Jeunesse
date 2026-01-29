import jwt from 'jsonwebtoken';

/**
 * Middleware d'authentification par JWT
 * Vérifie la validité du token et ajoute l'utilisateur à req.user
 */
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({
            error: 'Authentication Error',
            message: 'Token d\'authentification manquant'
        });
    }

    // TODO: Utiliser une variable d'environnement pour le secret
    const secret = process.env.JWT_SECRET || 'changeme';

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).json({
                error: 'Authentication Error',
                message: 'Token invalide ou expiré'
            });
        }
        req.user = user;
        // On définit req.sub pour compatibilité avec le user_controller
        req.sub = user.id || user.sub;
        next();
    });
};

/**
 * Middleware optionnel d'authentification
 * N'échoue pas si le token est absent, mais le vérifie s'il est présent
 */
const optionalAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next();
    }

    const secret = process.env.JWT_SECRET || 'changeme';

    jwt.verify(token, secret, (err, user) => {
        if (!err) {
            req.user = user;
            req.sub = user.id || user.sub;
        }
        next();
    });
};

export { authenticateToken, optionalAuth };
