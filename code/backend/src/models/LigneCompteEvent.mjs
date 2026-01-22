import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.mjs';

const LigneCompteEvent = sequelize.define('LigneCompteEvent', {
    id_ligne_compte_event: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    montant_Positif: {
        type: DataTypes.DECIMAL(19, 4),
        allowNull: true
    },
    montant_Negatif: { // Schema says 'montant_Negatif', check if 'montant_Négatif' (accent) in other tables is consistent.
        // Looking at schema screenshot: 'montant_Negatif' (no accent) for LIGNE_COMPTE_EVENT.
        type: DataTypes.DECIMAL(19, 4),
        allowNull: true
    },
    total: {
        type: DataTypes.DECIMAL(19, 4),
        allowNull: true
    }
}, {
    tableName: 'LIGNE_COMPTE_EVENT',
    timestamps: false
});

export default LigneCompteEvent;
