/**
 * Fichier de compatibilité : réexporte les middlewares depuis la nouvelle structure
 * Ce fichier maintient la compatibilité avec les imports existants
 */

export { authenticateToken, optionalAuth } from './middlewares/auth.mjs';
export { errorHandler, notFoundHandler } from './middlewares/errorHandler.mjs';
export { requestLogger } from './middlewares/logger.mjs';
export { asyncHandler } from './middlewares/asyncHandler.mjs';
export {
    validateUserCreation,
    validateUserUpdate,
    validateId,
    validateEntry,
    validateEvent
} from './middlewares/validation.mjs';
