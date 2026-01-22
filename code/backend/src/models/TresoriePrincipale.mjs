import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.mjs';

const TresoriePrincipale = sequelize.define('TresoriePrincipale', {
    id_tresorie_principale: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    montant_Positif: {
        type: DataTypes.DECIMAL(19, 4),
        allowNull: true
    },
    montant_Négatif: {
        type: DataTypes.DECIMAL(19, 4),
        allowNull: true
    },
    total: {
        type: DataTypes.DECIMAL(19, 4),
        allowNull: true
    },
    date_: { // Note: 'date_' to match schema, but consider 'date' if possible.
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    pièce_jointe: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'TRESORIE_PRINCIPALE',
    timestamps: false
});

export default TresoriePrincipale;
