import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.mjs';

const User = sequelize.define('User', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    prénom: { // Note: 'prénom' with accent in schema, but good practice is 'prenom'. Keeping schema name.
        type: DataTypes.STRING(50),
        allowNull: false
    },
    MDP: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Jeunesse: { // Note: Capitalized in schema?
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    tableName: 'USER_',
    timestamps: false
});

export default User;
