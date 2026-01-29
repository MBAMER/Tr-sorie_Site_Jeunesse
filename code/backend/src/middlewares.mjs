import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    // TODO: Utiliser une variable d'environnement pour le secret
    const secret = process.env.JWT_SECRET || 'changeme';

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        // On définit req.sub pour compatibilité avec le user_controller
        req.sub = user.id || user.sub;
        next();
    });
};

export { authenticateToken };
