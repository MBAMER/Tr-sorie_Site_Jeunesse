/**
 * Middleware de logging avancé
 * Log les requêtes, réponses et durée de traitement
 */

const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const startTime = Date.now();

    // Log de la requête entrante
    console.log(`[${timestamp}] ${req.method} ${req.path}`, {
        ip: req.ip,
        userAgent: req.get('user-agent'),
        body: req.method !== 'GET' ? req.body : undefined
    });

    // Capture la fin de la réponse pour logger la durée
    const originalSend = res.send;
    res.send = function (data) {
        const duration = Date.now() - startTime;
        const endTimestamp = new Date().toISOString();

        console.log(`[${endTimestamp}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);

        originalSend.call(this, data);
    };

    next();
};

export { requestLogger };
