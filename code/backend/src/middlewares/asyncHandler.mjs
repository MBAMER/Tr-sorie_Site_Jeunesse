/**
 * Wrapper pour gérer les erreurs asynchrones dans les routes
 * Évite d'avoir des try/catch répétitifs dans chaque controller
 */
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export { asyncHandler };
