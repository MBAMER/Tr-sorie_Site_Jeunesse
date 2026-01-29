import { sequelize } from '../db/sequelize.mjs';
import { DataTypes } from 'sequelize';

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    event_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true // Correspond à UNIQUE(event_name)
    },
    event_date: {
        type: DataTypes.DATEONLY, // Correspond au type DATE (sans l'heure)
        allowNull: true // Par défaut true car pas de NOT NULL dans ton SQL
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Par défaut true car pas de NOT NULL dans ton SQL
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    timestamps: false,
    tableName: 'evenement'
});

export { Event };